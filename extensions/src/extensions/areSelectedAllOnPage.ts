import {GridFunction, RowSelector, ROW_SELECTOR, DataLoader, DataResponse, DATA_LOADER} from "@anglr/grid";

/**
 * Gets indication whether are all currently displayed items on page selected or not, works with DataResponse DataLoader
 */
export function areSelectedAllOnPage(): GridFunction<boolean>
{
    return grid =>
    {
        let dataLoader = grid.getPlugin<DataLoader<DataResponse<any>>>(DATA_LOADER);
        let rowSelector = grid.getPlugin<RowSelector<any, any, any>>(ROW_SELECTOR);

        if(dataLoader.result.data.length == 0)
        {
            return false;
        }

        for(let x = 0; x < dataLoader.result.data.length; x++)
        {
            if(!rowSelector.isSelected(dataLoader.result.data[x]))
            {
                return false;
            }
        }

        return true;
    };
}