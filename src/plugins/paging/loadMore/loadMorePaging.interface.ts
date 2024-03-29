import {Paging, PagingOptions} from '../../../interfaces';

/**
 * Css classes for load more paging
 */
export interface CssClassesLoadMorePaging
{
    containerElement: string;
    loadMoreBtn: string;
}

/**
 * Texts that are used within LoadMorePaging
 */
export interface LoadMorePagingTexts
{
    loadMoreBtn: string;
}

/**
 * Load more paging options
 */
export interface LoadMorePagingOptions extends PagingOptions<CssClassesLoadMorePaging>
{
    /**
     * Texts that are used within LoadMorePaging
     */
    texts: LoadMorePagingTexts;
}

/**
 * Public API for 'LoadMorePagingComponent'
 */
export interface LoadMorePaging<TOptions extends LoadMorePagingOptions = LoadMorePagingOptions> extends Paging<TOptions>
{
}