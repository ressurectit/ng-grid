import {Paging, PagingOptions} from '../../../interfaces';

/**
 * No paging options for paging
 */
export interface NoPagingOptions<TCssClasses = unknown> extends PagingOptions<TCssClasses>
{
}

/**
 * Public API for no paging
 */
export interface NoPaging extends Paging
{
}