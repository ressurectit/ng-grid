import {DataLoader, GridAction, GridPluginType, Ordering} from '@anglr/grid';

/**
 * Sets ordering for grid
 * @param ordering - Ordering to be set for grid
 */
export function setOrdering<TOrdering>(ordering: TOrdering): GridAction
{
    return grid =>
    {
        const orderingPlugin = grid.getPlugin<Ordering<TOrdering>>(GridPluginType.Ordering);
        const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);

        orderingPlugin.setOrdering(ordering);
        dataLoader.loadData();
    };
}