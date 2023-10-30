import {Paging, PagingOptions} from '../../../interfaces';

/**
 * Css classes for basic paging
 */
export interface CssClassesBasicPaging
{
    pagingUl: string;
    itemsPerPageDiv: string;
    displayedItemsCountSpan: string;
    itemsPerPageUl: string;
}

/**
 * Basic paging options
 */
export interface BasicPagingOptions extends PagingOptions<CssClassesBasicPaging>
{
    /**
     * Page dispersion parameter for rendered pages
     */
    pagesDispersion: number;

    /**
     * Gets or sets array of available values for itemsPerPage, NaN represents infinity (all data)
     */
    itemsPerPageValues: number[];
}

/**
 * Public API for 'BasicPagingComponent'
 */
export interface BasicPaging<TOptions extends BasicPagingOptions = BasicPagingOptions> extends Paging<TOptions>
{
}

/**
 * Items per page single item
 */
export interface ItemsPerPageItem
{
    /**
     * Indication that item is active
     */
    isActive: boolean;

    /**
     * Value of item
     */
    value: number;
}

/**
 * Pages single item
 */
export interface PagesItem
{
    /**
     * Indication whether is page active
     */
    isActive: boolean;

    /**
     * Indication whether is page disabled
     */
    isDisabled: boolean;

    /**
     * Title displayed for page
     */
    title: string;

    /**
     * Page number of page
     */
    page: number
}