import {GridAction, Paging, PAGING, DataLoader, DATA_LOADER} from "@anglr/grid";

/**
 * Sets page for grid
 * @param page - Number of page that is going to be set
 */
export function setPage(page: number): GridAction
{
    return grid =>
    {
        let paging = grid.getPlugin<Paging>(PAGING);
        let dataLoader = grid.getPlugin<DataLoader<any>>(DATA_LOADER);

        paging.page = page;
        paging.invalidateVisuals();
        dataLoader.loadData();
    };
}