import {GridInitializer, GridInitializerOptions} from '../../../interfaces';

/**
 * Query permanentStorage grid initializer options
 */
export interface QueryPermanentStorageGridInitializerOptions extends GridInitializerOptions
{
    /**
     * Name of storage used for storing items per page
     */
    storageIppName: string;
}

/**
 * Query permanentStorage grid initializer that uses query params and permanentStorage for getting and storing grid info
 */
export interface QueryPermanentStorageGridInitializer extends GridInitializer
{
}