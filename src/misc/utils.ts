import {Grid, RowSelector, SimpleOrdering} from '../interfaces';
import {GridPluginType} from './enums';

/**
 * Applies block of row selection to grid, if row was not selected checkbox change event will be blocked
 * @param grid - Instance of grid which is used
 * @param itm - Data item for row
 * @param event - Mouse event that occured
 */
export function applyRowSelectionBlock<TItem>(grid: Grid, itm: TItem, event: MouseEvent): void
{
    const rowSelector = grid.getPlugin<RowSelector>(GridPluginType.RowSelector);

    if(!rowSelector.isSelected(itm) && (event.target as HTMLInputElement).checked)
    {
        event.preventDefault();
    }
}

/**
 * Serialize ordering
 * @param ordering - Ordering to be serialized
 */
export function serializeSimpleOrdering(ordering: SimpleOrdering): string|null
{
    if(!ordering)
    {
        return null;
    }

    return encodeURIComponent(`${ordering.orderBy},${ordering.orderByDirection}`);
}

/**
 * Deserialize ordering
 * @param ordering - Ordering as string to be deserialized
 */
export function deserializeSimpleOrdering(ordering: string): SimpleOrdering|null
{
    if(!ordering)
    {
        return null;
    }

    const [orderBy, orderByDirection] = decodeURIComponent(ordering).split(',');

    return {
        orderBy: orderBy,
        orderByDirection: +orderByDirection
    };
}
