import {InjectionToken} from "@angular/core";

import {DataLoaderOptions} from "./dataLoader.interface";

/**
 * Possible states of data loader
 */
export enum DataLoaderState
{
    /**
     * Loader has not loaded any data yet, this is initial state before first try for loading data
     */
    NotLoadedYet,

    /**
     * This state is present during loading of data when there are no data present
     */
    NoDataLoading,

    /**
     * This state is present any time loader is loading new data, while some data were already loaded
     */
    DataLoading,

    /**
     * This state is present when there are no data available after loading of data
     */
    NoData,

    /**
     * Loader loaded and have some data to be displayed
     */
    Loaded
}

/**
 * Constant used for accessing data loader in grid
 */
export const DATA_LOADER = "DATA_LOADER";

/**
 * Token for injecting options for data loader
 */
export const DATA_LOADER_OPTIONS: InjectionToken<DataLoaderOptions> = new InjectionToken<DataLoaderOptions>('DATA_LOADER_OPTIONS');