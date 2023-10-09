import {BasicRowSelector, BasicRowSelectorOptions} from '../basic/basicRowSelector.interface';

/**
 * Limited row selector options
 */
export interface LimitedRowSelectorOptions<TSelectedData = unknown, TData = unknown, TId = unknown> extends BasicRowSelectorOptions<TSelectedData, TData, TId>
{
    /**
     * Count of items that can be selected
     */
    limit: number;
}

/**
 * Public API for limited row selector
 */
export interface LimitedRowSelector<TSelectedData = unknown, TData = unknown, TId = unknown> extends BasicRowSelector<TSelectedData, TData, TId>
{
}