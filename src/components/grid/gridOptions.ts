import {OrderByDirection} from '@ng2/common';

/**
 * Options for grid configuration 
 */
export interface GridOptions
{
    /**
     * Indication whether is paging enabled
     */
    pagingEnabled?: boolean;
    
    /**
     * Indication whether is column selection allowed
     */
    columnsSelection?: boolean;
    
    /**
     * Css class that is applied to root div of grid
     */
    cssClass?: string;
    
    /**
     * Css class that is applied to each column group row
     */
    columnGroupCssClass?: string;
    
    /**
     * Name of css class that is applied to column selection div
     */
    columnSelectionCssClass?: string;
    
    /**
     * Initial page index that will be rendered
     */
    initialPage?: number;
    
    /**
     * Initial number of items per page that will be rendered
     */
    initialItemsPerPage?: number;
    
    /**
     * Available values for items per page, if not set you wont be able to change number items per page
     */
    itemsPerPageValues?: number[];
    
    /**
     * Number of miliseconds that are used for debounce call of dataCallback, or false
     */
    debounceDataCallback?: number;

    /**
     * Indication whether row selection is enabled
     */
    rowSelectionEnabled?: boolean;
    
    /**
     * Callback that is used for changing displayed data
     */
    dataCallback?: (page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection) => void;
}