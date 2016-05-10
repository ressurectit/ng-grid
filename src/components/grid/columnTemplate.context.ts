import {ColumnComponent} from './column.component';

/**
 * Context for column template
 */
export class ColumnTemplateContext
{
    //######################### constructor #########################
    
    /**
     * Creates instance of ColumnTemplateContext
     * @param  {any} $implicit Data of current row
     * @param  {ColumnComponent} column Object of column itself
     */
    constructor(public $implicit: any, public column: ColumnComponent)
    {
    }
}