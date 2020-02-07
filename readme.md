# Angular Grid

This is readme for `Angular` grid.

Implementation of `Angular` grid for displaying data. Absolutely customizable `Angular` grid. Every part of grid can be customized or replaced with own implementation. Should allow you to create any custom requested feature.

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Sample](#sample)

## Description

* Module supports `Angular` Server Side Rendering
* Module supports `Angular` Ahead of Time Compilation
* Grid is composed of plugins and replecable parts, allows to change implementation of these plugins
* All components are set to `OnPush` change detection
* Supports *Angular IVY*

## Installation

To install latest version of this module you just run:

```nocode
npm install "@anglr/grid" --save
```

## Usage

Tutorials and basic description can be found at [Homepage](https://ressurectit.github.io/#/content/grid)

## Sample

```typescript
import {Component, ChangeDetectionStrategy} from "@angular/core";
import {GridOptions, SimpleOrdering, BasicPagingOptions, AsyncDataLoaderOptions, DataResponse} from "@anglr/grid";

import {Address, DataService} from "../../../services/api/data";
import {Orderable} from "../../../misc/types";

/**
 * Basic sample for grid component
 */
@Component(
{
    selector: 'basic-sample',
    templateUrl: 'basicSample.component.html',
    providers: [DataService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSampleComponent
{
    //######################### public properties - template bindings #########################

    /**
     * Grid options that are used for grid initialization
     */
    public gridOptions: GridOptions;

    //######################### constructor #########################
    constructor(private _dataSvc: DataService)
    {
        this.gridOptions =
        {
            plugins:
            {
                dataLoader:
                {
                    options: <AsyncDataLoaderOptions<Address, SimpleOrdering>>
                    {
                        //data callback used for getting data asynchronously
                        dataCallback: this._getData.bind(this)
                    }
                },
                paging:
                {
                    options: <BasicPagingOptions>
                    {
                        //available values for items per page buttons
                        itemsPerPageValues: [5, 10, 20],
                        //initial value of items per page, should be one of above
                        initialItemsPerPage: 5
                    }
                }
            }
        };
    }

    //######################### private methods #########################

    /**
     * Callback used for obtaining data
     * @param page - Index of requested page
     * @param itemsPerPage - Number of items per page
     * @param ordering - Order by column name
     */
    private async _getData(page: number, itemsPerPage: number, ordering: SimpleOrdering): Promise<DataResponse<Address>>
    {
        let reqOrdering: Orderable = null;

        if(ordering)
        {
            reqOrdering = 
            {
                direction: ordering.orderByDirection,
                sort: ordering.orderBy
            };
        }

        let result = await this._dataSvc
            .getData({
                        page: page,
                        size: itemsPerPage
                    },
                    reqOrdering)
            .toPromise();

        return {
            data: result.content,
            totalCount: result.totalElements
        };
    }
}
```

```html
<ng-grid [gridOptions]="gridOptions">
    <basic-table-metadata>
        <basic-table-column id="country" name="country" title="Country"></basic-table-column>
        <basic-table-column id="city" name="city" title="City"></basic-table-column>
        <basic-table-column id="zip" name="zip" title="ZIP"></basic-table-column>
        <basic-table-column id="street" name="street" title="Street"></basic-table-column>
        <basic-table-column id="houseNumber" name="houseNumber" title="House Number"></basic-table-column>
    </basic-table-metadata>
</ng-grid>
```