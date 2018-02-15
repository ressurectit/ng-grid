import {InjectionToken, EventEmitter} from "@angular/core";

import {PluginOptions, GridPlugin} from "../../misc";

/**
 * Token for injecting options for texts locator
 */
export const TEXTS_LOCATOR_OPTIONS: InjectionToken<TextsLocatorOptions> = new InjectionToken<TextsLocatorOptions>('TEXTS_LOCATOR_OPTIONS');

/**
 * Constant used for accessing texts locator in grid
 */
export const TEXTS_LOCATOR = "TEXTS_LOCATOR";

/**
 * Texts locator options
 */
export interface TextsLocatorOptions extends PluginOptions
{
}

/**
 * Public API for texts locator
 */
export interface TextsLocator extends GridPlugin
{
    /**
     * Indication that texts should be obtained again, because they have changed
     */
    textsChange: EventEmitter<void>;

    /**
     * Gets text for specified key
     */
    getText(key: string): string;
}