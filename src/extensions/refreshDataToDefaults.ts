import {GridAction} from "../components/grid";
import {DataLoader, DATA_LOADER} from "../plugins/dataLoader";
import {PAGING, Paging, PagingOptions} from "../plugins/paging";

/**
 * Refresh data to defaults
 * @param force Indication that data should be reloaded
 */
export function refreshDataToDefaults(force?: boolean): GridAction
{
    return grid =>
    {
        let paging = grid.getPlugin<Paging>(PAGING);
        let dataLoader = grid.getPlugin<DataLoader<any>>(DATA_LOADER);
        let pagingOptions: PagingOptions<any> = paging.options;
        
        paging.page = pagingOptions.initialPage;
        paging.itemsPerPage = pagingOptions.initialItemsPerPage;

        dataLoader.loadData(force);
    };
}