import {GridAction, DataLoader, GridPluginType} from '@anglr/grid';

/**
 * Refresh data
 * @param force - Indication that data should be reloaded
 */
export function refreshData(force?: boolean): GridAction
{
    return grid =>
    {
        const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);

        dataLoader.loadData(force);
    };
}