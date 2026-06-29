import {Component, Signal, ElementRef, inject, Inject, Optional, untracked, WritableSignal, signal, computed, ResourceRef} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {DATA_LOADER_OPTIONS, DataLoader, DataLoaderState, DataResponse, GRID_PLUGIN_INSTANCES, GridPluginInstances, Ordering} from '@anglr/grid';
import {PromiseOr, RecursivePartial} from '@jscrpt/common';
import {deepCopyWithArrayOverride} from '@jscrpt/common/lodash';
import {map, Observable, of} from 'rxjs';

import {ReactiveDataLoaderOptions} from './reactiveDataLoader.interface';

/**
 * Default options for reactive data loader
 */
const defaultOptions: ReactiveDataLoaderOptions =
{
    autoLoadData: true,
    accumulateData: false,
    debounceDataCallback: 17,
    localPagingAndOrdering: false,
    getParams: () => ({}),
    orderData: (data: unknown[]) => data,
    data: () => of({data: [], totalCount: 0}),
};

/**
 * Data loader that allows data loading in reactive way, using signals
 */
@Component(
{
    selector: 'ng-reactive-data-loader',
    template: '',
})
export class ReactiveDataLoader<TData = unknown, TOrdering = unknown> implements DataLoader<DataResponse<TData>, ReactiveDataLoaderOptions<TData, TOrdering>>
{
    //######################### protected fields #########################

    /**
     * Instance of options
     */
    protected readonly optionsValue: WritableSignal<ReactiveDataLoaderOptions<TData, TOrdering>>;

    /**
     * Resource that drives reactive data loading
     */
    protected readonly dataResource: ResourceRef<DataResponse<TData>>;

    /**
     * Last obtained value of data response
     */
    protected lastValue: DataResponse<TData> = {data: [], totalCount: 0};

    //######################### public properties - implementation of DataLoader #########################

    /**
     * @inheritdoc
     */
    public readonly result: Signal<DataResponse<TData>>;

    /**
     * @inheritdoc
     */
    public readonly state: Signal<DataLoaderState>;

    //######################### public properties - implementation of GridPlugin #########################

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|null|undefined = inject(GRID_PLUGIN_INSTANCES, {optional: true});

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * @inheritdoc
     */
    public get options(): ReactiveDataLoaderOptions<TData, TOrdering>
    {
        return this.optionsValue();
    }
    public set options(value: ReactiveDataLoaderOptions<TData, TOrdering>)
    {
        this.optionsValue.set(deepCopyWithArrayOverride({}, untracked(() => this.optionsValue()), value));
    }

    //######################### constructor #########################
    constructor(@Inject(DATA_LOADER_OPTIONS) @Optional() options?: RecursivePartial<ReactiveDataLoaderOptions<TData, TOrdering>>|null,)
    {
        this.optionsValue = signal(deepCopyWithArrayOverride(defaultOptions as ReactiveDataLoaderOptions<TData, TOrdering>,
                                                             options));

        this.dataResource = rxResource(
        {
            defaultValue: {data: [], totalCount: 0},
            params: () =>
            {
                if(!this.gridPlugins)
                {
                    throw new Error('ReactiveDataLoaderComponent: plugin requires grid plugins to work');
                }

                const options = this.optionsValue();
                let page: number|undefined|null = null;
                let itemsPerPage: number|undefined|null = null;
                let order: TOrdering|undefined|null = null;

                if(options.localPagingAndOrdering)
                {
                    const paging = this.gridPlugins.paging;
                    const ordering = this.gridPlugins.ordering as Ordering<TOrdering>|undefined;

                    page = paging?.page();
                    itemsPerPage = paging?.itemsPerPage();
                    order = ordering?.ordering();
                }

                //invoking data callback in reactive params context so signals read by it are tracked
                const params = options.getParams();

                return {options, page, itemsPerPage, order, params};
            },
            stream: ({params}) =>
            {
                const data = params
                    .options
                    .data(params.params);

                return ((data instanceof Promise ? of(data).pipe(map(p => p)) : data) as Observable<DataResponse<TData>>)
                    .pipe(map(result =>
                    {
                        if(params.options.localPagingAndOrdering)
                        {
                            result.data = params.options.orderData(result.data, params.order);

                            if(params.page != null && params.itemsPerPage != null)
                            {
                                const startIndex = (params.page - 1) * params.itemsPerPage;
                                result.data = result.data.slice(startIndex, startIndex + params.itemsPerPage);
                            }
                        }

                        return result;
                    }),
                );
            },
        });

        this.result = computed(() =>
        {
            const snapshot = this.dataResource.snapshot();

            if(snapshot.status === 'resolved')
            {
                this.lastValue = this.options.accumulateData ? {data: [...this.lastValue.data, ...snapshot.value.data], totalCount: snapshot.value.totalCount} : snapshot.value;
            }

            return snapshot.status === 'error' ?
                {data: [], totalCount: 0} as DataResponse<TData> :
                this.lastValue;
        });

        this.state = computed(() =>
        {
            const status = this.dataResource.status();

            if(status === 'idle')
            {
                return DataLoaderState.NotLoadedYet;
            }

            if(status === 'loading')
            {
                return DataLoaderState.NoDataLoading;
            }

            if(status === 'error')
            {
                return DataLoaderState.NoData;
            }

            //resolved, local, reloading - value is safe to read
            const hasData = !!this.dataResource.value().data.length;

            if(status === 'reloading')
            {
                return hasData ? DataLoaderState.DataLoading : DataLoaderState.NoDataLoading;
            }

            return hasData ? DataLoaderState.Loaded : DataLoaderState.NoData;
        });
    }

    //######################### public methods - implementation of DataLoader #########################

    /**
     * @inheritdoc
     */
    public loadData(): PromiseOr<void>
    {
        this.dataResource.reload();
    }

    //######################### public methods - implementation of GridPlugin #########################

    /**
     * @inheritdoc
     */
    public initialize(): PromiseOr<void>
    {
    }

    /**
     * @inheritdoc
     */
    public initOptions(): PromiseOr<void>
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}
