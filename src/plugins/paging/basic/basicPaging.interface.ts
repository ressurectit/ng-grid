import {Paging, PagingOptions} from '../../../interfaces';

/**
 * Css classes for basic paging
 */
export interface CssClassesBasicPaging
{
    /**
     * Class for element holding whole paging component
     */
    pagingContainer: string;

    /**
     * Class for element storing pages elements
     */
    pagingElement: string;

    /**
     * Class for element used as separator of pages and items per pages
     */
    pagingSeparatorElement: string;

    /**
     * Class for element holding items per pages and items count
     */
    itemsPerPageContainer: string;

    /**
     * Class for element displaying items count
     */
    itemsCountElement: string;

    /**
     * Class for element storing items per page elements
     */
    itemsPerPageElement: string;
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