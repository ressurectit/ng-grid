import {GridFunction} from "../components/grid";
import {ROW_SELECTOR, RowSelector} from "../plugins/rowSelector";

/**
 * Gets currently selected data
 */
export function getSelectedData<TSelectedData>(): GridFunction<TSelectedData[]>
{
    return grid =>
    {
        let rowSelector = grid.getPlugin<RowSelector<TSelectedData, any, any>>(ROW_SELECTOR);

        return rowSelector.selectedData;
    };
}