import {ContentRenderer, CONTENT_RENDERER, DataLoader, DATA_LOADER, GridAction} from '@anglr/grid';

/**
 * Sets ordering for grid
 * @param ordering - Ordering to be set for grid
 */
export function setOrdering<TOrdering>(ordering: TOrdering): GridAction
{
    return grid =>
    {
        const contentRenderer = grid.getPlugin<ContentRenderer<TOrdering>>(CONTENT_RENDERER);
        const dataLoader = grid.getPlugin<DataLoader>(DATA_LOADER);

        contentRenderer.ordering = ordering;
        dataLoader.loadData();
    };
}