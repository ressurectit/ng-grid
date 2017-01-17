import {Component, ViewChild, Input, OnInit, OnDestroy, AfterContentInit, AfterViewInit, ContentChildren, QueryList, Output, EventEmitter, ContentChild, TemplateRef, ViewContainerRef} from '@angular/core';
import {ColumnComponent} from './column.component';
import {ColumnGroupComponent} from './columnGroup.component';
import {GridOptions} from './gridOptions';
import {isBlank, isPresent} from '@angular/core/src/facade/lang';
import {OrderByDirection, Utils, Paginator, isString} from '@ng2/common';
import {GridCookieConfig} from './gridCookie.config';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

//TODO - add way to change paging component
//TODO - test change detection on Push
//TODO - add localData
//TODO - try to remove <div> from <td>

/**
 * Grid component used for displaying data
 */
@Component(
{
    selector: 'ng2-grid',
    template:
   `<div style="position: relative; overflow-x: auto;" class="table-div {{_options.cssClass}}">
        <table class="table table-condensed table-striped table-hover">
            <thead>
                <tr *ngIf="_columnGroups.length > 0">
                    <template ngFor let-group [ngForOf]="_columnGroups">
                        <th *ngIf="group.colSpan > 0" [attr.colspan]="group.colSpan" [class]="group.cssClass">
                            {{group.title}}
                        </th>
                    </template>
                </tr>

                <tr>
                    <th *ngFor="let column of columns"
                        class="{{column.headerClass}}"
                        [ngClass]="{hidden: !column.visible, 'column-orderable': column.ordering}"
                        [ngStyle]="{width: column.width}"
                        (click)="performsOrdering(column)">
                        <span style="white-space: nowrap;">
                            <span style="white-space: normal;" [title]="column.headerTooltip || ''">
                                <template [ngIf]="column.headerTemplate">
                                    <column-template-renderer [template]="column.headerTemplate" [column]="column"></column-template-renderer>
                                </template>
                                <template [ngIf]="!column.headerTemplate">
                                    {{column.titleVisible ? column.title : ""}}
                                </template>
                            </span>
                            <span *ngIf="column.ordering" class="fa {{column.orderingCssClass}}"></span>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr *ngFor="let row of data; let rowIndex = index" [ngClass]="isRowSelected(row) ? rowSelectionClass : ''" [class]="rowCssClassCallback(row)" (click)="toggleRowSelection(row)">
                    <td *ngFor="let column of columns" [ngClass]="{hidden: !column.visible}" class="{{column.cellClass}}">
                        <div *ngIf="column.template">
                            <column-template-renderer [column]="column" [rowData]="row" [currentIndex]="rowIndex" [rowIndexes]="_rowIndexes"></column-template-renderer>
                        </div>

                        <div *ngIf="!column.template">
                            {{row[column.name]}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div #noDataFoundContainer></div>
        
        <template #noDataFoundTemplate>
            <div *ngIf="noDataMessage" class="alert alert-tight text-center">{{noDataMessage}}</div>
        </template>        

        <paging *ngIf="_options.pagingEnabled"
                [page]="page"
                (pageChange)="page = $event"
                [(itemsPerPage)]="itemsPerPage"
                [totalCount]="totalCount"
                [itemsPerPageValues]="_options.itemsPerPageValues">
        </paging>

        <div *ngIf="_options.columnsSelection" class="column-selector">
            <a [title]="_options.columnSelectionTitle || ''" style="cursor: pointer;" data-toggle="collapse" [attr.data-target]="'#columnSelection' + _internalId">
                <span class="glyphicon glyphicon-list"></span>
            </a>

            <div class="{{_options.columnSelectionCssClass}} collapse" [id]="'columnSelection' + _internalId">
                <div class="clearfix">
                    <a class="pull-right" style="cursor: pointer;" data-toggle="collapse" [attr.data-target]="'#columnSelection' + _internalId">
                        <span class="glyphicon glyphicon-remove"></span>
                    </a>
                </div>

                <div *ngFor="let column of columns; let index=index">
                    <dl *ngIf="column.selectionVisible">
                        <dt>
                            <input [id]="'column' + _internalId + column.name" type="checkbox" [disabled]="!_isColumnSelectionAllowed(column)" [checked]="column.visible" (click)="toggleColumn(index)">
                        </dt>
                        <dd>
                            <label [attr.for]="'column' + _internalId + column.name">{{column.title}}</label>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>`,
    styles:
    [`
        .column-orderable:hover
        {
            background-color: #f4f4f4;
            cursor: pointer;
        }

        .column-selection
        {
            background-color: #fff;
            border: 1px solid #d3d3d3;
            border-radius: 6px;
            box-shadow: 0 0 3px #d3d3f3;
            padding: 8px;
        }

        .column-selector dl
        {
            margin: 0;
        }

        .column-selector dt
        {
            float: left;
        }

        .column-selector dd
        {
            margin-left: 15px;
            white-space: nowrap;
        }

        .column-selector
        {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: all 200ms;
            pointer-events: none;
            z-index: 10;
        }

        .column-selector > div
        {
            position: absolute;
            right: 0;
            top: 0;
        }

        .table-div:hover > .column-selector
        {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }
        
        .row-selected
        {
            background-color: #efefef;
        }
    `]
})
export class GridComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit
{
    //######################### private fields #########################

