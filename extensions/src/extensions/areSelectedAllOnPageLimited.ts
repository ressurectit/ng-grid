import {GridFunction, DataLoader, DataResponse, GridPluginType, LimitedRowSelectorOptions} from '@anglr/grid';
import {isPresent} from '@jscrpt/common';

/**
 * Gets indication whether are all currently displayed items on page selected or not, works with DataResponse DataLoader
 * @param predicate Predicate that is evaluated whether row item falls into condition which allows selection/deselection of all items on page
 */
export function areSelectedAllOnPageLimited<TItem>(predicate: (item: TItem) => boolean = () => true): GridFunction<boolean>
{
    return grid =>
    {
        const dataLoader = grid.getPlugin<DataLoader<DataResponse<TItem>>>(GridPluginType.DataLoader);
        const rowSelector = grid.getPlugin(GridPluginType.RowSelector);
        const rowSelectorOptions: LimitedRowSelectorOptions = rowSelector.options as LimitedRowSelectorOptions;

        if(dataLoader.result().data.length == 0)
        {
            return false;
        }

        let counter = 0;
        let selectableData = 0;

        for(let x = 0; x < dataLoader.result().data.length; x++)
        {
            if(!predicate(dataLoader.result().data[x]))
            {
                continue;
            }

            selectableData++;

            if(rowSelector.isSelected(dataLoader.result().data[x]))
            {
                counter++;
            }
        }

        return counter == selectableData || (isPresent(rowSelectorOptions.limit) && rowSelectorOptions.limit == rowSelector.selectedIds.length);
    };
}