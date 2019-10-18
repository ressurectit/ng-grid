import {PagingOptions, Paging} from "@anglr/grid";

/**
 * Css classes for cdk virtual scroll paging
 */
export interface CssClassesCdkVirtualScrollPaging
{
}

/**
 * Cdk virtual scroll paging options
 */
export interface CdkVirtualScrollPagingOptions extends PagingOptions<CssClassesCdkVirtualScrollPaging>
{
}

/**
 * Public API for 'CdkVirtualScrollPagingComponent'
 */
export interface CdkVirtualScrollPaging extends Paging
{
}