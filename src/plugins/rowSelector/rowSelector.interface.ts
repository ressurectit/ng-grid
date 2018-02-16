import {InjectionToken, EventEmitter} from "@angular/core";

import {GridPlugin, PluginOptions} from "../../misc";

/**
 * Token for injecting options for row selector
 */
export const ROW_SELECTOR_OPTIONS: InjectionToken<RowSelectorOptions<any, any, any>> = new InjectionToken<RowSelectorOptions<any, any, any>>('ROW_SELECTOR_OPTIONS');

/**
 * Constant used for accessing row selector in grid
 */
export const ROW_SELECTOR = "ROW_SELECTOR";

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
     * @param {TData} item Item that is going to be selected
     * @param {boolean} deselect Indication whether deselect specified item
     */
    selectItem(item: TData, deselect?: boolean);

    /**
     * Gets indication whether item is currently selected
     * @param {TData} item Item that is tested for current selection
     */
    isSelected(item: TData): boolean;
}