import {InjectionToken} from "@angular/core";

import {DataLoaderOptions} from "./dataLoader.interface";

/**
 * Constant used for accessing data loader in grid
 */
export const DATA_LOADER = "DATA_LOADER";

/**
 * Token for injecting options for data loader
 */
export const DATA_LOADER_OPTIONS: InjectionToken<DataLoaderOptions> = new InjectionToken<DataLoaderOptions>('DATA_LOADER_OPTIONS');