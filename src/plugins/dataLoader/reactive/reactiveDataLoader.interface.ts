import {Observable} from 'rxjs';

import {DataLoaderOptions, DataResponse} from '../../../interfaces';

/**
 * Configuration options for reactive data loader
 *
 * - `debounceDataCallback` and `autoLoadData` are not used within `ReactiveDataLoader`
 */
export interface ReactiveDataLoaderConfigOptions extends DataLoaderOptions
{
    /**
     * Indication whether paging and ordering are applied locally on obtained data, or they are applied on source side.
     */
    localPagingAndOrdering: boolean;
}

/**
 * Options for reactive data loader that are used for ordering
 */
export interface ReactiveDataLoaderOrderingOptions<TData, TOrdering>
{
    /**
     * Method used for ordering data, used only when localPagingAndOrdering is true.
     */
    orderData: (data: NoInfer<TData>[], ordering: TOrdering|undefined|null) => TData[];
}

/**
 * Options for reactive data loader that are used for obtaining data
 */
export interface ReactiveDataLoaderDataOptions<TData, TParams>
{
    /**
     * Function used for obtaining parameters for data loading. Runs in reactive context, so you can use signals in it.
     */
    getParams: () => TParams;

    /**
     * Function that is used for obtaining data for grid. Runs in reactive context, so you can use signals in it. Use it together with ordering and paging plugins to get the current ordering and paging state.
     */
    data: (params: NoInfer<TParams>) => Observable<DataResponse<TData>>|Promise<DataResponse<TData>>|DataResponse<TData>;
}

/**
 * Reactive data loader options
 */
export interface ReactiveDataLoaderOptions<TData = unknown, TParams = unknown, TOrdering = unknown> extends ReactiveDataLoaderConfigOptions, ReactiveDataLoaderOrderingOptions<TData, TOrdering>, ReactiveDataLoaderDataOptions<TData, TParams>
{
}
