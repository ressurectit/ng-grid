import {Paging, PagingOptions} from '../../../interfaces';

/**
 * Css classes for previous next paging
 */
export interface CssClassesPreviousNextPaging
{
    previousNextContainerUl: string;
    firstItemSpan: string;
    previousItemSpan: string;
    nextItemSpan: string;
    displayedItemsCountDiv: string;
    itemsPerPageUl: string;
}

/**
 * Previous next paging options
 */
export interface PreviousNextPagingOptions extends PagingOptions<CssClassesPreviousNextPaging>
{
    /**
     * Gets or sets array of available values for itemsPerPage, NaN represents infinity (all data)
     */
    itemsPerPageValues: number[];
}

/**
 * Public API for 'PreviousNextPagingComponent'
 */
export interface PreviousNextPaging<TOptions extends PreviousNextPagingOptions = PreviousNextPagingOptions> extends Paging<TOptions>
{
}