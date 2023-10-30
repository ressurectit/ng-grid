import {GridAction, GridPluginType} from '@anglr/grid';

/**
 * Refresh data to default page
 * @param force - Indication that data should be reloaded
 */
export function refreshDataToDefaultPage(force?: boolean): GridAction
{
    return grid =>
    {
        const paging = grid.getPlugin(GridPluginType.Paging);
        const dataLoader = grid.getPlugin(GridPluginType.DataLoader);
        
        paging.setPage(paging.options.initialPage);
        dataLoader.loadData(force);
    };
}