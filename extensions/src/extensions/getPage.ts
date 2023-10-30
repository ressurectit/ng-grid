import {GridFunction, GridPluginType} from '@anglr/grid';

/**
 * Gets current page of grid
 */
export function getPage(): GridFunction<number>
{
    return grid =>
    {
        const paging = grid.getPlugin(GridPluginType.Paging);

        return paging.page() ?? 1;
    };
}