import {InjectionToken} from "@angular/core";

import {PagingInitializerOptions} from "./pagingInitializer.interface";

/**
 * Token for injecting options for paging initializer
 */
export const PAGING_INITIALIZER_OPTIONS: InjectionToken<PagingInitializerOptions> = new InjectionToken<PagingInitializerOptions>('PAGING_INITIALIZER_OPTIONS');

/**
 * Constant used for accessing paging initializer in grid
 */
export const PAGING_INITIALIZER = "PAGING_INITIALIZER";