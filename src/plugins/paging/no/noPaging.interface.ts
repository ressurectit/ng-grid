import {PagingOptions, Paging} from "../paging.interface";

/**
 * No paging options for paging
 */
export interface NoPagingOptions<TCssClasses = any> extends PagingOptions<TCssClasses>
{
}

/**
 * Public API for no paging
 */
export interface NoPaging extends Paging
{
}