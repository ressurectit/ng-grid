import {InjectionToken, EventEmitter} from "@angular/core";

import {PluginOptions, GridPlugin} from "../../misc";

/**
 * Constant used for accessing data loader in grid
 */
export const DATA_LOADER = "DATA_LOADER";

/**
 * Token for injecting options for data loader
 */
export const DATA_LOADER_OPTIONS: InjectionToken<DataLoaderOptions> = new InjectionToken<DataLoaderOptions>('DATA_LOADER_OPTIONS');

/**
 * Options for data loader
 */
export interface DataLoaderOptions extends PluginOptions
{
    /**
     * Indication that grid should try to load data at the end of init phase
     */
    autoLoadData?: boolean;

    /**
     * Number of miliseconds that are used for debounce call of dataCallback
     */
    debounceDataCallback?: number;
}

/**
 * Data loader plugin interface
 */
export interface DataLoader<TResult> extends GridPlugin
{
    /**
     * Loads data from 'source'
     * @param force Indication that data should be reloaded even if nothing changed
     */
    loadData(force?: boolean);

    /**
     * Current result of data loader
     */
    readonly result: TResult;

    /**
     * Indication that data has changed
     */
    resultChange: EventEmitter<void>;
}

/**
 * Standard data response
 */
export interface DataResponse<TData>
{
    /**
     * Currently returned data that are being displayed
     */
    data?: TData[];

    /**
     * Count of all elements for current filter (without paging)
     */
    totalCount?: number;
}