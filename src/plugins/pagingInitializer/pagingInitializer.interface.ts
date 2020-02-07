import {GridPlugin, PluginOptions} from '../../misc';

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
     * @param page - Page to be set
     */
    setPage(page: number);

    /**
     * Gets initial items per page
     */
    getItemsPerPage(): number;

    /**
     * Sets current items per page when changed
     * @param itemsPerPage - Items per page to be set
     */
    setItemsPerPage(itemsPerPage: number);
}