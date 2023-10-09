import {Observable} from 'rxjs';

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
    pageChange: Observable<number>;

    /**
     * Occurs when number of items per page currently selected has been changed
     */
    itemsPerPageChange: Observable<number>;
}