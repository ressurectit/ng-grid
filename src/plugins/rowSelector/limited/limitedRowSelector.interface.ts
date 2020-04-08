import {RowSelectorOptions, RowSelector} from '../rowSelector.interface';

/**
 * Limited row selector options
 */
export interface LimitedRowSelectorOptions<TSelectedData = any, TData = any, TId = any> extends RowSelectorOptions<TSelectedData, TData, TId>
{
    /**
     * Count of items that can be selected
     */
    limit?: number;
}

/**
 * Public API for limited row selector
 */
export interface LimitedRowSelector<TSelectedData = any, TData = any, TId = any> extends RowSelector<TSelectedData, TData, TId>
{
}