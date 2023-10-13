import {GridFunction, GridPluginType, RowSelector} from '@anglr/grid';

/**
 * Gets currently selected data
 */
export function getSelectedData<TSelectedData>(): GridFunction<TSelectedData[]>
{
    return grid =>
    {
        const rowSelector = grid.getPlugin<RowSelector<TSelectedData>>(GridPluginType.RowSelector);

        return rowSelector.selectedData();
    };
}