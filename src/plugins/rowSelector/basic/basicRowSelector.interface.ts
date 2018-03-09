import {RowSelectorOptions, RowSelector} from "../rowSelector.interface";

/**
 * Basic row selector options
 */
export interface BasicRowSelectorOptions<TSelectedData, TData, TId> extends RowSelectorOptions<TSelectedData, TData, TId>
{
}

/**
 * Public API for basic row selector
 */
export interface BasicRowSelector<TSelectedData, TData, TId> extends RowSelector<TSelectedData, TData, TId>
{
}