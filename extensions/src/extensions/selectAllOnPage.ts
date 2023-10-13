import {GridAction, RowSelector, DataLoader, DataResponse, GridPluginType} from '@anglr/grid';

/**
 * Selects or deselects all items on current page
 * @param select - Indication whether select or deselect all items on current page
 * @param predicate - Predicate that is evaluated whether row item falls into condition which allows selection/deselection of all items on page
 */
export function selectAllOnPage<TItem>(select: boolean = true, predicate: (item: TItem) => boolean = () => true): GridAction
{
    return grid =>
    {
        const dataLoader = grid.getPlugin<DataLoader<DataResponse<TItem>>>(GridPluginType.DataLoader);
        const rowSelector = grid.getPlugin<RowSelector>(GridPluginType.RowSelector);

        dataLoader.result().data.forEach(datum =>
        {
            if(predicate(datum))
            {
                rowSelector.selectItem(datum, select);
            }
        });
    };
}