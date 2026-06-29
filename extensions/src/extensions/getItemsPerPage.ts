import {GridFunction, GridPluginType} from '@anglr/grid';

/**
 * Gets current items per page of grid, when ran in reactive context, it will update when items per page changes
 */
export function getItemsPerPage(): GridFunction<number>
{
    return grid =>
    {
        if(!grid.initializedSignal())
        {
            return 0;
        }

        const paging = grid.getPlugin(GridPluginType.Paging);

        return paging.itemsPerPage() ?? 0;
    };
}
