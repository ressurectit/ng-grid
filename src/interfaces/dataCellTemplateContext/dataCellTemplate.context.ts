import {CellTemplateContext} from '../cellTemplateContext/cellTemplate.context';

/**
 * Context for data cell template
 */
export interface DataCellTemplateContext<TColumnMetadata = unknown, TData = unknown> extends CellTemplateContext<TColumnMetadata>
{
    //######################### readonly properties #########################

    /**
     * Data of current row
     */
    readonly $implicit: TData;

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

    /**
     * Indication whether is row item selected
     */
    readonly isSelected: boolean;
}