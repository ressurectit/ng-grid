import {GridAction} from "../components/grid";
import {Paging} from "../plugins/paging";
import {PAGING} from "../plugins/paging/types";
import {DATA_LOADER, DataLoader} from "../plugins/dataLoader";

/**
 * Sets page for grid
 * @param page Number of page that is going to be set
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