    /**
     * Options that are used for configuring grid
     */
    private _options: GridOptions;

    /**
     * Default options that are used for configuraging grid
     */
    private _defaultOptions: GridOptions;

    /**
     * Current page number of grid
     */
    private _page: number = null;

    /**
     * Async page used for changing paging
     */
    private _pageAsync: Subject<number> = new Subject<number>();

    /**
     * Current number of items per page
     */
    private _itemsPerPage: number = null;

    /**
     * Number of all items for current filter
     */
    public _totalCount: number;

    /**
     * Subscription for debounce dataCallback
     */
    private _debounceSubscription: Subscription = null;

    /**
     * Subject for debounce dataCallback
     */
    private _debounceSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Row indexes that are displayed
     */
    private _rowIndexes: number[] = [];

    /**
     * Id that represents grid component
     */
    private _internalId: string;

    /**
     * Array of column definitions for columns, content getter
     */
    @ContentChildren(ColumnComponent)
    private _columns: QueryList<ColumnComponent>;

    /**
     * Array of column group definitions for grid, content getter
     */
    @ContentChildren(ColumnGroupComponent)
    private _columnGroupsDefinitions: QueryList<ColumnGroupComponent>;

    /**
     * Custom template for no data found message
     */
    @ContentChild("noDataFoundTemplate")
    private _noDataFoundCustom: TemplateRef<any>;

    /**
     * Default template for no data found message
     */
    @ViewChild("noDataFoundTemplate")
    private _noDataFoundDefault: TemplateRef<any>;

    /**
     * Container for no data found message
     */
    @ViewChild("noDataFoundContainer", { read: ViewContainerRef })
    private _noDataFoundContainer: ViewContainerRef;

    /**
     * Final template used for no data found message
     */
    private _noDataFoundTemplate: TemplateRef<any>;

    /**
     * Column groups that are rendered
     */
    private _columnGroups: ColumnGroupComponent[] = [];

    /**
     * Backing field for data that are rendered in grid
     */
    private _data: any[];

    //######################### private properties #########################

    /**
     * Gets or sets settings for current grid
     */
    private get gridSettings(): GridCookieConfig
    {
        if (!this.id)
        {
            return {};
        }

        return (<GridCookieConfig>Utils.cookies.getCookie(this.settingsCookieId)) || {};
    };
    private set gridSettings(settings: GridCookieConfig)
    {
        if (this.id) 
        {
            Utils.cookies.setCookie(this.settingsCookieId, settings, 1000);
        }
    }

