import {Component, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';

import {LimitedRowSelectorOptions, LimitedRowSelector} from './limitedRowSelector.interface';
import {BasicRowSelectorSAComponent} from '../basic/basicRowSelector.component';
import {GridPlugin} from '../../../interfaces';

/**
 * Component used for handling row selection with limit of selected rows
 */
@Component(
{
    selector: 'ng-limited-row-selector',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LimitedRowSelectorSAComponent<TSelectedData = unknown, TData = unknown, TId = unknown> extends BasicRowSelectorSAComponent<TSelectedData, TData, TId> implements LimitedRowSelector<TSelectedData, TData, TId>, GridPlugin<LimitedRowSelectorOptions<TSelectedData, TData, TId>>, OnDestroy
{
    //######################### protected fields - overrides #########################

    /**
     * @inheritdoc
     */
    protected override ɵoptions: LimitedRowSelectorOptions<TSelectedData, TData, TId> = super.ɵoptions as LimitedRowSelectorOptions<TSelectedData, TData, TId>;

    //######################### public properties - overrides #########################

    /**
     * @inheritdoc
     */
    public override get options(): LimitedRowSelectorOptions<TSelectedData, TData, TId>
    {
        return this.ɵoptions;
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
        if(!isNaN(this.ɵoptions.limit) && !isNaN(this.selectedIds.length) && this.selectedIds.length >= this.ɵoptions.limit && select)
        {
            return;
        }

        return super.selectItem(item, select);
    }
}