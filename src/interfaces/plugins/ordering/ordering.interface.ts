import {Signal, Type} from '@angular/core';

import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';
import {VisualPluginOptions} from '../../visualPluginOptions/visualPluginOptions.interface';
import {OrderableIndicatorRenderer} from '../../orderableIndicatorRenderer/orderableIndicatorRenderer.interface';

/**
 * Css classes that are used for ordering
 */
export interface CssClassesOrdering
{
    /**
     * Indication that column is orderable
     */
    orderable: string;

    /**
     * No ordering
     */
    none: string;

    /**
     * Ordering is ascending
     */
    asc: string;

    /**
     * Ordering is descending
     */
    desc: string;
}

/**
 * Ordering options allow configuring ordering plugin
 */
export interface OrderingOptions<TCssClasses extends CssClassesOrdering = CssClassesOrdering> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Type of orderable indicator renderer
     */
    indicatorRenderer: Type<OrderableIndicatorRenderer>;
}

/**
 * Public API for ordering
 */
export interface Ordering<TOrdering = unknown, TOptions extends OrderingOptions = OrderingOptions> extends GridPlugin<TOptions>
{
    /**
     * Current ordering value
     */
    readonly ordering: Signal<TOrdering|undefined|null>;

    /**
     * Sets ordering to ordering plugin
     * @param ordering - Ordering to be set for ordering plugin
     */
    setOrdering(ordering: TOrdering|undefined|null): void;

    /**
     * Marks column for odering
     * @param columnId - Id of column that was marked by user for ordering
     */
    orderByColumn(columnId: string): void;

    /**
     * Obtains css classes for column
     * @param columnId - Id of column for which will be css classes obtained
     */
    getCssClassesForColumn(columnId: string): string[];
}