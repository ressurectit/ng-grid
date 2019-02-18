import {InjectionToken, EventEmitter} from '@angular/core';

import {VisualPluginOptions, GridPlugin} from '../../misc';

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