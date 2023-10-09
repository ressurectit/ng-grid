import {GridAction, Paging, DataLoader, GridPluginType} from '@anglr/grid';

/**
 * Sets page for grid
 * @param page - Number of page that is going to be set
 */
export function setPage(page: number): GridAction
{
    return grid =>
    {
        const paging = grid.getPlugin<Paging>(GridPluginType.Paging);
        const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);

        paging.page = page;
        paging.invalidateVisuals();
        dataLoader.loadData();
    };
}