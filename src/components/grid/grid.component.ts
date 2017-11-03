import {Component, ViewChild, Input, OnInit, OnDestroy, AfterContentInit, AfterViewInit, ContentChildren, QueryList, Output, EventEmitter, ContentChild, TemplateRef, ViewContainerRef, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {OrderByDirection, Utils, Paginator, isString, isBlank, isPresent, CookieService, NgComponentOutletEx} from '@anglr/common';
import {ColumnComponent} from './column.component';
import {ColumnGroupComponent} from './columnGroup.component';
import {GridOptions} from './gridOptions';
import {GridCookieConfig} from './gridCookie.config';
import {BasicPagingComponent} from "../paging/basicPaging.component";
import {PagingAbstractComponent} from "../paging/pagingAbstract.component";
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {debounceTime} from 'rxjs/operators';

//TODO - add localData
//TODO - grid make grid ready to be dynamic, need to split ngOnInit => initialize => detectChanges
//TODO - create interface for grid for public use

/**
 * Grid component used for displaying data
 */
@Component(
{
    selector: 'ng-grid',
    template:
   `<div style="position: relative; overflow-x: auto;" class="table-div {{gridOptions.cssClass}}">
        <table class="table table-condensed table-striped table-hover">
            <thead>
                <tr *ngIf="columnGroups.length > 0">
                    <ng-template ngFor let-group [ngForOf]="columnGroups">
                        <th *ngIf="group.colSpan > 0" [attr.colspan]="group.colSpan" [class]="group.cssClass">
                            {{group.title}}
                        </th>
                    </ng-template>
                </tr>

                <tr>
                    <th *ngFor="let column of columns"
                        class="{{column.headerClass}}"
                        [ngClass]="{hidden: !column.visible, 'column-orderable': column.ordering}"
                        [ngStyle]="{width: column.width}"
                        (click)="performsOrdering(column)">
                        <span style="white-space: nowrap;">
                            <span style="white-space: normal;" [title]="column.headerTooltip || ''">
                                <ng-template [ngIf]="column.headerTemplate">
                                    <column-template-renderer [template]="column.headerTemplate" [column]="column"></column-template-renderer>
                                </ng-template>
                                <ng-template [ngIf]="!column.headerTemplate">
                                    {{column.titleVisible ? column.title : ""}}
                                </ng-template>
                            </span>
                            <span *ngIf="column.ordering" class="fa {{column.orderingCssClass}}"></span>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr *ngFor="let row of data; let rowIndex = index" [ngClass]="isRowSelected(row) ? rowSelectionClass : ''" [class]="rowCssClassCallback(row)" (click)="toggleRowSelection(row)">
                    <td *ngFor="let column of columns" [ngClass]="{hidden: !column.visible}" class="{{column.cellClass}}">
                        <ng-template [ngIf]="column.template">
                            <column-template-renderer [column]="column" [rowData]="row" [currentIndex]="rowIndex" [rowIndexes]="rowIndexes"></column-template-renderer>
                        </ng-template>

                        <ng-template [ngIf]="!column.template">
                            {{row[column.name]}}
                        </ng-template>
                    </td>
                </tr>
            </tbody>
        </table>

        <div #noDataFoundContainer></div>

        <ng-template #noDataFoundTemplate>
            <div *ngIf="noDataMessage" class="alert alert-tight text-center">{{noDataMessage}}</div>
        </ng-template>

        <ng-template [ngIf]="gridOptions.pagingEnabled">
            <ng-template #pagingComponent="ngComponentOutletEx" [ngComponentOutletEx]="gridOptions.pagingType"></ng-template>
        </ng-template>

        <div *ngIf="gridOptions.columnsSelection" class="column-selector">
            <a [title]="gridOptions.columnSelectionTitle || ''" style="cursor: pointer;" data-toggle="collapse" [attr.data-target]="'#columnSelection' + internalId">
                <span class="glyphicon glyphicon-list"></span>
            </a>

            <div class="{{gridOptions.columnSelectionCssClass}} collapse" [id]="'columnSelection' + internalId">
                <div class="clearfix">
                    <a class="pull-right" style="cursor: pointer;" data-toggle="collapse" [attr.data-target]="'#columnSelection' + internalId">
                        <span class="glyphicon glyphicon-remove"></span>
                    </a>
                </div>

                <div *ngFor="let column of columns; let index=index">
                    <dl *ngIf="column.selectionVisible">
                        <dt>
                            <input [id]="'column' + internalId + column.name" type="checkbox" [disabled]="!isColumnSelectionAllowed(column)" [checked]="column.visible" (click)="toggleColumn(index)">
                        </dt>
                        <dd>
                            <label [attr.for]="'column' + internalId + column.name">{{column.title}}</label>
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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit
{
    //######################### private fields #########################

    /**
     * Default options that are used for configuraging grid
     */
    private _defaultOptions: GridOptions;

    /**
     * Current page number of grid
     */
    private _page: number = null;

    /**
     * Current number of items per page
     */
    private _itemsPerPage: number = null;

    /**
     * Subscription for debounce dataCallback
     */
    private _debounceSubscription: Subscription = null;

    /**
     * Subscription for paging page change
     */
    private _pageChangeSubscription: Subscription = null;

    /**
     * Subscription for paging items per page change
     */
    private _itemsPerPageChangeSubscription: Subscription = null;

    /**
     * Subject for debounce dataCallback
     */
    private _debounceSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Final template used for no data found message
     */
    private _noDataFoundTemplate: TemplateRef<any>;

    /**
     * Backing field for data that are rendered in grid
     */
    private _data: any[];

    /**
     * Number of all items for current filter
     * @internal
     */
    private _totalCount: number;

    //######################### public properties - bindings #########################

    /**
     * Id that represents grid component
     * @internal
     */
    public internalId: string;

    /**
     * Row indexes that are displayed
     * @internal
     */
    public rowIndexes: number[] = [];

    /**
     * Column groups that are rendered
     * @internal
     */
    public columnGroups: ColumnGroupComponent[] = [];

    /**
     * Options that are used for configuring grid
     * @internal
     */
    public gridOptions: GridOptions;

    /**
     * Array of column definitions for columns
     * @internal
     */
    public columns: ColumnComponent[];

    //######################### public properties - children #########################

    /**
     * Array of column definitions for columns, content getter
     */
    @ContentChildren(ColumnComponent)
    public columnsComponents: QueryList<ColumnComponent>;

    /**
     * Array of column group definitions for grid, content getter
     */
    @ContentChildren(ColumnGroupComponent)
    public columnGroupsComponents: QueryList<ColumnGroupComponent>;

    /**
     * Custom template for no data found message
     */
    @ContentChild("noDataFoundTemplate")
    public noDataFoundCustom: TemplateRef<any>;

    /**
     * Default template for no data found message
     * @internal
     */
    @ViewChild("noDataFoundTemplate")
    public noDataFoundDefault: TemplateRef<any>;

    /**
     * Container for no data found message
     * @internal
     */
    @ViewChild("noDataFoundContainer", { read: ViewContainerRef })
    public noDataFoundContainer: ViewContainerRef;

    /**
     * Paging component that is rendered for grid
     * @internal
     */
    @ViewChild('pagingComponent')
    public pagingComponent: NgComponentOutletEx<PagingAbstractComponent>;

    //######################### public properties #########################

    /**
     * Gets or sets current page number of grid
     */
    public set page(page: number)
    {
        this._page = page;
        this._runOnPaging(paging => paging.page = this._page);
        this._setRowIndexes();

        this.refresh();
    }
    public get page(): number
    {
        return this._page;
    }

    /**
     * Gets or sets current number of items per page
     */
    public set itemsPerPage(itemsPerPage: number)
    {
        this._itemsPerPage = itemsPerPage;
        this._runOnPaging(paging => paging.itemsPerPage = this._itemsPerPage);

        let settings: GridCookieConfig = this.gridSettings;
        settings.selectItemsPerPage = this._itemsPerPage;
        this.gridSettings = settings;
        this._setRowIndexes();

        this.refresh();
    }
    public get itemsPerPage(): number
    {
        return this._itemsPerPage;
    }

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
        this._runOnPaging(paging => paging.totalCount = this._totalCount);

        let paginator: Paginator = this._setRowIndexes();
        let pageCount = paginator.getPageCount() || 1;

        if (pageCount < this.page)
        {
            this.page = pageCount;
        }
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

        this.gridOptions = options;

        if(isBlank(this.gridOptions))
        {
            this.gridOptions = this._defaultOptions;
        }

        Object.keys(this._defaultOptions).forEach(key =>
        {
            if(isBlank(this.gridOptions[key]))
            {
                this.gridOptions[key] = this._defaultOptions[key];
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
     * Current name of column that is used for ordering
     */
    private orderBy: string = null;

    /**
     * Current direction of ordering for selected column
     */
    private orderByDirection: OrderByDirection = null;

    /**
     * Gets visible columns
     */
    private get visibleColumns(): ColumnComponent[]
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
     * Gets column visibility settings cookie id
     */
    private get settingsCookieId(): string
    {
        return `grid-settings-${this.id}`;
    }

    /**
     * Gets or sets settings for current grid
     */
    private get gridSettings(): GridCookieConfig
    {
        if (!this.id)
        {
            return {};
        }

        return (<GridCookieConfig>this._cookieService.getCookie(this.settingsCookieId)) || {};
    };
    private set gridSettings(settings: GridCookieConfig)
    {
        if (this.id)
        {
            this._cookieService.setCookie(this.settingsCookieId, settings, 1000);
        }
    }

    //######################### constructor #########################
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _cookieService: CookieService)
    {
        this._defaultOptions = {
            pagingEnabled: true,
            columnsSelection: false,
            cssClass: "",
            columnSelectionCssClass: "column-selection",
            columnSelectionTitle: "",
            pagingOptions:
            {
                itemsPerPageValues: []
            },
            pagingType: BasicPagingComponent,
            initialItemsPerPage: 10,
            initialPage: 1,
            debounceDataCallback: 40,
            autoLoadData: true,
            dataCallback: (page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection) =>
            {
                console.log(page, itemsPerPage, orderBy, orderByDirection);
                //TODO - client implementation

                this.totalCount = this.data.length;
            }
        };

        this.gridOptions = this._defaultOptions;
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._debounceSubscription = this._debounceSubject
            .asObservable()
            .pipe(debounceTime(this.gridOptions.debounceDataCallback))
            .subscribe(() =>
            {
                this.selection = [];
                this.selectionChange.emit(this.selection);
                this.gridOptions.dataCallback(this.page,
                                           this.itemsPerPage,
                                           this.orderBy,
                                           this.orderByDirection);
            });

        this.internalId = Utils.common.generateId(16);
        this._page = this.gridOptions.initialPage;

        let settings = this.gridSettings;
        let itemsPerPage;

        if(isPresent(settings.selectItemsPerPage))
        {
            itemsPerPage = settings.selectItemsPerPage;
        }
        else
        {
            itemsPerPage = this.gridOptions.initialItemsPerPage;
        }

        if(this.gridOptions.autoLoadData)
        {
            this.itemsPerPage = itemsPerPage;
        }
        else
        {
            this._itemsPerPage = itemsPerPage;
            this._setRowIndexes();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._debounceSubscription)
        {
            this._debounceSubscription.unsubscribe();
            this._debounceSubscription = null;
        }

        if(this._itemsPerPageChangeSubscription)
        {
            this._itemsPerPageChangeSubscription.unsubscribe();
            this._itemsPerPageChangeSubscription = null;
        }

        if(this._pageChangeSubscription)
        {
            this._pageChangeSubscription.unsubscribe();
            this._pageChangeSubscription = null;
        }
    }

    //######################### public methods - implementation of AfterContentInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        let columns = this.columnsComponents.toArray();
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

        if(this.columnGroupsComponents.length > 0)
        {
            let groups = this.columnGroupsComponents.toArray();

            this.columnGroups = groups;
            this._calculateGroupColSpan();
        }
    }

    //######################### public methods - implementation of AfterViewInit #########################

    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {
        this._noDataFoundTemplate = this.noDataFoundDefault;

        if (this.noDataFoundCustom)
        {
            this._noDataFoundTemplate = this.noDataFoundCustom;
        }

        this._toggleNoDataTemplate();
        this._changeDetectorRef.detectChanges();

        this._initPaging();
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
        this._page = this.gridOptions.initialPage;
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
     * Invalidates visuals, runs change detection explicitly
     */
    public invalidateVisuals(): void
    {
        this._changeDetectorRef.detectChanges();
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

        if (this.gridOptions.rowSelectionEnabled)
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
    public isRowSelected(row: any): boolean
    {
        return this._getRowSelectionIndex(row) != -1;
    }

    /**
     * Check if column selection is allowed on particular column
     * @param {ColumnComponent} column instance of column
     * @returns true if column selection is allowed on particular column otherwise false
     */
    public isColumnSelectionAllowed(column: ColumnComponent): boolean
    {
        if (!column)
        {
            return false;
        }

        if ((column.visible && (!this.gridOptions.minVisibleColumns || this.visibleColumns.length > this.gridOptions.minVisibleColumns)) ||
            (!column.visible && (!this.gridOptions.maxVisibleColumns || this.visibleColumns.length < this.gridOptions.maxVisibleColumns)))
        {
            return true;
        }

        return false;
    }

    //######################### private methdos #########################

    /**
     * Sets row indexes
     * @returns Paginator paginator created to enable row numbering
     */
    private _setRowIndexes(): Paginator
    {
        let paginator = new Paginator();

        paginator.setPage(this.page)
            .setItemsPerPage(this.itemsPerPage)
            .setItemCount(this.totalCount);

        this.rowIndexes = paginator.getIndexesPerPage();

        return paginator;
    }

    /**
     * Calculates col spans for displayed column groups
     */
    private _calculateGroupColSpan()
    {
        if(this.columnGroups.length < 1)
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

        this.columnGroups.forEach(group =>
        {
            group.colSpan = colSpanCounter[group.name];
        });
    }

    /**
     * Returns selection index of row
     * @param  {any} row instance of row
     * @returns number -1 if row is not selected otherwise index of row
     */
    private _getRowSelectionIndex(row: any): number
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
     * Shows or hide no data found message based on retrieved data
     */
    private _toggleNoDataTemplate()
    {
        if (!this.noDataFoundContainer || !this._noDataFoundTemplate)
        {
            return;
        }

        this.noDataFoundContainer.clear();

        let noData: boolean = isBlank(this._data) || this._data.length == 0;

        if (noData)
        {
            this.noDataFoundContainer.createEmbeddedView(this._noDataFoundTemplate);
        }
    }

    /**
     * Initialize dynamic paging component
     */
    private _initPaging()
    {
        if(!this.pagingComponent)
        {
            return;
        }

        let paging = this.pagingComponent.component;
        paging.uninitialize();

        paging.pagingOptions = this.gridOptions.pagingOptions;
        paging.page = this.page;
        paging.itemsPerPage = this.itemsPerPage;
        paging.totalCount = this.totalCount;

        this._pageChangeSubscription = paging.pageChange.subscribe(page => this.page = page);
        this._itemsPerPageChangeSubscription = paging.itemsPerPageChange.subscribe(itemsPerPage => this.itemsPerPage = itemsPerPage);

        paging.invalidateVisuals();
        paging.initialize();
    }

    /**
     * Runs action on paging component and invalidates its content as default
     * @param {(paging: PagingAbstractComponent) => void} action Action to be run
     * @param {boolean} invalidateContent Indication whether invalidate content (defaults to true)
     */
    private _runOnPaging(action: (paging: PagingAbstractComponent) => void, invalidateContent: boolean = true)
    {
        if(!this.pagingComponent)
        {
            return;
        }

        let paging = this.pagingComponent.component;

        action(paging);

        if(invalidateContent)
        {
            paging.invalidateVisuals();
        }
    }
}

/**
 * Grid directives
 */
export const GRID_DIRECTIVES = [GridComponent, ColumnComponent, ColumnGroupComponent];