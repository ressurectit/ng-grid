import {GridAction, GridInitializer, GridPluginType, Ordering} from '@anglr/grid';

/**
 * Sets ordering for grid
 * @param ordering - Ordering to be set for grid
 */
export function setOrdering<TOrdering>(ordering: TOrdering): GridAction
{
    return async grid =>
    {
        const gridInitializer = grid.getPlugin<GridInitializer<TOrdering>>(GridPluginType.GridInitializer);
        const orderingPlugin = grid.getPlugin<Ordering<TOrdering>>(GridPluginType.Ordering);

        await gridInitializer.setOrdering(ordering);
        orderingPlugin.setOrdering(ordering);
    };
}