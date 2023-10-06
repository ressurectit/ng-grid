import {TableGridColumn} from '../../interfaces';

/**
 * Context for table grid cell template
 */
export interface TableGridCellTemplateContext<TData = unknown>
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