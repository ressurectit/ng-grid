import {Component, ChangeDetectionStrategy, Inject, Optional, ElementRef} from "@angular/core";
import {extend, OrderByDirection} from "@jscrpt/common";
import {from, Observable} from "rxjs";
import {skip, take, toArray} from "rxjs/operators";

import {SyncDataLoaderOptions, SyncDataLoader} from "./syncDataLoader.interface";
import {DATA_LOADER_OPTIONS, DataLoaderState} from "../types";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {DataResponse} from "../dataLoader.interface";
import {DataLoaderAbstractComponent} from "../dataLoaderAbstract.component";
import {SimpleOrdering} from "../../contentRenderer";

/**
 * Default options for sync data loader
 * @internal
 */
const defaultOptions: SyncDataLoaderOptions<any, SimpleOrdering> =
{
    autoLoadData: true,
    debounceDataCallback: 30,
    data: [],
    orderData: (data: any[], ordering: SimpleOrdering) =>
    {
        if(!ordering)
        {
            return data;
        }

        return data.sort((a, b) =>
        {
            if(a[ordering.orderBy] < b[ordering.orderBy])
            {
                return ordering.orderByDirection == OrderByDirection.Ascendant ? -1 : 1;
            }
            else if(a[ordering.orderBy] > b[ordering.orderBy])
            {
                return ordering.orderByDirection == OrderByDirection.Ascendant ? 1 : -1;
            }

            return 0;
        });
    }
};

/**
 * Data loader that allows synchronous data loading
 *
 * @example
 * If you want to use this loader you have to provide all data you want to be displayed in grid
 *
 * You have to provide data at least
 * ``` typescript
 * var arrayOfItems: DataType[] = [];
 *
 * var gridOptions =
 * {
 *      plugins:
 *      {
 *          dataLoader:
 *          {
 *              type: SyncDataLoaderComponent,
 *              options: <SyncDataLoaderOptions<DataType, SimpleOrdering>>
 *              {
 *                  data: arrayOfItems
 *              }
 *          }
 *      }
 * };
 * ```
 * 
 * You must set these options before end of sync call of `ngOnInit`, if you set it later you have to disable auto initialization of grid and initialize it manualy
 */
@Component(
{
    selector: 'ng-sync-data-loader',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncDataLoaderComponent<TData, TOrdering> extends DataLoaderAbstractComponent<SyncDataLoaderOptions<TData, TOrdering>, TOrdering, DataResponse<TData>> implements SyncDataLoader<TData>
{
    //######################### private fields #########################

    /**
     * Current result of data loader
     */
    private _result?: DataResponse<TData> =
    {
        data: [],
        totalCount: 0
    };

    //######################### public properties #########################

    /**
     * Current result of data loader
     */
    public get result(): DataResponse<TData>
    {
        return this._result;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(DATA_LOADER_OPTIONS) @Optional() options?: SyncDataLoaderOptions<TData, TOrdering>)
    {
        super(pluginElement, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### protected methodes - implements DataLoaderAbstractComponent #########################

    /**
     * Loads data from 'source'
     * @param force - Indication that data should be reloaded even if nothing changed
     */
    protected async _loadData(force?: boolean)
    {
        if(!force && !this._checkChanges())
        {
            return;
        }

        let data = [...this._options.data];

        this._state = (data && data.length) ? DataLoaderState.DataLoading : DataLoaderState.NoDataLoading;
        this.stateChange.emit();

        if(this._options.orderData)
        {
            data = this._options.orderData(data, this._contentRenderer.ordering);
        }

        data = await from(data)
            .pipe(skip((this._paging.page - 1) * (isNaN(this._paging.itemsPerPage) ? 0 : this._paging.itemsPerPage)),
                  isNaN(this._paging.itemsPerPage) ? ((source: Observable<TData>) => source) : take(this._paging.itemsPerPage),
                  toArray())
            .toPromise();

        this._state = (data && data.length) ? DataLoaderState.Loaded : DataLoaderState.NoData;
        this.stateChange.emit();

        this._result =
        {
            data: data,
            totalCount: this._options.data.length
        };

        this.resultChange.emit();
    }
}