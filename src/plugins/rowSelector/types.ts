import {InjectionToken} from "@angular/core";

import {RowSelectorOptions} from "./rowSelector.interface";

/**
 * Token for injecting options for row selector
 */
export const ROW_SELECTOR_OPTIONS: InjectionToken<RowSelectorOptions<any, any, any>> = new InjectionToken<RowSelectorOptions<any, any, any>>('ROW_SELECTOR_OPTIONS');

/**
 * Constant used for accessing row selector in grid
 */
export const ROW_SELECTOR = "ROW_SELECTOR";