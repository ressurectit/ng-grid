import {GridAction} from "../components/grid";
import {DataLoader, DATA_LOADER} from "../plugins/dataLoader";
import {PAGING, Paging, PagingOptions} from "../plugins/paging";

/**
 * Refresh data to default page
 * @param force Indication that data should be reloaded
 */
export function refreshDataToDefaultPage(force?: boolean): GridAction
{
    return grid =>
    {
        let paging = grid.getPlugin<Paging>(PAGING);
        let dataLoader = grid.getPlugin<DataLoader<any>>(DATA_LOADER);
        let pagingOptions: PagingOptions<any> = paging.options;
        
        paging.page = pagingOptions.initialPage;

        dataLoader.loadData(force);
    };
}