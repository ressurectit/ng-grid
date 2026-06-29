import {GridFunction, GridPluginType} from '@anglr/grid';

/**
 * Gets current page of grid, when ran in reactive context, it will update when page changes
 */
export function getPage(): GridFunction<number>
{
    return grid =>
    {
        if(!grid.initializedSignal())
        {
            return 1;
        }

        const paging = grid.getPlugin(GridPluginType.Paging);

        return paging.page() ?? 1;
    };
}
