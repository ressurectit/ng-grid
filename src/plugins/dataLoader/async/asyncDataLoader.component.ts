import {Component, ChangeDetectionStrategy, Inject, Optional, ElementRef} from '@angular/core';

import {AsyncDataLoaderOptions, AsyncDataLoader} from './asyncDataLoader.interface';
import {DataLoaderAbstractComponent} from '../dataLoaderAbstract.component';
import {DataResponse} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';
import {DATA_LOADER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../misc/tokens';
import {DataLoaderState} from '../../../misc/enums';

/**
 * Default options for async data loader
 */
const defaultOptions: AsyncDataLoaderOptions =
{
    autoLoadData: true,
    debounceDataCallback: 30,
    dataCallback: () => new Promise<DataResponse<unknown>>(() => {return {data: [], totalCount: 0};}),
};

/**
 * Data loader that allows asynchronous data loading
 */
@Component(
{
    selector: 'ng-async-data-loader',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncDataLoaderSAComponent<TData = unknown, TOrdering = unknown> extends DataLoaderAbstractComponent<AsyncDataLoaderOptions<TData, TOrdering>, TOrdering, DataResponse<TData>> implements AsyncDataLoader<TData>
{
    //######################### private fields #########################

    /**
     * Current result of data loader
     */
    private ɵresult: DataResponse<TData> =
    {
        data: [],
        totalCount: 0
    };

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get result(): DataResponse<TData>
    {
        return this.ɵresult;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(DATA_LOADER_OPTIONS) @Optional() options?: AsyncDataLoaderOptions<TData, TOrdering>,)
    {
        super(pluginElement, gridPlugins, defaultOptions as unknown as AsyncDataLoaderOptions<TData, TOrdering>, options);
    }

    //######################### protected methodes - implements DataLoaderAbstractComponent #########################
    
    /**
     * @inheritdoc
     */
    protected async loadGridData(force?: boolean): Promise<void>
    {
        if(!this.checkChanges() && !force)
        {
            return;
        }

        this.ɵstate = (this.ɵresult && this.ɵresult.data && this.ɵresult.data.length) ? DataLoaderState.DataLoading : DataLoaderState.NoDataLoading;
        this.stateChangeSubject.next();

        const result = await this.ɵoptions.dataCallback(this.paging?.page ?? 1, this.paging?.itemsPerPage ?? 0, this.ordering?.ordering());

        this.ɵstate = (result && result.data && result.data.length) ? DataLoaderState.Loaded : DataLoaderState.NoData;
        this.stateChangeSubject.next();

        if(this.paging)
        {
            this.paging.totalCount = result.totalCount;
            this.paging.invalidateVisuals();
        }

        this.ɵresult = result;
        this.resultChangeSubject.next();
    }
}