import {Component, Input, Attribute, OnInit, AfterContentInit, ContentChildren, QueryList, ViewContainerRef} from 'angular2/core';
import {ColumnComponent} from './column.component';
import {PagingComponent} from '../paging/paging.component';
import {GridOptions} from './gridOptions';
import {isBlank, isPresent} from 'angular2/src/facade/lang';
import {OrderByDirection} from 'ng2-common/types';
import utils from 'ng2-common/utils';

/**
 * Renderer that is used for rendering column template
 */
@Component(
{
    selector: "ng2-grid > column-template-renderer",
    template: ''
})
class ColumnTemplateRenderer implements OnInit
{
    //######################### public properties - inputs #########################

    /**
     * Column definition for currenttly rendered column
     */
    @Input() 
    public column: ColumnComponent;

    /**
     * Data to be used for rendering
     */
    @Input() 
    public rowData: any;

    //######################### constructor #########################
    constructor(private _viewContainer: ViewContainerRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        let view = this._viewContainer.createEmbeddedView(this.column.template);
        view.setLocal('\$implicit', this.rowData);
        view.setLocal('column', this.column);
    }
}

/**
 * Grid component used for displaying data
 */
@Component(
{
    selector: 'ng2-grid',
    directives: [ColumnTemplateRenderer, PagingComponent],
    template:
   `<div style="position: relative;" class="table-div {{_options.cssClass}}">
        <table class="table table-condensed table-striped table-hover">
            <thead>
                <tr>
                    <th *ngFor="#column of columns" [ngClass]="{hidden: !column.visible}" [ngStyle]="{width: column.width}">
                        {{column.title}}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr *ngFor="#row of data">
                    <td *ngFor="#column of columns" [ngClass]="{hidden: !column.visible}">
                        <div *ngIf="column.template">
                            <column-template-renderer [column]="column" [rowData]="row"></column-template-renderer>
                        </div>
                        
                        <div *ngIf="!column.template">
                            {{row[column.name]}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <paging *ngIf="_options.pagingEnabled" 
                [(page)]="page"
                [(itemsPerPage)]="itemsPerPage"
                [totalCount]="totalCount">
        </paging>
        
        <div *ngIf="_options.columnsSelection" class="column-selector">
            <a style="cursor: pointer;" data-toggle="collapse" [attr.data-target]="'#columnSelection' + id">
                <span class="glyphicon glyphicon-list"></span>
            </a>
            
            <div class="{{_options.columnSelectionCssClass}} collapse" [id]="'columnSelection' + id">
                <div class="clearfix">
                    <a class="pull-right" style="cursor: pointer;" data-toggle="collapse" [attr.data-target]="'#columnSelection' + id">
                        <span class="glyphicon glyphicon-remove"></span>
                    </a>
                </div>
                
                <div *ngFor="#column of columns; #index=index">
                    <dl>
                        <dt>
                            <input [id]="'column' + id + column.name" type="checkbox" [checked]="column.visible" (click)="toggleColumn(index)">
                        </dt>
                        <dd>
                            <label [attr.for]="'column' + id + column.name">{{column.title}}</label>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>`,
    styles: 
    [`
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
    `]
})
export class GridComponent implements OnInit, AfterContentInit
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
     * Array of column definitions for columns, content getter
     */
    @ContentChildren(ColumnComponent) 
    private _columns: QueryList<ColumnComponent>;
    
    //######################### public properties #########################
    
    /**
     * Id of grid, must be unique
     */
    public id: string;
    
    /**
     * Gets or sets current page number of grid
     */
    public set page(page: number)
    {
        this._page = page;
        
        this._options.dataCallback(page, 
                                   this.itemsPerPage, 
                                   this.orderBy, 
                                   this.orderByDirection);
    }
    public get page(): number
    {
        return this._page;
    }
    
    /**
     * Current number of items per page
     */
    public itemsPerPage: number = null;
    
    /**
     * Current name of column that is used for ordering
     */
    public orderBy: string = null;
    
    /**
     * Current direction of ordering for selected column
     */
    public orderByDirection: OrderByDirection = null;
    
    /**
     * Array of column definitions for columns
     */
    private columns: ColumnComponent[];

    //######################### public properties - inputs #########################

    /**
     * Data that are rendered in grid
     */
    @Input() 
    public data: any[] = [];
    
    /**
     * Number of all items for current filter
     */
    @Input() 
    public totalCount: number = null;
 
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
    
    //######################### private properties #########################
    
    /**
     * Gets column visibility settings cookie id 
     */
    private get colSettingsCookieId(): string
    {
        return `grid-colsettings-${this.id}`;
    }
    
    //######################### constructor #########################
    constructor(@Attribute("id") id) 
    {
        this.id = isBlank(id) ? utils.common.generateId(16) : id;
        
        this._defaultOptions = {
            pagingEnabled: true,
            columnsSelection: false,
            cssClass: "",
            columnSelectionCssClass: "column-selection",
            initialItemsPerPage: 10,
            initialPage: 1,
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
        this._page = this._options.initialPage;
        this.itemsPerPage = this._options.initialItemsPerPage;
    }
    
    //######################### public methods - implementation of AfterContentInit #########################
    
    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        let columns = this._columns.toArray();
        let columnsSettings = <boolean[]>utils.cookies.getCookie(this.colSettingsCookieId);
        
        if(isPresent(columnsSettings))
        {
            for(let x = 0; x < columnsSettings.length; x++)
            {
                if(columns.length == x)
                {
                    break;
                }
                
                columns[x].visible = columnsSettings[x];
            }
        }
        
        this.columns = columns;
    }
    
    //######################### public methods #########################
    
    /**
     * Toggles visibility of column
     * @param  {number} index Index of toggled column
     */
    public toggleColumn(index: number)
    {
        this.columns[index].visible = !this.columns[index].visible;
        
        utils.cookies.setCookie(this.colSettingsCookieId, this.columns.map(itm => itm.visible), 1000);
    }
    
    /**
     * Refresh grid data with initial paging and ordering
     */
    public refreshToDefault()
    {
        this._page = this._options.initialPage;
        
        this._options.dataCallback(this.page, 
                                   this.itemsPerPage, 
                                   this.orderBy, 
                                   this.orderByDirection);
    }
}

/**
 * Grid directives
 */
export const GRID_DIRECTIVES = [GridComponent, ColumnComponent];