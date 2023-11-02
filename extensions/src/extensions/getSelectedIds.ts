import {GridFunction, GridPluginType, RowSelector} from '@anglr/grid';

/**
 * Gets currently selected ids
 */
export function getSelectedIds<TId>(): GridFunction<TId[]>
{
    return grid =>
    {
        const rowSelector = grid.getPlugin<RowSelector<unknown, unknown, TId>>(GridPluginType.RowSelector);

        return rowSelector.selectedIds();
    };
}