import {BasicTableColumn} from "./basicTable.interface";

/**
 * Context for basic table column template
 */
export class BasicTableColumnContext<TData>
{
    //######################### public properties #########################

    /**
     * Gets row index of displayed item
     * @returns number
     */
    public get rowIndex(): number
    {
        return this.startingIndex + this.index;
    }

    //######################### constructor #########################
    
    /**
     * Creates instance of BasicTableColumnContext
     * @param $implicit Data of current row
     * @param column Object of column metadata itself
     * @param index Index of rendered row in current page
     * @param startingIndex Starting index of currently displayed items
     */
    constructor(public $implicit: TData, 
                public column: BasicTableColumn<TData>, 
                public index: number, 
                public startingIndex: number)
    {
    }
}