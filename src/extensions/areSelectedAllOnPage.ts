import {GridFunction} from "../components/grid";
import {RowSelector} from "../plugins/rowSelector";
import {ROW_SELECTOR} from "../plugins/rowSelector/types";
import {DataLoader, DataResponse} from "../plugins/dataLoader";
import {DATA_LOADER} from "../plugins/dataLoader/types";

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