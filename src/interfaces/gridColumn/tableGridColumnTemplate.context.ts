import {TableGridColumn} from './tableGridColumn.interface';

/**
 * Context for table grid column template
 */
export interface TableGridColumnTemplateContext<TData = unknown>
{
    //######################### readonly properties #########################

    /**
     * Data of current row
     */
    readonly $implicit: TData;

    /**
     * Object of column metadata itself
     */
    readonly column: TableGridColumn<TData>;

    /**
     * Index of rendered row in current page
     */
    readonly index: number;

    /**
     * Starting index of currently displayed items
     */
    readonly startingIndex: number;

    /**
     * Row index of displayed item
     */
    readonly rowIndex: number;
}