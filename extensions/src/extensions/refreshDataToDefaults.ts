import {GridAction, GridPluginType} from '@anglr/grid';

/**
 * Refresh data to defaults
 * @param force - Indication that data should be reloaded
 */
export function refreshDataToDefaults(force?: boolean): GridAction
{
    return grid =>
    {
        const paging = grid.getPlugin(GridPluginType.Paging);
        const dataLoader = grid.getPlugin(GridPluginType.DataLoader);
        
        paging.setPage(paging.options.initialPage);
        paging.setItemsPerPage(paging.options.initialItemsPerPage);

        dataLoader.loadData(force);
    };
}