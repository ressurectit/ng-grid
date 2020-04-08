import {GridFunction, RowSelector, ROW_SELECTOR, DataLoader, DataResponse, DATA_LOADER} from "@anglr/grid";

/**
 * Gets indication whether are all currently displayed items on page selected or not, works with DataResponse DataLoader
 * @param predicate - Predicate that is evaluated whether row item falls into condition which allows selection/deselection of all items on page
 */
export function areSelectedAllOnPage<TItem>(predicate: (item: TItem) => boolean = () => true): GridFunction<boolean>
{
    return grid =>
    {
        let dataLoader = grid.getPlugin<DataLoader<DataResponse<TItem>>>(DATA_LOADER);
        let rowSelector = grid.getPlugin<RowSelector>(ROW_SELECTOR);

        if(dataLoader.result.data.length == 0)
        {
            return false;
        }

        for(let x = 0; x < dataLoader.result.data.length; x++)
        {
            if(!predicate(dataLoader.result.data[x]))
            {
                continue;
            }

            if(!rowSelector.isSelected(dataLoader.result.data[x]))
            {
                return false;
            }
        }

        return true;
    };
}