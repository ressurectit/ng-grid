import {DataLoaderOptions, DataLoader, DataResponse} from "../dataLoader.interface";

/**
 * Async data loader options
 */
export interface AsyncDataLoaderOptions<TData, TOrdering> extends DataLoaderOptions
{
    /**
     * Callback used for obtaining data
     * @param page Index of requested page
     * @param itemsPerPage Number of items per page
     * @param ordering Order by column name
     */
    dataCallback?: (page: number, itemsPerPage: number, ordering: TOrdering) => Promise<DataResponse<TData>>;
}

/**
 * Public API for 'AsyncDataLoaderComponent'
 */
export interface AsyncDataLoader<TData> extends DataLoader<DataResponse<TData>>
{
}