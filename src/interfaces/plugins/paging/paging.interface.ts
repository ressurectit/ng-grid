import {Signal} from '@angular/core';

import {VisualPluginOptions} from '../../visualPluginOptions/visualPluginOptions.interface';
import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';

/**
 * Base paging options for every paging
 */
export interface PagingOptions<TCssClasses = unknown> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Initial page index that will be rendered, 1 based
     */
    initialPage: number;

    /**
     * Initial number of items per page that will be rendered
     */
    initialItemsPerPage: number;
}

/**
 * Public API for paging
 */
export interface Paging<TOptions extends PagingOptions = PagingOptions> extends GridPlugin<TOptions>
{
    //######################### properties #########################
 
    /**
     * Zero based index of first displayed item on page
     */
    readonly firstItemIndex: number;

    /**
     * Gets index of currently selected page, 1 based index
     */
    readonly page: Signal<number|undefined|null>;

    /**
     * Gets number of items currently used for paging
     */
    readonly itemsPerPage: Signal<number|undefined|null>;

    //######################### methods #########################

    /**
     * Sets page for paging to specific number
     * @param page - Page to be set and displayed
     */
    setPage(page: number): void;

    /**
     * Sets items per page for paging to specific number
     * @param itemsPerPage - Items per page to be set and displayed
     */
    setItemsPerPage(itemsPerPage: number): void;
}