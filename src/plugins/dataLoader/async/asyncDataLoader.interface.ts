import {DataLoader, DataLoaderOptions, DataResponse} from '../../../interfaces';

/**
 * Async data loader options
 */
export interface AsyncDataLoaderOptions<TData = unknown, TOrdering = unknown> extends DataLoaderOptions
{
    /**
     * Callback used for obtaining data
     * @param page - Index of requested page
     * @param itemsPerPage - Number of items per page
     * @param ordering - Order by column name
     */
    dataCallback: (page: number, itemsPerPage: number, ordering: TOrdering|undefined|null) => Promise<DataResponse<TData>>;
}

/**
 * Public API for 'AsyncDataLoaderComponent'
 */
export interface AsyncDataLoader<TData = unknown> extends DataLoader<DataResponse<TData>>
{
}