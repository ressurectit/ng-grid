import {Component, ChangeDetectionStrategy, Inject, Optional, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {DataResponse} from "../dataLoader.interface";
import {DATA_LOADER_OPTIONS, DataLoaderState} from "../types";
import {AsyncDataLoaderOptions, AsyncDataLoader} from "./asyncDataLoader.interface";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {DataLoaderAbstractComponent} from "../dataLoaderAbstract.component";

/**
 * Default options for async data loader
 * @internal
 */
const defaultOptions: AsyncDataLoaderOptions<any, any> =
{
    autoLoadData: true,
    debounceDataCallback: 30,
    dataCallback: () => new Promise<any>(() => {})
};

/**
 * Data loader that allows asynchronous data loading
 * 
 * If you want to use async data loader you have to provide at least `dataCallback`.
 * 
 * Sample grid options
 * ``` typescript
 * var gridOptions =
 * {
 *     plugins:
 *     {
 *         dataLoader:
 *         {
 *             type: AsyncDataLoaderComponent, //this is default value could be omitted
 *             options: <AsyncDataLoaderOptions<DataType, SimpleOrdering>>
 *             {
 *                 dataCallback: this._getData.bind(this)
 *             }
 *         }
 *     }
 * };
 * ```
 * 
 * data callback should look like this
 * ``` typescript
 * private async _getData(page: number, itemsPerPage: number, ordering: SimpleOrdering): Promise<DataResponse<DataType>>
 * {
 *     let result = await this._dataSvc
 *         .getData(
 *         {
 *             page: (page - 1),
 *             size: itemsPerPage
 *         }).toPromise();
 * 
 *     return {
 *         data: result.content,
 *         totalCount: result.totalElements
 *     };
 * }
 * ```
 */
@Component(
{
    selector: 'ng-async-data-loader',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncDataLoaderComponent<TData, TOrdering> extends DataLoaderAbstractComponent<AsyncDataLoaderOptions<TData, TOrdering>, TOrdering, DataResponse<TData>> implements AsyncDataLoader<TData>
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
                @Inject(DATA_LOADER_OPTIONS) @Optional() options?: AsyncDataLoaderOptions<TData, TOrdering>)
    {
        super(pluginElement, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### protected methodes - implements DataLoaderAbstractComponent #########################
    
    /**
     * Loads data from 'source'
     * @param force Indication that data should be reloaded even if nothing changed
     */
    protected async _loadData(force?: boolean)
    {
        if(!force && !this._checkChanges())
        {
            return;
        }

        this._state = (this._result && this._result.data && this._result.data.length) ? DataLoaderState.DataLoading : DataLoaderState.NoDataLoading;
        this.stateChange.emit();

        let result = await this._options.dataCallback(this._paging.page, this._paging.itemsPerPage, this._contentRenderer.ordering);

        this._state = (result && result.data && result.data.length) ? DataLoaderState.Loaded : DataLoaderState.NoData;
        this.stateChange.emit();

        this._paging.totalCount = result.totalCount;
        this._paging.invalidateVisuals();
        this._result = result;
        this.resultChange.emit();
    }
}