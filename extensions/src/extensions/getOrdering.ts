import {GridFunction, GridPluginType, Ordering} from '@anglr/grid';

/**
 * Gets current ordering of grid, when ran in reactive context, it will update when ordering changes
 */
export function getOrdering<TOrdering>(): GridFunction<TOrdering|undefined|null>
{
    return grid =>
    {
        if(!grid.initializedSignal())
        {
            return null;
        }

        const ordering = grid.getPlugin(GridPluginType.Ordering) as Ordering<TOrdering>;

        return ordering.ordering();
    };
}
