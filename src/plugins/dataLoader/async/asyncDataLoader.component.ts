import {Component, ChangeDetectionStrategy, Inject, Optional, ElementRef} from "@angular/core";
import {Utils} from "@anglr/common";

import {DATA_LOADER_OPTIONS, DataResponse} from "../dataLoader.interface";
import {AsyncDataLoaderOptions, AsyncDataLoader} from "./asyncDataLoader.interface";
import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from "../../../components/grid";
import {DataLoaderAbstractComponent} from "../dataLoaderAbstract.component";

/**
 * Default options for async data loader
 */
const defaultOptions: AsyncDataLoaderOptions<any, any> =
{
    autoLoadData: true,
    debounceDataCallback: 30,
    dataCallback: () => new Promise<any>(() => {})
};

/**
 * Data loader that allows asynchronous data loading
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

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }

    //######################### protected methodes - implements DataLoaderAbstractComponent #########################
    
    /**
     * Loads data from 'source'
     * @param {boolean} force Indication that data should be reloaded even if nothing changed
     */
    protected async _loadData(force?: boolean)
    {
        if(!force && !this._checkChanges())
        {
            return;
        }

        let result = await this._options.dataCallback(this._paging.page, this._paging.itemsPerPage, this._contentRenderer.ordering);

        this._paging.totalCount = result.totalCount;
        this._paging.invalidateVisuals();
        this._result = result;
        this.resultChange.emit();
    }
}