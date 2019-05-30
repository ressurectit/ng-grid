import {InjectionToken} from "@angular/core";

import {TextsLocatorOptions} from "./textsLocator.interface";

/**
 * Token for injecting options for texts locator
 */
export const TEXTS_LOCATOR_OPTIONS: InjectionToken<TextsLocatorOptions> = new InjectionToken<TextsLocatorOptions>('TEXTS_LOCATOR_OPTIONS');

/**
 * Constant used for accessing texts locator in grid
 */
export const TEXTS_LOCATOR = "TEXTS_LOCATOR";