    /**
     * Internal page used for handling page value
     */
    private set internalPage(page: number)
    {
        this._page = page;
        this._pageAsync.next(page);
    }
    private get internalPage(): number
    {
        return this._page;
    }

    /**
     * Array of column definitions for columns
     */
    private columns: ColumnComponent[];

    //######################### public properties #########################

    /**
     * Gets or sets current page number of grid
     */
    public set page(page: number)
    {
        this.internalPage = page;
        this._setRowIndexes();

        this.refresh();
    }
    public get page(): number
    {
        return this.internalPage;
    }

    /**
     * Gets or sets current number of items per page
     */
    public set itemsPerPage(itemsPerPage: number)
    {
        this._itemsPerPage = itemsPerPage;

        let settings: GridCookieConfig = this.gridSettings;
        settings.selectItemsPerPage = itemsPerPage;
        this.gridSettings = settings;
        this._setRowIndexes();

        this.refresh();
    }
    public get itemsPerPage(): number
    {
        return this._itemsPerPage;
    }

    /**
     * Gets visible columns
     */
    public get visibleColumns(): ColumnComponent[]
    {
        let visibleColumns: ColumnComponent[] = [];
        if (this.columns && this.columns.length > 0) 
        {
            for(let i = 0; i < this.columns.length; i++)
            {
                if (this.columns[i].visible) 
                {
                    visibleColumns.push(<ColumnComponent> Utils.common.extend({}, this.columns[i]));
                }
            }
        } 
        return visibleColumns;
    }

    /**
     * Current name of column that is used for ordering
     */
    public orderBy: string = null;

    /**
     * Current direction of ordering for selected column
     */
    public orderByDirection: OrderByDirection = null;

    //######################### public properties - inputs #########################

    /**
     * Id of grid, must be unique
     */
    @Input()
    public id: string;

    /**
     * Gets or sets data that are rendered in grid
     */
    @Input()
    public set data(data: any[])
    {
        this._data = data;

        this._toggleNoDataTemplate();
    }
    public get data(): any[]
    {
        return this._data;
    }

    /**
     * Number of all items for current filter
     */
    @Input()
    public set totalCount(totalCount: number)
    {
        this._totalCount = totalCount;
        this._setRowIndexes();
    }
    public get totalCount(): number
    {
        return this._totalCount;
    }

    /**
     * Callback function that is called for each row with data of row and allows you to return string css classes, enables adding special css classes to row
     */
    @Input()
    public rowCssClassCallback: (rowData: any) => string = () => "";

    /**
     * Set options that are used for configuring grid
     */
    @Input()
    public set options(options: GridOptions)
    {
        //TODO - add change detection for grid options

        this._options = options;

        if(isBlank(this._options))
        {
            this._options = this._defaultOptions;
        }

        Object.keys(this._defaultOptions).forEach(key =>
        {
            if(isBlank(this._options[key]))
            {
                this._options[key] = this._defaultOptions[key];
            }
        });
    }

    /**
     * Selected rows
     */
    @Input()
    public selection: any;

    /**
     * CSS class for selected rows
     */
    @Input()
    public rowSelectionClass: string = "row-selected";

    /**
     * Message for no data found alert default template
     */
    @Input()
    public noDataMessage: string;

    //######################### public properties - outputs #########################

    /**
     * Occurs when row selection was changed
     */
    @Output()
    public selectionChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Occurs when column selection was changed
     */
    @Output()
    public columnSelectionChange: EventEmitter<ColumnComponent> = new EventEmitter<ColumnComponent>();

    //######################### private properties #########################

    /**
     * Gets column visibility settings cookie id
     */
    private get settingsCookieId(): string
    {
        return `grid-settings-${this.id}`;
    }

