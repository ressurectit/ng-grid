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
    /**
     * Value between 0 and 1 which indicates scroll percentage, when to run loading next page if available
     */
    loadPageTreshold?: number;
}

/**
 * Public API for 'CdkVirtualScrollPagingComponent'
 */
export interface CdkVirtualScrollPaging extends Paging
{
}