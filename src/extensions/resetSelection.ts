import {GridAction} from "../components/grid";
import {RowSelector} from "../plugins/rowSelector";
import {ROW_SELECTOR} from "../plugins/rowSelector/types";

/**
 * Resets (deselects) all selection
 */
export function resetSelection(): GridAction
{
    return grid =>
    {
        let rowSelector = grid.getPlugin<RowSelector<any, any, any>>(ROW_SELECTOR);

        rowSelector.resetSelection();
    };
}