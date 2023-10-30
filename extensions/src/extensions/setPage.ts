import {GridAction, GridPluginType} from '@anglr/grid';

/**
 * Sets page for grid
 * @param page - Number of page that is going to be set
 */
export function setPage(page: number): GridAction
{
    return async grid =>
    {
        const gridInitializer = grid.getPlugin(GridPluginType.GridInitializer);
        const paging = grid.getPlugin(GridPluginType.Paging);

        await gridInitializer.setPage(page);
        paging.setPage(page);
    };
}