import {InjectionToken} from '@angular/core';

import {RowSelectorOptions, RowSelector} from './rowSelector.interface';
import {Grid} from '../../components/grid';

/**
 * Token for injecting options for row selector
 */
export const ROW_SELECTOR_OPTIONS: InjectionToken<RowSelectorOptions> = new InjectionToken<RowSelectorOptions>('ROW_SELECTOR_OPTIONS');

/**
 * Constant used for accessing row selector in grid
 */
export const ROW_SELECTOR = 'ROW_SELECTOR';

/**
 * Applies block of row selection to grid, if row was not selected checkbox change event will be blocked
 * @param grid - Instance of grid which is used
 * @param itm - Data item for row
 * @param event - Mouse event that occured
 */
export function applyRowSelectionBlock<TItem>(grid: Grid, itm: TItem, event: MouseEvent)
{
    const rowSelector = grid.getPlugin<RowSelector>(ROW_SELECTOR);

    if(!rowSelector.isSelected(itm) && (event.target as HTMLInputElement).checked)
    {
        event.preventDefault();
    }
}