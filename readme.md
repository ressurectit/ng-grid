# Angular 2 Grid

Implementation of angular 2 grid for displaying data.

Module contains component for *Grid* and *Paging*.

* [Installation](#installation)
* [Types](#types)
* [Usage](#usage)
* [API](#api)
* [Change Log](./changelog.md)

## Installation

To install latest version of this module you just run:

``` nocode
npm install "@ng2/grid" --save
```

In your `index.html` add following line after loading *angular2* javascript in your `<head>`:

``` html
<script src="node_modules/@ng2/grid/index.min.js"></script>
```

You have to use `SystemJs` for module loading to enable this module to work.
Then just use this module in your typescript files by importing requested types from modules.

## Types

Available types:

### Components

- `PagingComponent`
- `ColumnComponent`
- `GridComponent`
- `GRID_DIRECTIVES` - contains (`PagingComponent`, `ColumnComponent`, `GridComponent`) components

### Interfaces

- `GridOptions`

## Usage

### Grid basic usage

#### Typescript

*basicGrid.component.ts*
``` typescript
import {Component} from '@angular/core';
import {GRID_DIRECTIVES, GridOptions} from '@ng2/grid';

/**
 * Basic grid sample component
 */
@Component(
{
    moduleId: __moduleName,
    templateUrl: 'basicGrid.component.html',
    directives: [GRID_DIRECTIVES]
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
    <ng2-grid id="gridUniqueIdPerApp" [data]="data" [options]="gridOptions" [totalCount]="totalCount">
        <ng2-column name="name" title="First name"></ng2-column>
        <ng2-column name="surname" title="Surname"></ng2-column>
        <ng2-column name="email" title="E-Mail"></ng2-column>
        <ng2-column name="address" title="Address"></ng2-column>
    </ng2-grid>
</div>
```

### Grid advanced usage

#### Typescript

*advancedGrid.component.ts*
``` typescript
import {Component, ViewChild} from '@angular/core';
import {GRID_DIRECTIVES, GridComponent, GridOptions} from '@ng2/grid';

/**
 * Basic grid sample component
 */
@Component(
{
    moduleId: __moduleName,
    templateUrl: 'advancedGrid.component.html',
    directives: [GRID_DIRECTIVES]
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
    <ng2-grid id="gridUniqueIdPerApp" [data]="data" [options]="gridOptions" [totalCount]="totalCount">
        <ng2-column name="name" title="First name" [ordering]="true"></ng2-column>
        <ng2-column name="surname" title="Surname" [titleVisible]="false"></ng2-column>
        <ng2-column name="email" title="E-Mail" headerClass="text-right" cellClass="text-right content-nowrap"></ng2-column>

        <ng2-column name="address" title="Address">
            <template let-col>
                {{col.email}} - {{col.address}}
            </template>
        </ng2-column>
    </ng2-grid>

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
- `initialPage?: number` - Initial page index that will be rendered
- `initialItemsPerPage?: number` - Initial number of items per page that will be rendered
- `itemsPerPageValues?: number[]` - Available values for items per page, if not set you wont be able to change number items per page
- `debounceDataCallback?: number` - Number of miliseconds that are used for debounce call of dataCallback, or false
- `dataCallback?: (page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection) => void` - Callback that is used for changing displayed data

---
### `PagingComponent` - Component used for rendering paging

#### *Component*
 - `selector: "paging"`
 - `inputs`
    - `itemsPerPageValues: number[]` - Gets or sets array of available values for itemsPerPage
    - `pagesDispersion: number` - Page dispersion parameter for rendered pages DEFAULT: 4
    - `page: number` - Gets or sets index of currently selected page
    - `itemsPerPage: number` - Gets or sets number of items currently used for paging
    - `totalCount: number` - Gets or sets number of all items that are paged with current filter criteria
    - `displayedItemsCount: number` - Number of displayed items DEFAULT: 0
 - `outputs`
    - `pageChange: EventEmitter<number>` - Occurs when index of currently selected page has been changed
    - `itemsPerPageChange: EventEmitter<number>` - Occurs when number of items per page currently selected has been changed

#### *Properties*
 - `page: number` - Gets or sets index of currently selected page
 - `itemsPerPage: number` - Gets or sets number of items currently used for paging
 - `totalCount: number` - Gets or sets number of all items that are paged with current filter criteria
 - `pageChange: EventEmitter<number>` - Occurs when index of currently selected page has been changed
 - `itemsPerPageChange: EventEmitter<number>` - Occurs when number of items per page currently selected has been changed
 - `displayedItemsCount: number` - Number of displayed items DEFAULT: 0
    
---
### `ColumnComponent` - Definition of column metadata

#### *Component*
 - `selector: "ng2-grid > ng2-column"`
 - `inputs`