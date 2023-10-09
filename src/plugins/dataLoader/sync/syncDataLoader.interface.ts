import {DataLoader, DataLoaderOptions, DataResponse} from '../../../interfaces';

/**
 * Sync data loader options
 */
export interface SyncDataLoaderOptions<TData = unknown, TOrdering = unknown> extends DataLoaderOptions
{
    /**
     * Static data which will be rendered by grid
     */
    data: TData[];

    /**
     * Method used for ordering data
     */
    orderData: (data: TData[], ordering?: TOrdering) => TData[];
}

/**
 * Public API for 'SyncDataLoaderComponent'
 */
export interface SyncDataLoader<TData = unknown> extends DataLoader<DataResponse<TData>>
{
}