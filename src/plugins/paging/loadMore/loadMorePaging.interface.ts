import {PagingOptions, Paging} from "../paging.interface";

/**
 * Css classes for load more paging
 */
export interface CssClassesLoadMorePaging
{
    containerDiv?: string;
    loadMoreBtn?: string;
}

/**
 * Texts that are used within LoadMorePaging
 */
export interface LoadMorePagingTexts
{
    loadMoreBtn?: string;
}

/**
 * Load more paging options
 */
export interface LoadMorePagingOptions extends PagingOptions<CssClassesLoadMorePaging>
{
    /**
     * Texts that are used within LoadMorePaging
     */
    texts?: LoadMorePagingTexts;
}

/**
 * Public API for 'LoadMorePagingComponent'
 */
export interface LoadMorePaging extends Paging
{
}