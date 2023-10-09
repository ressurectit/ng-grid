import {GridFunction, GridPluginType, Paging} from '@anglr/grid';

/**
 * Gets current page of grid
 */
export function getPage(): GridFunction<number>
{
    return grid =>
    {
        const paging = grid.getPlugin<Paging>(GridPluginType.Paging);

        return paging.page;
    };
}