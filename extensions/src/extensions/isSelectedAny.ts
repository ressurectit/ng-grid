import {GridFunction, RowSelector, ROW_SELECTOR} from '@anglr/grid';

/**
 * Gets indication whether is selected at least one item from whole selection
 */
export function isSelectedAny(): GridFunction<boolean>
{
    return grid =>
    {
        const rowSelector = grid.getPlugin<RowSelector>(ROW_SELECTOR);

        return rowSelector.selectedIds.length > 0;
    };
}