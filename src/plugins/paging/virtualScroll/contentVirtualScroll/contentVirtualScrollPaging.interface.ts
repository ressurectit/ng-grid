import {VirtualScrollPagingOptions, VirtualScrollPaging} from '../virtualScrollPaging.interface';

/**
 * Content virtual scroll paging options
 */
export interface ContentVirtualScrollPagingOptions extends VirtualScrollPagingOptions
{
    /**
     * Css max height that is applied to table
     */
    maxHeight?: string;
}

/**
 * Public API for 'ContentVirtualScrollPaging'
 */
export interface ContentVirtualScrollPaging extends VirtualScrollPaging
{
}