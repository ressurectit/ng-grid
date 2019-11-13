import {GridAction, RowSelector, ROW_SELECTOR, DataLoader, DataResponse, DATA_LOADER} from "@anglr/grid";

/**
 * Selects or deselects all items on current page
 * @param select Indication whether select or deselect all items on current page
 */
export function selectAllOnPage(select: boolean = true): GridAction
{
    return grid =>
    {
        let dataLoader = grid.getPlugin<DataLoader<DataResponse<any>>>(DATA_LOADER);
        let rowSelector = grid.getPlugin<RowSelector<any, any, any>>(ROW_SELECTOR);

        dataLoader.result.data.forEach(datum => rowSelector.selectItem(datum, select));
    };
}