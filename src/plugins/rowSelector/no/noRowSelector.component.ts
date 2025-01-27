import {Component, ChangeDetectionStrategy, ElementRef, Inject, Optional, WritableSignal, signal, Signal, inject} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';

import {NoRowSelectorOptions, NoRowSelector} from './noRowSelector.interface';
import {GridPlugin, GridPluginInstances} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, ROW_SELECTOR_OPTIONS} from '../../../misc/tokens';

/**
 * Default options for row selector
 */
const defaultOptions: NoRowSelectorOptions =
{
    getRowId: null,
    autoResetOnDataChange: false,
    multiSelection: true,
    getRowData: data => data
};

/**
 * Component used for handling no row selection
 */
@Component(
{
    selector: 'ng-no-row-selector',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoRowSelectorComponent<TSelectedData = unknown, TData = unknown, TId = unknown> implements NoRowSelector<TSelectedData, TData, TId>, GridPlugin<NoRowSelectorOptions<TSelectedData, TData, TId>>
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected ɵoptions: NoRowSelectorOptions<TSelectedData, TData, TId>;

    /**
     * Array of currently selected row ids
     */
    protected ɵselectedIds: WritableSignal<TId[]> = signal([]);

    /**
     * Array of currently selected row data
     */
    protected ɵselectedData: WritableSignal<TSelectedData[]> = signal([]);

    //######################### public properties - implementation of RowSelector #########################

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null = inject(GRID_PLUGIN_INSTANCES, {optional: true});

    /**
     * @inheritdoc
     */
    public get options(): NoRowSelectorOptions<TSelectedData, TData, TId>
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<NoRowSelectorOptions<TSelectedData, TData, TId>>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options) as NoRowSelectorOptions<TSelectedData, TData, TId>;
    }

    /**
     * @inheritdoc
     */
    public get selectedIds(): Signal<TId[]>
    {
        return this.ɵselectedIds.asReadonly();
    }

    /**
     * @inheritdoc
     */
    public get selectedData(): Signal<TSelectedData[]>
    {
        return this.ɵselectedData.asReadonly();
    }

    //######################### constructor #########################
    constructor(@Inject(ROW_SELECTOR_OPTIONS) @Optional() options?: NoRowSelectorOptions<TSelectedData, TData, TId>)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of RowSelector #########################

    /**
     * @inheritdoc
     */
    public resetSelection(): void
    {
    }

    /**
     * @inheritdoc
     */
    public selectItem(_item: TData, _select: boolean = true): void
    {
    }

    /**
     * @inheritdoc
     */
    public isSelected(_item: TData): boolean
    {
        return false;
    }

    /**
     * @inheritdoc
     */
    public initialize(_force: boolean): void
    {
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}