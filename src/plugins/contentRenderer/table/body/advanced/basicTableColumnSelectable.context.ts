import {BasicTableColumn} from "../../../../../components/metadata";
import {BasicTableColumnContext} from "../../../../../components/metadata/types";
import {RowSelector} from "../../../../rowSelector";

/**
 * Context for basic table column selectable template
 */
export class BasicTableColumnSelectableContext<TData> extends BasicTableColumnContext<TData>
{
    //######################### public properties #########################

    /**
     * Gets indication whether column is selected
     */
    public get isSelected(): boolean
    {
        return this.rowSelector.isSelected(this.$implicit);
    }

    //######################### constructor #########################

    /**
     * Creates instance of BasicTableColumnContext
     * @param $implicit - Data of current row
     * @param column - Object of column metadata itself
     * @param index - Index of rendered row in current page
     * @param startingIndex - Starting index of currently displayed items
     */
    constructor(public $implicit: TData,
                public column: BasicTableColumn<TData>,
                public index: number,
                public startingIndex: number,
                public rowSelector: RowSelector<any, any, TData>)
    {
        super($implicit, column, index, startingIndex);
    }
}