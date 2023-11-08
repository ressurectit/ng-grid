import {Paging, PagingOptions} from '../../../interfaces';

/**
 * Css classes for previous next paging
 */
export interface CssClassesPreviousNextPaging
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
     * Class for element navigating to first item
     */
    firstItemElement: string;
    
    /**
     * Class for element navigating to previous item
     */
    previousItemElement: string;
    
    /**
     * Class for element navigating to next item
     */
    nextItemElement: string;

    /**
     * Class for element used as separator of pages and items per pages
     */
    pagingSeparatorElement: string;

    /**
     * Class for element storing items per page elements
     */
    itemsPerPageElement: string;
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