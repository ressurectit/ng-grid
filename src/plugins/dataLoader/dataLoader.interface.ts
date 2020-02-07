import {EventEmitter} from "@angular/core";

import {PluginOptions, GridPlugin} from "../../misc";
import {DataLoaderState} from "./types";

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
     * @param force - Indication that data should be reloaded even if nothing changed
     */
    loadData(force?: boolean);

    /**
     * Current result of data loader
     */
    readonly result: TResult;

    /**
     * Current state of data loader
     */
    readonly state: DataLoaderState;

    /**
     * Indication that data has changed
     */
    resultChange: EventEmitter<void>;

    /**
     * Indication that data loader state has changed
     */
    stateChange: EventEmitter<void>;
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