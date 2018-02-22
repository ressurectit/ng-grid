import {InjectionToken, EventEmitter} from '@angular/core';

import {VisualPluginOptions, GridPlugin, PluginOptions, PluginDescription} from '../../misc';

/**
 * Token for injecting options for paging
 */
export const PAGING_OPTIONS: InjectionToken<PagingOptions<any>> = new InjectionToken<PagingOptions<any>>('PAGING_OPTIONS');

/**
 * Constant used for accessing paging in grid
 */
export const PAGING = "PAGING";

/**
 * Base paging options for every paging
 */
export interface PagingOptions<TCssClasses> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Initial page index that will be rendered, 1 based
     */
    initialPage?: number;

    /**
     * Initial number of items per page that will be rendered
     */
    initialItemsPerPage?: number;

    /**
     * Paging plugin used for initialization of paging
     */
    pagingInitializer?: PluginDescription<PagingInitializer>;
}

/**
 * Public API for paging
 */
export interface Paging extends GridPlugin
{
    /**
     * Zero based index of first displayed item on page
     */
    readonly firstItemIndex: number;

    /**
     * Gets or sets index of currently selected page
     */
    page: number;

    /**
     * Gets or sets number of items currently used for paging
     */
    itemsPerPage: number;

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    totalCount: number;

    /**
     * Occurs when index of currently selected page has been changed
     */
    pageChange: EventEmitter<number>;

    /**
     * Occurs when number of items per page currently selected has been changed
     */
    itemsPerPageChange: EventEmitter<number>;
}

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