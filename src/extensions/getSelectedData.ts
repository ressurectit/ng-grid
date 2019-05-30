import {GridFunction} from "../components/grid";
import {RowSelector} from "../plugins/rowSelector";
import {ROW_SELECTOR} from "../plugins/rowSelector/types";

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