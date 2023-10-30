import {PromiseOr} from '@jscrpt/common';

import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';
import {PluginOptions} from '../../pluginOptions/pluginOptions.interface';

/**
 * Base grid initializer options for every grid initializer
 */
export interface GridInitializerOptions extends PluginOptions
{
    /**
     * Prefix that is applied to stored data
     */
    prefix: string;
}

/**
 * Initializer that is used for initialization (restoring) of grid data and grid plugins data
 */
export interface GridInitializer<TOrdering = unknown, TOptions extends GridInitializerOptions = GridInitializerOptions> extends GridPlugin<TOptions>
{
    /**
     * Gets stored page
     */
    getPage(): PromiseOr<number|undefined|null>;

    /**
     * Sets current page when changed
     * @param page - Page to be stored
     */
    setPage(page: number|undefined|null): PromiseOr<void>;

    /**
     * Gets stored items per page
     */
    getItemsPerPage(): PromiseOr<number|undefined|null>;

    /**
     * Sets current items per page when changed
     * @param itemsPerPage - Items per page to be stored
     */
    setItemsPerPage(itemsPerPage: number|undefined|null): PromiseOr<void>;

    /**
     * Gets stored ordering
     */
    getOrdering(): PromiseOr<TOrdering|undefined|null>;

    /**
     * Sets current ordering when changed
     * @param ordering - Ordering as string to be stored
     */
    setOrdering(ordering: TOrdering|undefined|null): PromiseOr<void>;
}