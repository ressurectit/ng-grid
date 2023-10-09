import {GridAction, DataLoader, Paging, PagingOptions, GridPluginType} from '@anglr/grid';

/**
 * Refresh data to default page
 * @param force - Indication that data should be reloaded
 */
export function refreshDataToDefaultPage(force?: boolean): GridAction
{
    return grid =>
    {
        const paging = grid.getPlugin<Paging>(GridPluginType.Paging);
        const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);
        const pagingOptions: PagingOptions = paging.options as PagingOptions;
        
        paging.page = pagingOptions.initialPage;

        dataLoader.loadData(force);
    };
}