import {GridFunction, GridPluginType, RowSelector} from '@anglr/grid';

/**
 * Gets indication whether is selected at least one item from whole selection
 */
export function isSelectedAny(): GridFunction<boolean>
{
    return grid =>
    {
        const rowSelector = grid.getPlugin<RowSelector>(GridPluginType.RowSelector);

        return rowSelector.selectedIds.length > 0;
    };
}