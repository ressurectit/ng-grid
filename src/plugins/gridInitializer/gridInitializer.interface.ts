import {GridPlugin, PluginOptions} from '../../misc';

/**
 * Base grid initializer options for every grid initializer
 */
export interface GridInitializerOptions extends PluginOptions
{
    /**
     * Prefix that is applied to stored data
     */
    prefix?: string;
}

/**
 * Initializer that is used for initialization (restoring) of grid data and grid plugins data
 */
export interface GridInitializer extends GridPlugin
{
    /**
     * Gets stored page
     */
    getPage(): number;

    /**
     * Sets current page when changed
     * @param page - Page to be stored
     */
    setPage(page: number);

    /**
     * Gets stored items per page
     */
    getItemsPerPage(): number;

    /**
     * Sets current items per page when changed
     * @param itemsPerPage - Items per page to be stored
     */
    setItemsPerPage(itemsPerPage: number);

    /**
     * Gets stored ordering
     */
    getOrdering(): string;

    /**
     * Sets current ordering when changed
     * @param ordering - Ordering as string to be stored
     */
    setOrdering(ordering: string): void;
}