    //######################### constructor #########################
    constructor()
    {
        this._defaultOptions = {
            pagingEnabled: true,
            columnsSelection: false,
            cssClass: "",
            columnSelectionCssClass: "column-selection",
            columnSelectionTitle: "",
            itemsPerPageValues: [],
            initialItemsPerPage: 10,
            initialPage: 1,
            debounceDataCallback: 40,
            dataCallback: (page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection) =>
            {
                //TODO - client implementation

                this.totalCount = this.data.length;
            }
        };

        this._options = this._defaultOptions;
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._debounceSubscription = this._debounceSubject
            .debounceTime(this._options.debounceDataCallback)
            .subscribe(() =>
            {
                this.selection = [];
                this.selectionChange.emit(this.selection);
                this._options.dataCallback(this.page,
                                           this.itemsPerPage,
                                           this.orderBy,
                                           this.orderByDirection);
            });

        this._internalId = Utils.common.generateId(16);
        this.internalPage = this._options.initialPage;

        let settings = this.gridSettings;

        if(isPresent(settings.selectItemsPerPage))
        {
            this.itemsPerPage = settings.selectItemsPerPage;
        }
        else
        {
            this.itemsPerPage = this._options.initialItemsPerPage;
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        this._debounceSubscription.unsubscribe();
        this._debounceSubscription = null;
    }

    //######################### public methods - implementation of AfterContentInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        let columns = this._columns.toArray();
        let settings: GridCookieConfig = this.gridSettings;

        if(isPresent(settings.selectedColumns))
        {
            for(let x = 0; x < settings.selectedColumns.length; x++)
            {
                if(columns.length == x)
                {
                    break;
                }

                columns[x].visible = settings.selectedColumns[x];
            }
        }

        this.columns = columns;

        if(this._columnGroupsDefinitions.length > 0)
        {
            let groups = this._columnGroupsDefinitions.toArray();

            this._columnGroups = groups;
            this._calculateGroupColSpan();
        }
    }

    //######################### public methods - implementation of AfterViewInit #########################

    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {
        this._noDataFoundTemplate = this._noDataFoundDefault;

        if (this._noDataFoundCustom)
        {
            this._noDataFoundTemplate = this._noDataFoundCustom;
        }

        this._toggleNoDataTemplate();
    }

    //######################### public methods #########################

    /**
     * Toggles visibility of column
     * @param  {number} index Index of toggled column
     */
    public toggleColumn(index: number)
    {
        this.columns[index].visible = !this.columns[index].visible;
        this.columnSelectionChange.emit(this.columns[index]);
        this._calculateGroupColSpan();

        let settings: GridCookieConfig = this.gridSettings;
        settings.selectedColumns = this.columns.map(itm => itm.visible);
        this.gridSettings = settings;
    }

    /**
     * Refresh grid data with initial paging and ordering
     */
    public refreshToDefault()
    {
        this.internalPage = this._options.initialPage;
        this.orderBy = null;
        this.orderByDirection = null;

        this.refresh();
    }

    /**
     * Refresh grid data
     */
    public refresh()
    {
        this._debounceSubject.next(true);
    }

    /**
     * Performs ordering on provided column
     * @param  {ColumnComponent|string} orderingColumn Name of column or column itself that is used for ordering
     */
    public performsOrdering(orderingColumn: ColumnComponent|string)
    {
        if(isBlank(orderingColumn))
        {
            throw new Error("Unable perform ordering if no column was specified");
        }

        let column: ColumnComponent = <ColumnComponent>orderingColumn;

        if(isString(orderingColumn))
        {
            let tmp = this.columns.filter(itm => itm.name == orderingColumn);

            if(tmp.length < 1)
            {
                throw new Error("There is no column with specified name");
            }

            column = tmp[0];
        }

        if(!column.ordering)
        {
            return;
        }

        this.columns.forEach(col =>
        {
            if(col.name != column.name)
            {
                col.orderingCssClass = "fa-sort";
            }
            else
            {
                switch(col.orderingCssClass)
                {
                    case "fa-sort":
                    default:
                    {
                        this.orderBy = col.name;
                        this.orderByDirection = OrderByDirection.Ascendant;
                        col.orderingCssClass = "fa-sort-up";

                        break;
                    }
                    case "fa-sort-up":
                    {
                        this.orderBy = col.name;
                        this.orderByDirection = OrderByDirection.Descendant;
                        col.orderingCssClass = "fa-sort-down";

                        break;
                    }
                    case "fa-sort-down":
                    {
                        this.orderBy = null;
                        this.orderByDirection = null;
                        col.orderingCssClass = "fa-sort";

                        break;
                    }
                }
            }
        });

        this.refresh();
    }

