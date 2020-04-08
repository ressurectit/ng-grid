import {GridAction, DataLoader, DATA_LOADER, Paging, PagingOptions, PAGING} from "@anglr/grid";

/**
 * Refresh data to default page
 * @param force - Indication that data should be reloaded
 */
export function refreshDataToDefaultPage(force?: boolean): GridAction
{
    return grid =>
    {
        let paging = grid.getPlugin<Paging>(PAGING);
        let dataLoader = grid.getPlugin<DataLoader>(DATA_LOADER);
        let pagingOptions: PagingOptions = paging.options;
        
        paging.page = pagingOptions.initialPage;

        dataLoader.loadData(force);
    };
}