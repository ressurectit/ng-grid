import {RowSelectorOptions, RowSelector} from '../rowSelector.interface';

/**
 * Limited row selector options
 */
export interface LimitedRowSelectorOptions<TSelectedData, TData, TId> extends RowSelectorOptions<TSelectedData, TData, TId>
{
    /**
     * Count of items that can be selected
     */
    limit?: number;
}

/**
 * Public API for limited row selector
 */
export interface LimitedRowSelector<TSelectedData, TData, TId> extends RowSelector<TSelectedData, TData, TId>
{
}