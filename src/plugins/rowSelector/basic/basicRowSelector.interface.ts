import {RowSelectorOptions, RowSelector} from '../rowSelector.interface';

/**
 * Basic row selector options
 */
export interface BasicRowSelectorOptions<TSelectedData = any, TData = any, TId = any> extends RowSelectorOptions<TSelectedData, TData, TId>
{
}

/**
 * Public API for basic row selector
 */
export interface BasicRowSelector<TSelectedData = any, TData = any, TId = any> extends RowSelector<TSelectedData, TData, TId>
{
}