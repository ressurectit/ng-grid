import {GridAction, DataLoader, DATA_LOADER, Paging, PagingOptions, PAGING} from '@anglr/grid';

/**
 * Refresh data to defaults
 * @param force - Indication that data should be reloaded
 */
export function refreshDataToDefaults(force?: boolean): GridAction
{
    return grid =>
    {
        const paging = grid.getPlugin<Paging>(PAGING);
        const dataLoader = grid.getPlugin<DataLoader>(DATA_LOADER);
        const pagingOptions: PagingOptions = paging.options;
        
        paging.page = pagingOptions.initialPage;
        paging.itemsPerPage = pagingOptions.initialItemsPerPage;

        dataLoader.loadData(force);
    };
}