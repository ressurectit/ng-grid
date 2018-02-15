import {GridAction} from "../components/grid";
import {PAGING, Paging} from "../plugins/paging";
import {DATA_LOADER, DataLoader} from "../plugins/dataLoader";

/**
 * Sets page for grid
 * @param {number} page Number of page that is going to be set
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