import {HeaderTableGroup} from "./groupedTable.interface";

/**
 * Context for header table group template
 */
export class HeaderTableGroupContext
{
    //######################### constructor #########################
    
    /**
     * Creates instance of HeaderTableGroupContext
     * @param $implicit Represents metadata for this group
     */
    constructor(public $implicit: HeaderTableGroup)
    {
    }
}