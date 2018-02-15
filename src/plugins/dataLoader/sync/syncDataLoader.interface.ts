import {DataLoaderOptions, DataLoader, DataResponse} from "../dataLoader.interface";

/**
 * Sync data loader options
 */
export interface SyncDataLoaderOptions<TData, TOrdering> extends DataLoaderOptions
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
export interface SyncDataLoader<TData> extends DataLoader<DataResponse<TData>>
{
}