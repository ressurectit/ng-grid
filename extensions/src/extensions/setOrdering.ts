import {ContentRenderer, CONTENT_RENDERER, DataLoader, DATA_LOADER, GridAction} from "@anglr/grid";

/**
 * Sets ordering for grid
 * @param ordering - Ordering to be set for grid
 */
export function setOrdering<TOrdering>(ordering: TOrdering): GridAction
{
    return grid =>
    {
        let contentRenderer = grid.getPlugin<ContentRenderer<TOrdering>>(CONTENT_RENDERER);
        let dataLoader = grid.getPlugin<DataLoader<any>>(DATA_LOADER);

        contentRenderer.ordering = ordering;
        dataLoader.loadData();
    };
}