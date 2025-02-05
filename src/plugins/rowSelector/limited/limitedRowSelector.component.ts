import {Component, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';

import {LimitedRowSelectorOptions, LimitedRowSelector} from './limitedRowSelector.interface';
import {BasicRowSelectorComponent} from '../basic/basicRowSelector.component';
import {GridPlugin} from '../../../interfaces';

/**
 * Component used for handling row selection with limit of selected rows
 */
@Component(
{
    selector: 'ng-limited-row-selector',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LimitedRowSelectorComponent<TSelectedData = unknown, TData = unknown, TId = unknown> extends BasicRowSelectorComponent<TSelectedData, TData, TId> implements LimitedRowSelector<TSelectedData, TData, TId>, GridPlugin<LimitedRowSelectorOptions<TSelectedData, TData, TId>>, OnDestroy
{
    //######################### public properties - overrides #########################

    /**
     * @inheritdoc
     */
    public override get options(): LimitedRowSelectorOptions<TSelectedData, TData, TId>
    {
        return this.ɵoptions as LimitedRowSelectorOptions<TSelectedData, TData, TId>;
    }
    public override set options(options: RecursivePartial<LimitedRowSelectorOptions<TSelectedData, TData, TId>>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options) as LimitedRowSelectorOptions<TSelectedData, TData, TId>;
    }

    //######################### public methods - overrides #########################

    /**
     * Adds item to selection (or remove it from selection if deselect is true)
     * @param item - Item that is going to be selected
     * @param select - Indication whether select specified item, defaults to true
     */
    public override selectItem(item: TData, select: boolean = true): void
    {
        if(!isNaN(this.options.limit) && !isNaN(this.selectedIds.length) && this.selectedIds.length >= this.options.limit && select)
        {
            return;
        }

        return super.selectItem(item, select);
    }
}
