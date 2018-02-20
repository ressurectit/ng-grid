import {GridAction} from "../components/grid";
import {ROW_SELECTOR, RowSelector} from "../plugins/rowSelector";

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