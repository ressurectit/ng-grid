import {OrderByDirection} from 'ng2-common/types';

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
     * Css class that is applied to to root div of grid
     */
    cssClass?: string;
    
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
     * Callback that is used for changing displayed data
     */
    dataCallback?: (page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection) => void;
}