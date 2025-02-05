import {Component, ChangeDetectionStrategy, Inject, Optional, WritableSignal, signal, Signal} from '@angular/core';
import {OrderByDirection} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {from, Observable} from 'rxjs';
import {skip, take, toArray} from 'rxjs/operators';

import {SyncDataLoaderOptions, SyncDataLoader} from './syncDataLoader.interface';
import {DataLoaderAbstractComponent} from '../dataLoaderAbstract.component';
import {DataResponse, SimpleOrdering} from '../../../interfaces';
import {DATA_LOADER_OPTIONS} from '../../../misc/tokens';
import {DataLoaderState} from '../../../misc/enums';

/**
 * Default options for sync data loader
 */
const defaultOptions: SyncDataLoaderOptions<Record<string, number>, SimpleOrdering> =
{
    autoLoadData: true,
    accumulateData: false,
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncDataLoaderComponent<TData = unknown, TOrdering = unknown> extends DataLoaderAbstractComponent<SyncDataLoaderOptions<TData, TOrdering>, TOrdering, DataResponse<TData>> implements SyncDataLoader<TData>
{
    //######################### protected fields #########################

    /**
     * Current result of data loader
     */
    protected ɵresult: WritableSignal<DataResponse<TData>> = signal(
    {
        data: [],
        totalCount: 0
    });

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get result(): Signal<DataResponse<TData>>
    {
        return this.ɵresult.asReadonly();
    }

    //######################### constructor #########################
    constructor(@Inject(DATA_LOADER_OPTIONS) @Optional() options?: SyncDataLoaderOptions<TData, TOrdering>)
    {
        super(defaultOptions as unknown as SyncDataLoaderOptions<TData, TOrdering>, options);
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

        this.ɵstate.set((data && data.length) ? DataLoaderState.DataLoading : DataLoaderState.NoDataLoading);

        if(this.ɵoptions.orderData)
        {
            data = this.ɵoptions.orderData(data, this.ordering?.ordering() ?? undefined);
        }

        const page = this.paging?.page() ?? 1;
        const itemsPerPage = this.paging?.itemsPerPage() ?? 0;

        data = await lastValueFrom(from(data)
            .pipe(skip((page - 1) * (isNaN(itemsPerPage) ? 0 : itemsPerPage)),
                  isNaN(itemsPerPage) ? ((source: Observable<TData>) => source) : take(itemsPerPage),
                  toArray()));

        this.ɵstate.set((data && data.length) ? DataLoaderState.Loaded : DataLoaderState.NoData);

        this.ɵresult.set(
        {
            data: this.ɵoptions.accumulateData ? [...this.ɵresult().data, ...data] : data,
            totalCount: this.ɵoptions.data.length
        });
    }
}
