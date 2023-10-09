import {RowSelector, RowSelectorOptions} from '../../../interfaces';

/**
 * Basic row selector options
 */
export interface BasicRowSelectorOptions<TSelectedData = unknown, TData = unknown, TId = unknown> extends RowSelectorOptions<TSelectedData, TData, TId>
{
}

/**
 * Public API for basic row selector
 */
export interface BasicRowSelector<TSelectedData = unknown, TData = unknown, TId = unknown> extends RowSelector<TSelectedData, TData, TId>
{
}