import {Ordering, OrderingOptions, SimpleOrdering} from '../../../interfaces';

/**
 * Ordering options for single ordering
 */
export interface SingleOrderingOptions extends OrderingOptions
{
}

/**
 * Public API for single ordering
 */
export interface SingleOrdering extends Ordering<SimpleOrdering, SingleOrderingOptions>
{
}