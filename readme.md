# Angular Grid

Implementation of angular grid for displaying data.

Module contains component for *Grid* and *Paging*.

* [Installation](#installation)
* [Types](#types)
* [Usage](#usage)
* [API](#api)
* [Change Log](./changelog.md)

## Installation

To install latest version of this module you just run:

```nocode
npm install "@anglr/grid" --save
```

### SystemJs Usage

In your **SystemJs** configuration script add following lines to `packages` configuration section:

```javascript
packages:
{
    '@anglr/grid': 
    {
        main: "dist/index.dev.min.js",
        defaultExtension: 'js'
    }
}
```

### Webpack Usage

In your application create file called *dependencies.ts* and add following line:
```typescript
import '@anglr/grid';
```

Then add this file as `entry` point in your *webpack.config.js*:
```javascript
"vendor-import": path.join(__dirname, "pathToVendorTsDirectory/vendor.ts")
```

Then reference this file in your *index.html* at the end of body before application start javascript:
```html
<script src="webpackOutputDirectory/vendor-import.js"></script>
```

## Types

Available types:

### Modules

 - `GridModule`

### Components

- `PagingComponent`
- `ColumnComponent`
- `GridComponent`

### Interfaces

- `GridOptions`

## Usage

### Import Module

This enables usage of all 'Grid' components.

```typescript
import {NgModule} from '@angular/core';
import {GridModule} from '@anglr/grid';
import {BasicGridComponent} from './basicGrid.component';
import {AdvancedGridComponent} from './advancedGrid.component';

/**
 * Definition of your module
 */
@NgModule(
{
    imports: [GridModule],
    declarations: [BasicGridComponent, AdvancedGridComponent]
})
export class YourModule
{
}
```

### Grid basic usage

#### Typescript

*basicGrid.component.ts*
```typescript
import {Component} from '@angular/core';
import {GridOptions} from '@anglr/grid';
import {OrderByDirection} from '@anglr/common';

/**
 * Basic grid sample component
 */
@Component(
{
    moduleId: module.id,
    templateUrl: 'basicGrid.component.html'
})
export class BasicGridComponent
{
    //######################### public properties #########################

    /**
     * Grid options that are used for grid initialization
     */
    public gridOptions: GridOptions;

    /**
     * Data for grid
     */
    public data: any[] = [];

    /**
     * Number of all items
     */
    public totalCount: number = 0;

    //######################### constructor #########################
    constructor()
    {
        this.gridOptions =
        {
            initialItemsPerPage: 10,
            initialPage: 1,
            dataCallback: this._getData.bind(this),
            itemsPerPageValues: [10, 20]
        };
    }

    //######################### private methods #########################

    /**
     * Gets data for grid
     * @param  {number} page Index of requested page
     * @param  {number} itemsPerPage Number of items per page
     * @param  {string} orderBy Order by column name
     * @param  {OrderByDirection} orderByDirection Order by direction
     * @param  {IFinancialRecordFilter} filterData Filter data
     */
    private _getData(page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection): void
    {
        this.data =
        [
            {
                name: "Testo",
                surname: "Steron",
                email: "testo@steron.sk",
                address: "Veľká Suchá"
            },
            {
                name: "Testovič",
                surname: "Testov",
                email: "testovic@testov.sk",
                address: "Pondelok"
            }
        ];

        this.totalCount = 2;
    }
}
```

#### Template

*basicGrid.component.html*
``` html
<div>
    <ng-grid id="gridUniqueIdPerApp" [data]="data" [options]="gridOptions" [totalCount]="totalCount">
        <ng-column name="name" title="First name"></ng-column>
        <ng-column name="surname" title="Surname"></ng-column>
        <ng-column name="email" title="E-Mail"></ng-column>
        <ng-column name="address" title="Address"></ng-column>
    </ng-grid>
</div>
```

### Grid advanced usage

#### Typescript

*advancedGrid.component.ts*
``` typescript
import {Component, ViewChild} from '@angular/core';
import {GridComponent, GridOptions} from '@anglr/grid';
import {OrderByDirection} from '@anglr/common';

/**
 * Basic grid sample component
 */
@Component(
{
    moduleId: module.id,
    templateUrl: 'advancedGrid.component.html'
})
export class AdvancedGridComponent
{
    //######################### private fields #########################

    /**
     * Object of grid component
     */
    @ViewChild("advancedGrid")
    protected _grid: GridComponent = null;

    //######################### public properties #########################

    /**
     * Grid options that are used for grid initialization
     */
    public gridOptions: GridOptions;

    /**
     * Data for grid
     */
    public data: any[] = [];

    /**
     * Number of all items
     */
    public totalCount: number = 0;

    //######################### constructor #########################
    constructor()
    {
        this.gridOptions =
        {
            initialItemsPerPage: 10,
            initialPage: 1,
            dataCallback: this._getData.bind(this),
            itemsPerPageValues: [10, 20]
        };
    }

    //######################### private methods #########################

    /**
     * Refresh content of grid
     */
    private _refresh()
    {
        this._grid.refresh();
    }

    /**
     * Gets data for grid
     * @param  {number} page Index of requested page
     * @param  {number} itemsPerPage Number of items per page
     * @param  {string} orderBy Order by column name
     * @param  {OrderByDirection} orderByDirection Order by direction
     * @param  {IFinancialRecordFilter} filterData Filter data
     */
    private _getData(page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection): void
    {
        this.data =
        [
            {
                name: "Testo",
                surname: "Steron",
                email: "testo@steron.sk",
                address: "Veľká Suchá"
            },
            {
                name: "Testovič",
                surname: "Testov",
                email: "testovic@testov.sk",
                address: "Pondelok"
            }
        ];

        this.totalCount = 2;
    }
}
```

#### Template

*advancedGrid.component.html*
``` html
<div>
    <ng-grid id="gridUniqueIdPerApp" [data]="data" [options]="gridOptions" [totalCount]="totalCount">
        <ng-column name="name" title="First name" [ordering]="true"></ng-column>
        <ng-column name="surname" title="Surname" [titleVisible]="false"></ng-column>
        <ng-column name="email" title="E-Mail" headerClass="text-right" cellClass="text-right content-nowrap"></ng-column>

        <ng-column name="address" title="Address">
            <ng-template let-col>
                {{col.email}} - {{col.address}}
            </ng-template>
        </ng-column>
    </ng-grid>

    <a href="#" (click)="_refresh()">refresh</a>
</div>
```

## API

### `GridOptions` - Options for grid configuration

#### *Properties*

- `pagingEnabled?: boolean` - Indication whether is paging enabled
- `columnsSelection?: boolean` - Indication whether is column selection allowed
- `cssClass?: string` - Css class that is applied to root div of grid
- `columnGroupCssClass?: string` - Css class that is applied to each column group row
- `columnSelectionCssClass?: string` - Name of css class that is applied to column selection div
- `columnSelectionTitle?: string` - Title that is shown while hovering over column selection icon
- `initialPage?: number` - Initial page index that will be rendered
- `initialItemsPerPage?: number` - Initial number of items per page that will be rendered
- `itemsPerPageValues?: number[]` - Available values for items per page, if not set you wont be able to change number items per page
- `debounceDataCallback?: number` - Number of miliseconds that are used for debounce call of dataCallback, or false
- `minVisibleColumns?: number` - Minimal number of visible columns for grid
- `maxVisibleColumns?: number` - Maximal number of visible columns for grid
- `dataCallback?: (page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection) => void` - Callback that is used for changing displayed data
- `rowSelectionEnabled?: boolean` - Indication whether row selection is enabled
---
### `PagingComponent` - Component used for rendering paging

#### *Component*
 - `selector: "paging"`
 - `inputs`
    - `itemsPerPageValues: number[]` - Gets or sets array of available values for itemsPerPage DEFAULT: []
    - `pagesDispersion: number` - Page dispersion parameter for rendered pages DEFAULT: 4
    - `page: number` - Gets or sets index of currently selected page
    - `itemsPerPage: number` - Gets or sets number of items currently used for paging
    - `totalCount: number` - Gets or sets number of all items that are paged with current filter criteria
 - `outputs`
    - `pageChange: EventEmitter<number>` - Occurs when index of currently selected page has been changed
    - `itemsPerPageChange: EventEmitter<number>` - Occurs when number of items per page currently selected has been changed

#### *Properties*
 - `itemsPerPageValues: number[]` - Gets or sets array of available values for itemsPerPage DEFAULT: []
 - `pagesDispersion: number` - Page dispersion parameter for rendered pages DEFAULT: 4
 - `page: number` - Gets or sets index of currently selected page
 - `itemsPerPage: number` - Gets or sets number of items currently used for paging
 - `totalCount: number` - Gets or sets number of all items that are paged with current filter criteria
 - `pageChange: EventEmitter<number>` - Occurs when index of currently selected page has been changed
 - `itemsPerPageChange: EventEmitter<number>` - Occurs when number of items per page currently selected has been changed
    
---
### `ColumnComponent` - Definition of column metadata

#### *Component*
 - `selector: "ng-grid > ng-column"`
 - `inputs`
    - `name: string` - Name of property which is assigned to this column
    - `title: string` - Title of column that is displayed in grid header
    - `titleVisible: boolean` - Indication whether should be title visible in header of table DEFAULT: true
    - `ordering: boolean` - Indication that this column can be used for ordering DEFAULT: false
    - `visible: boolean` - Indication that this column is visible in grid DEFAULT: true
    - `width: string` - Width as style string, value is exactly same (require units) DEFAULT: null
    - `headerClass: string` - Css class that is applied to column header DEFAULT: null
    - `cellClass: string` - Css class that is applied to each column cell DEFAULT: null
    - `columnGroupName: string` - Name of column group that is this column assigned to DEFAULT: null
    - `headerTooltip: string` - Text that is displayed in tooltip over grid header
    - `selectionVisible: boolean` - Indication that this column can be used for selection DEFAULT: true
 - `contentChild`
    - `TemplateRef` - Template that is used for rendering of cell, must be first if not used bodyTemplate
        - **template variables** 
            - `$implicit: any` - Data of current row
            - `column: ColumnComponent` -  Object of column itself
            - `index: number` - Index of rendered row in current page
            - `rowIndex: number` - Row index of displayed item
        - `'headerTemplate'` - Template that is used for rendering of cell header
            - **template variables** 
                - `column: ColumnComponent` -  Object of column itself
        - `'bodyTemplate'` - Template that is used for rendering of cell body
            - **template variables** 
                - `column: ColumnComponent` -  Object of column itself

---
### `ColumnGroupComponent` - Definition of column group metadata

#### *Component*
 - `selector: "ng-grid > ng-columnGroup, ng-columnGroup > ng-columnGroup"`
 - `inputs`
    - `name: string` - Name of column group
    - `title: string` - Title of column group that is displayed
    - `cssClass: string` - Css class that is applied to column group

---
### `GridComponent` - Grid component used for displaying data

#### *Component*
 - `selector: "ng-grid"`
 - `inputs`
    - `id: string` - Id of grid, must be unique
    - `data: any[]` - Gets or sets data that are rendered in grid
    - `totalCount: number` - Number of all items for current filter
    - `rowCssClassCallback: (rowData: any) => string` - Callback function that is called for each row with data of row and allows you to return string css classes, enables adding special css classes to row
    - `options: GridOptions` - Set options that are used for configuring grid
    - `selection: any` - Selected rows
    - `rowSelectionClass: string` - CSS class for selected rows
    - `noDataMessage: string` - Message for no data found alert default template
 - `outputs`
    - `selectionChange: EventEmitter<any>` - Occurs when row selection was changed
    - `columnSelectionChange: EventEmitter<any>` - Occurs when column selection was changed
 - `contentChildren`
    - `ColumnComponent` - Array of column definitions for columns, content getter
    - `ColumnGroupComponent` - Array of column group definitions for grid, content getter
 - `contentChild`
    - `TemplateRef`
        - `'noDataFoundTemplate'` - Custom template for no data found message
 
 #### *Properties*
 - `id: string` - Id of grid, must be unique
 - `data: any[]` - Gets or sets data that are rendered in grid
 - `totalCount: number` - Number of all items for current filter
 - `rowCssClassCallback: (rowData: any) => string` - Callback function that is called for each row with data of row and allows you to return string css classes, enables adding special css classes to row
 - `options: GridOptions` - Set options that are used for configuring grid
 - `page: number` - Gets or sets current page number of grid
 - `itemsPerPage: number` - Gets or sets current number of items per page
 - `selection: any` - Selected rows
 - `rowSelectionClass: string` - CSS class for selected rows
 - `selectionChange: EventEmitter<any>` - Occurs when row selection was changed

 #### *Methods*
 - `toggleColumn(index: number)` - Toggles visibility of column
    - `index: number` - Index of toggled column
 - `refreshToDefault()` - Refresh grid data with initial paging and ordering
 - `refresh()` - Refresh grid data
 - `performsOrdering(orderingColumn: ColumnComponent|string)` - Performs ordering on provided column
    - `orderingColumn: ColumnComponent|string` - Name of column or column itself that is used for ordering
 - `toggleRowSelection(row: any, event: MouseEvent)` - Toggles selection on row
    - `row: any` - selected row
    - `event: MouseEvent` - mouse click event
 - `isRowSelected(row: any) : boolean` - Check if row is selected
    - `row: any` - instance of row