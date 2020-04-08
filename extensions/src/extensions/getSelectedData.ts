import {GridFunction, RowSelector, ROW_SELECTOR} from "@anglr/grid";

/**
 * Gets currently selected data
 */
export function getSelectedData<TSelectedData>(): GridFunction<TSelectedData[]>
{
    return grid =>
    {
        let rowSelector = grid.getPlugin<RowSelector<TSelectedData>>(ROW_SELECTOR);

        return rowSelector.selectedData;
    };
}