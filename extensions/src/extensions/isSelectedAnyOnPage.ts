import {GridFunction, DataLoader, DataResponse, GridPluginType} from '@anglr/grid';

/**
 * Gets indication whether is selected any row on current page
 */
export function isSelectedAnyOnPage<TItem>(): GridFunction<boolean>
{
    return grid =>
    {
        const dataLoader = grid.getPlugin<DataLoader<DataResponse<TItem>>>(GridPluginType.DataLoader);
        const rowSelector = grid.getPlugin(GridPluginType.RowSelector);

        if(dataLoader.result().data.length == 0)
        {
            return false;
        }

        for(let x = 0; x < dataLoader.result().data.length; x++)
        {
            if(rowSelector.isSelected(dataLoader.result().data[x]))
            {
                return true;
            }
        }

        return false;
    };
}
