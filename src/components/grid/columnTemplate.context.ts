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
     */
    constructor(public $implicit: any, 
                public column: ColumnComponent, 
                public index: number, 
                public rowIndexes: number[])
    {
    }
}