import {EventEmitter} from "@angular/core";

import {GridPlugin, PluginOptions} from "../../misc";

/**
 * Row selector options
 */
export interface RowSelectorOptions<TSelectedData, TData, TId> extends PluginOptions
{
    /**
     * Method used for obtaining row id, without this row selector can`t work
     */
    getRowId: (data: TData) => TId;

    /**
     * Indication whether row selection is enabled
     */
    multiSelection?: boolean;

    /**
     * Indication whether selected data should be reset when displayed data change
     */
    autoResetOnDataChange?: boolean;

    /**
     * Method which if is not specified uses getRowId, but normaly can store specific data for selected rows
     */
    getRowData?: (data: TData) => TSelectedData;
}

/**
 * Public API for row selector
 */
export interface RowSelector<TSelectedData, TData, TId> extends GridPlugin
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
    readonly selectedChange?: EventEmitter<void>;

    /**
     * Resets current selection
     */
    resetSelection();

    /**
     * Adds item to selection (or remove it from selection if deselect is true)
     * @param item - Item that is going to be selected
     * @param select - Indication whether select specified item, defaults to true
     */
    selectItem(item: TData, select?: boolean);

    /**
     * Gets indication whether item is currently selected
     * @param item - Item that is tested for current selection
     */
    isSelected(item: TData): boolean;
}