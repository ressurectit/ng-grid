import {PagingInitializerOptions, PagingInitializer} from "../pagingInitializer.interface";

/**
 * Query cookie paging initializer options
 */
export interface QueryCookiePagingInitializerOptions extends PagingInitializerOptions
{
    /**
     * Name of cookie used for storing items per page
     */
    cookieIppName?: string;
}

/**
 * Query cookie paging initializer that uses query params for getting and storing paging info
 */
export interface QueryCookiePagingInitializer extends PagingInitializer
{
}