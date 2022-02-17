import {DataLoaderOptions, DataLoader, DataResponse} from '../dataLoader.interface';

/**
 * Sync data loader options
 */
export interface SyncDataLoaderOptions<TData = any, TOrdering = any> extends DataLoaderOptions
{
    /**
     * Static data which will be rendered by grid
     */
    data?: TData[];

    /**
     * Method used for ordering data
     */
    orderData?: (data: TData[], ordering?: TOrdering) => TData[];
}

/**
 * Public API for 'SyncDataLoaderComponent'
 */
export interface SyncDataLoader<TData = any> extends DataLoader<DataResponse<TData>>
{
}