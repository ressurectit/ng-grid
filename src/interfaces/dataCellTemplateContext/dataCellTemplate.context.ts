import {CellTemplateContext} from '../cellTemplateContext/cellTemplate.context';

/**
 * Context for data cell template
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataCellTemplateContext<TColumnMetadata = any, TData = any> extends CellTemplateContext<TColumnMetadata>
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
}