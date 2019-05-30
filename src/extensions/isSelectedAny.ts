import {GridFunction} from "../components/grid";
import {RowSelector} from "../plugins/rowSelector";
import {ROW_SELECTOR} from "../plugins/rowSelector/types";

/**
 * Gets indication whether is selected at least one item from whole selection
 */
export function isSelectedAny(): GridFunction<boolean>
{
    return grid =>
    {
        let rowSelector = grid.getPlugin<RowSelector<any, any, any>>(ROW_SELECTOR);

        return rowSelector.selectedIds.length > 0;
    };
}