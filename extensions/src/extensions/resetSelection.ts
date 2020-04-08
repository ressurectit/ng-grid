import {GridAction, RowSelector, ROW_SELECTOR} from "@anglr/grid";

/**
 * Resets (deselects) all selection
 */
export function resetSelection(): GridAction
{
    return grid =>
    {
        let rowSelector = grid.getPlugin<RowSelector>(ROW_SELECTOR);

        rowSelector.resetSelection();
    };
}