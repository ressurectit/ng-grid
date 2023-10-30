import {Paging, PagingOptions} from '../../../interfaces';

/**
 * No paging options for paging
 */
export interface NoPagingOptions extends PagingOptions<unknown>
{
}

/**
 * Public API for no paging
 */
export interface NoPaging<TOptions extends NoPagingOptions = NoPagingOptions> extends Paging<TOptions>
{
}