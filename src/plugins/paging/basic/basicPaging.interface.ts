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
export interface BasicPaging extends Paging
{
}