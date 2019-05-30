import {GridAction} from "../components/grid";
import {DataLoader} from "../plugins/dataLoader";
import {DATA_LOADER} from "../plugins/dataLoader/types";
import {Paging, PagingOptions} from "../plugins/paging";
import {PAGING} from "../plugins/paging/types";

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