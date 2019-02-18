import {PagingInitializerOptions, PagingInitializer} from "../pagingInitializer.interface";

/**
 * No paging initializer options
 */
export interface NoPagingInitializerOptions extends PagingInitializerOptions
{
}

/**
 * No paging initializer that does nothing
 */
export interface NoPagingInitializer extends PagingInitializer
{
}