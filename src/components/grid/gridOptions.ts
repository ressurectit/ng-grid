import {Type} from '@angular/core';
import {OrderByDirection} from '@anglr/common';
import {PagingAbstractLegacyComponent} from "../paging/pagingAbstract.component";

/**
 * Options for grid configuration 
 */
export interface GridLegacyOptions
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
     * Title that is shown while hovering over column selection icon
     */
    columnSelectionTitle?: string;
    
    /**
     * Initial page index that will be rendered
     */
    initialPage?: number;
    
    /**
     * Initial number of items per page that will be rendered
     */
    initialItemsPerPage?: number;
    
    /**
     * Options passed to paging component, specific to selected paging
     */
    pagingOptions?: any;

    /**
     * Type representing paging component implementation that will be used for paging
     */
    pagingType?: Type<PagingAbstractLegacyComponent>;
    
    /**
     * Number of miliseconds that are used for debounce call of dataCallback, or false
     */
    debounceDataCallback?: number;

    /**
     * Indication whether row selection is enabled
     */
    rowSelectionEnabled?: boolean;

    /**
     * Minimal number of visible columns for grid
     */
    minVisibleColumns?: number;

    /**
     * Maximal number of visible columns for grid
     */
    maxVisibleColumns?: number;

    /**
     * Indication that grid should try to load data at the end of init phase
     */
    autoLoadData?: boolean;
    
    /**
     * Callback that is used for changing displayed data
     */
    dataCallback?: (page: number, itemsPerPage: number, orderBy: string, orderByDirection: OrderByDirection) => void;
}