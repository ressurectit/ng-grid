import {PagingInitializerOptions, PagingInitializer} from "../pagingInitializer.interface";

/**
 * Query paging initializer options
 */
export interface QueryPagingInitializerOptions extends PagingInitializerOptions
{
}

/**
 * Query paging initializer that uses query params for getting and storing paging info
 */
export interface QueryPagingInitializer extends PagingInitializer
{
}