import {Component, ChangeDetectionStrategy, OnDestroy} from '@angular/core';

import {LimitedRowSelectorOptions, LimitedRowSelector} from './limitedRowSelector.interface';
import {BasicRowSelectorComponent} from '../basic/basicRowSelector.component';
import {GridPluginGeneric} from '../../../misc/plugin.interface';

/**
 * Component used for handling row selection with limit to count of selected rows
 */
@Component(
{
    selector: 'ng-limited-row-selector',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LimitedRowSelectorComponent<TSelectedData = any, TData = any, TId = any> extends BasicRowSelectorComponent<TSelectedData, TData, TId> implements LimitedRowSelector<TSelectedData, TData, TId>, GridPluginGeneric<LimitedRowSelectorOptions<TSelectedData, TData, TId>>, OnDestroy
{
    /**
     * Options for grid plugin
     */
    protected override _options: LimitedRowSelectorOptions<TSelectedData, TData, TId>;

    /**
     * Adds item to selection (or remove it from selection if deselect is true)
     * @param item - Item that is going to be selected
     * @param select - Indication whether select specified item, defaults to true
     */
    public override selectItem(item: TData, select: boolean = true)
    {
        if(!isNaN(this._options.limit) && !isNaN(this.selectedIds.length) && this.selectedIds.length >= this._options.limit && select)
        {
            return;
        }

        return super.selectItem(item, select);
    }
}