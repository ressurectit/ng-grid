import {Signal} from '@angular/core';
import {Func1} from '@jscrpt/common';

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
    getRowId: Func1<TId, TData>|null;

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
    getRowData: Func1<TSelectedData, TData>;
}

/**
 * Public API for row selector
 */
export interface RowSelector<TSelectedData = unknown, TData = unknown, TId = unknown, TOptions extends RowSelectorOptions<TSelectedData, TData, TId> = RowSelectorOptions<TSelectedData, TData, TId>> extends GridPlugin<TOptions>
{
    /**
     * Array of currently selected row ids
     */
    readonly selectedIds: Signal<TId[]>;

    /**
     * Array of currently selected row data
     */
    readonly selectedData: Signal<TSelectedData[]>;

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