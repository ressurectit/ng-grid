import {GridAction, GridPluginType, RowSelector} from '@anglr/grid';

/**
 * Resets (deselects) all selection
 */
export function resetSelection(): GridAction
{
    return grid =>
    {
        if(!grid.initializedSignal())
        {
            return;
        }

        const rowSelector = grid.getPlugin<RowSelector>(GridPluginType.RowSelector);

        rowSelector.resetSelection();
    };
}
