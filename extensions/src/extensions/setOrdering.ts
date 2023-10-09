import {ContentRenderer, DataLoader, GridAction, GridPluginType} from '@anglr/grid';

/**
 * Sets ordering for grid
 * @param ordering - Ordering to be set for grid
 */
export function setOrdering<TOrdering>(ordering: TOrdering): GridAction
{
    return grid =>
    {
        const contentRenderer = grid.getPlugin<ContentRenderer<TOrdering>>(GridPluginType.ContentRenderer);
        const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);

        contentRenderer.ordering = ordering as TOrdering;
        dataLoader.loadData();
    };
}