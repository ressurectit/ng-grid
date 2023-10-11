import {Component, ChangeDetectionStrategy, Inject, Optional, ElementRef} from '@angular/core';
import {OrderByDirection} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {from, Observable} from 'rxjs';
import {skip, take, toArray} from 'rxjs/operators';

import {SyncDataLoaderOptions, SyncDataLoader} from './syncDataLoader.interface';
import {DataLoaderAbstractComponent} from '../dataLoaderAbstract.component';
import {DataResponse, SimpleOrdering} from '../../../interfaces';
import {DATA_LOADER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../misc/tokens';
import {GridPluginInstances} from '../../../misc/types';
import {DataLoaderState} from '../../../misc/enums';

/**
 * Default options for sync data loader
 */
const defaultOptions: SyncDataLoaderOptions<Record<string, number>, SimpleOrdering> =
{
    autoLoadData: true,
    debounceDataCallback: 30,
    data: [],
    orderData: (data: Record<string, number>[], ordering?: SimpleOrdering) =>
    {
        if(!ordering)
        {
            return data;
        }

        return data.sort((a, b) =>
        {
            if(a[ordering.orderBy] < b[ordering.orderBy])
            {
                return ordering.orderByDirection == OrderByDirection.Ascending ? -1 : 1;
            }
            else if(a[ordering.orderBy] > b[ordering.orderBy])
            {
                return ordering.orderByDirection == OrderByDirection.Ascending ? 1 : -1;
            }

            return 0;
        });
    }
};

/**
 * Data loader that allows synchronous data loading
 *
 * You must set options before end of sync call of `ngOnInit`, if you set it later you have to disable auto initialization of grid and initialize it manualy
 */
@Component(
{
    selector: 'ng-sync-data-loader',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncDataLoaderSAComponent<TData = unknown, TOrdering = unknown> extends DataLoaderAbstractComponent<SyncDataLoaderOptions<TData, TOrdering>, TOrdering, DataResponse<TData>> implements SyncDataLoader<TData>
{
    //######################### protected fields #########################

    /**
     * Current result of data loader
     */
    protected ɵresult: DataResponse<TData> =
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
                @Inject(DATA_LOADER_OPTIONS) @Optional() options?: SyncDataLoaderOptions<TData, TOrdering>)
    {
        super(pluginElement, gridPlugins, defaultOptions as unknown as SyncDataLoaderOptions<TData, TOrdering>, options);
    }

    //######################### protected methodes - implements DataLoaderAbstractComponent #########################

    /**
     * @inheritdoc
     */
    protected async loadGridData(force?: boolean): Promise<void>
    {
        if(!force && !this.checkChanges())
        {
            return;
        }

        let data = [...this.ɵoptions.data];

        this.ɵstate = (data && data.length) ? DataLoaderState.DataLoading : DataLoaderState.NoDataLoading;
        this.stateChangeSubject.next();

        if(this.ɵoptions.orderData)
        {
            data = this.ɵoptions.orderData(data, this.ordering?.ordering ?? undefined);
        }

        data = await lastValueFrom(from(data)
            .pipe(skip(((this.paging?.page ?? 1) - 1) * (isNaN(this.paging?.itemsPerPage ?? 0) ? 0 : (this.paging?.itemsPerPage ?? 0))),
                  isNaN(this.paging?.itemsPerPage ?? 0) ? ((source: Observable<TData>) => source) : take(this.paging?.itemsPerPage ?? 0),
                  toArray()));

        this.ɵstate = (data && data.length) ? DataLoaderState.Loaded : DataLoaderState.NoData;
        this.stateChangeSubject.next();

        this.ɵresult =
        {
            data: data,
            totalCount: this.ɵoptions.data.length
        };

        this.resultChangeSubject.next();
    }
}