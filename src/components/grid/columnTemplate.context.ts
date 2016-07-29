import {ColumnComponent} from './column.component';

/**
 * Context for column template
 */
export class ColumnTemplateContext
{
    //######################### public properties #########################

    /**
     * Gets row index of displayed item
     * @returns number
     */
    public get rowIndex(): number
    {
        return this.rowIndexes[this.index];
    }

    //######################### constructor #########################
    
    /**
     * Creates instance of ColumnTemplateContext
     * @param  {any} $implicit Data of current row
     * @param  {ColumnComponent} column Object of column itself
     * @param  {number} index Index of rendered row in current page
     * @param  {number[]} rowIndexes Indexes of rows for whole data mapped for current page
     */
    constructor(public $implicit: any, 
                public column: ColumnComponent, 
                public index: number, 
                public rowIndexes: number[])
    {
    }
}