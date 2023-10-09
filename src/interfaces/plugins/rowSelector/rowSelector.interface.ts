import {Observable} from 'rxjs';

import {PluginOptions} from '../../pluginOptions/pluginOptions.interface';
import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';

/**
 * Row selector options
 */
export interface RowSelectorOptions<TSelectedData = unknown, TData = unknown, TId = unknown> extends PluginOptions
{
    /**
     * Method used for obtaining row id, without this row selector cant work
     */
    getRowId: (data: TData) => TId;

    /**
     * Indication whether row selection is enabled
     */
    multiSelection: boolean;

    /**
     * Indication whether selected data should be reset when displayed data change
     */
    autoResetOnDataChange: boolean;

    /**
     * Method which if is not specified uses getRowId, but normaly can store specific data for selected rows
     */
    getRowData: (data: TData) => TSelectedData;
}

/**
 * Public API for row selector
 */
export interface RowSelector<TSelectedData = unknown, TData = unknown, TId = unknown> extends GridPlugin
{
    /**
     * Array of currently selected row ids
     */
    readonly selectedIds: TId[];

    /**
     * Array of currently selected row data
     */
    readonly selectedData: TSelectedData[];

    /**
     * Occurs when selection has changed
     */
    readonly selectedChange: Observable<void>;

    /**
     * Resets current selection
     */
    resetSelection(): void;

    /**
     * Adds item to selection (or remove it from selection if deselect is true)
     * @param item - Item that is going to be selected
     * @param select - Indication whether select specified item, defaults to true
     */
    selectItem(item: TData, select?: boolean): void;

    /**
     * Gets indication whether item is currently selected
     * @param item - Item that is tested for current selection
     */
    isSelected(item: TData): boolean;
}