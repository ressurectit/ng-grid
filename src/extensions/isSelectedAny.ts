import {GridFunction} from "../components/grid";
import {ROW_SELECTOR, RowSelector} from "../plugins/rowSelector";

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