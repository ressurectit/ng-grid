import {Observable} from 'rxjs';

import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';
import {VisualPluginOptions} from '../../visualPluginOptions/visualPluginOptions.interface';


//TODO: use as default
// spanOrderingDirection:
//         {
//             none: 'fa fa-sort',
//             asc: 'fa fa-sort-up',
//             desc: 'fa fa-sort-down',
//         },

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
}

/**
 * Public API for ordering
 */
export interface Ordering<TOrdering = unknown, TOptions extends OrderingOptions = OrderingOptions> extends GridPlugin<TOptions>
{
    /**
     * Current ordering value
     */
    readonly ordering: TOrdering|undefined|null;

    /**
     * Occurs when current ordering has changed
     */
    readonly orderingChange: Observable<void>;

    /**
     * Sets ordering to ordering plugin
     * @param ordering - Ordering to be set for ordering plugin
     * @param emit - Indication whether emit change event, defaults to true
     */
    setOrdering(ordering: TOrdering|undefined|null, emit?: boolean): void;

    /**
     * Marks column for odering
     * @param columnId - Id of column that was marked by user for ordering
     */
    orderByColumn(columnId: string): void;
}