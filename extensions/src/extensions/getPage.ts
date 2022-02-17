import {GridFunction, Paging, PAGING} from '@anglr/grid';

/**
 * Gets current page of grid
 */
export function getPage(): GridFunction<number>
{
    return grid =>
    {
        const paging = grid.getPlugin<Paging>(PAGING);

        return paging.page;
    };
}