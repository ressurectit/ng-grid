import {InjectionToken} from '@angular/core';

import {GridPlugin, PluginOptions} from '../../misc';

/**
 * Token for injecting options for paging initializer
 */
export const PAGING_INITIALIZER_OPTIONS: InjectionToken<PagingInitializerOptions> = new InjectionToken<PagingInitializerOptions>('PAGING_INITIALIZER_OPTIONS');

/**
 * Constant used for accessing paging initializer in grid
 */
export const PAGING_INITIALIZER = "PAGING_INITIALIZER";

/**
 * Base paging initializer options for every paging initializer
 */
export interface PagingInitializerOptions extends PluginOptions
{
    /**
     * Prefix that is applied to params storing page and items per page
     */
    prefix?: string;
}

/**
 * Initializer that is used for initialization of paging
 */
export interface PagingInitializer extends GridPlugin
{
    /**
     * Gets initial page
     */
    getPage(): number;

    /**
     * Sets current page when changed
     * @param {number} page Page to be set
     */
    setPage(page: number);

    /**
     * Gets initial items per page
     */
    getItemsPerPage(): number;

    /**
     * Sets current items per page when changed
     * @param {number} itemsPerPage Items per page to be set
     */
    setItemsPerPage(itemsPerPage: number);
}