    /**
     * Toggles selection on row
     * @param  {any} row selected row
     * @param  {MouseEvent} event mouse click event
     */
    public toggleRowSelection(row: any, event: MouseEvent)
    {
        if (event && event.stopPropagation) 
        {
            event.stopPropagation();
        }

        if (this._options.rowSelectionEnabled) 
        {
            let selectionIndex = this._getRowSelectionIndex(row);

            if (selectionIndex != -1) 
            {
                this.selection.splice( selectionIndex, 1);
            } 
            else 
            {
                this.selection = this.selection || [];
                this.selection.push(row);
            }
        }
    }

    /**
     * Check if row is selected
     * @param  {any} row instance of row
     * @returns boolean true if row is selected otherwise false
     */
    public isRowSelected(row: any) : boolean
    {
        return this._getRowSelectionIndex(row) != -1;
    }

    //######################### private methdos #########################

    /**
     * Sets row indexes
     */
    private _setRowIndexes()
    {
        let paginator = new Paginator();

        paginator.setPage(this.page)
            .setItemsPerPage(this.itemsPerPage)
            .setItemCount(this.totalCount);

        this._rowIndexes = paginator.getIndexesPerPage();
    }

    /**
     * Calculates col spans for displayed column groups
     */
    private _calculateGroupColSpan()
    {
        if(this._columnGroups.length < 1)
        {
            return;
        }

        let colSpanCounter = {};

        this.columns.forEach(col =>
        {
            if(!col.visible)
            {
                return;
            }

            if(isBlank(colSpanCounter[col.columnGroupName]))
            {
                colSpanCounter[col.columnGroupName] = 1;
            }
            else
            {
                colSpanCounter[col.columnGroupName] += 1;
            }
        });

        this._columnGroups.forEach(group =>
        {
            group.colSpan = colSpanCounter[group.name];
        });
    }

    /**
     * Returns selection index of row
     * @param  {any} row instance of row
     * @returns number -1 if row is not selected otherwise index of row
     */
    private _getRowSelectionIndex(row: any) : number 
    {
        let index : number = -1;

        if (this.selection) 
        {
            for (let i = 0; i < this.selection.length; i++) 
            {
                if (this.selection[i] == row) 
                {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }

    /**
     * Check if column selection is allowed on particular column 
     * @param {ColumnComponent} column instance of column
     * @returns true if column selection is allowed on particular column otherwise false
     */
    private _isColumnSelectionAllowed(column: ColumnComponent) : boolean 
    {
        if (!column)
        {
            return false;
        }

        if ((column.visible && (!this._options.minVisibleColumns || this.visibleColumns.length > this._options.minVisibleColumns)) || 
            (!column.visible && (!this._options.maxVisibleColumns || this.visibleColumns.length < this._options.maxVisibleColumns))) 
        {
            return true;
        }

        return false;
    }

    /**
     * Shows or hide no data found message based on retrieved data
     */
    private _toggleNoDataTemplate()
    {
        if (!this._noDataFoundContainer)
        {
            return;
        }
        
        let noData: boolean = isBlank(this._data) || this._data.length == 0;

        if (noData)
        {
            this._noDataFoundContainer.createEmbeddedView(this._noDataFoundTemplate);
        }
        else
        {
            this._noDataFoundContainer.clear();
        }
    }
}

/**
 * Grid directives
 */
export const GRID_DIRECTIVES = [GridComponent, ColumnComponent, ColumnGroupComponent];