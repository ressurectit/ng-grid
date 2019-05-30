import {EventEmitter} from "@angular/core";

import {PluginOptions, GridPlugin} from "../../misc";

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