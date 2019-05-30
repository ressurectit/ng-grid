import {InjectionToken} from "@angular/core";

import {PagingOptions} from "./paging.interface";

/**
 * Token for injecting options for paging
 */
export const PAGING_OPTIONS: InjectionToken<PagingOptions<any>> = new InjectionToken<PagingOptions<any>>('PAGING_OPTIONS');

/**
 * Constant used for accessing paging in grid
 */
export const PAGING = "PAGING";