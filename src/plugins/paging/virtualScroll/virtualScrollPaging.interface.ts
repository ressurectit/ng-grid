import {PagingOptions, Paging} from "../paging.interface";

/**
 * Css classes for virtual scroll paging
 */
export interface CssClassesVirtualScrollPaging
{
}

/**
 * Virtual scroll paging options
 */
export interface VirtualScrollPagingOptions extends PagingOptions<CssClassesVirtualScrollPaging>
{
    /**
     * Offset between 0 and 1 which indicates when to start loading next page, 0.8 means 80% of scrolling distance
     */
    loadOffsetTreshold?: number;

    /**
     * Css max height that is applied to table
     */
    maxHeight?: string;
}

/**
 * Public API for 'VirtualScrollPagingComponent'
 */
export interface VirtualScrollPaging extends Paging
{
}