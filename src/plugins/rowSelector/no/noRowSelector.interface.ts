import {RowSelector, RowSelectorOptions} from '../../../interfaces';

/**
 * No row selector options
 */
export interface NoRowSelectorOptions<TSelectedData = unknown, TData = unknown, TId = unknown> extends RowSelectorOptions<TSelectedData, TData, TId>
{
}

/**
 * Public API for no row selector
 */
export interface NoRowSelector<TSelectedData = unknown, TData = unknown, TId = unknown> extends RowSelector<TSelectedData, TData, TId>
{
}