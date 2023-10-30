import {Component, ChangeDetectionStrategy, ElementRef, Inject, Optional, OnDestroy, WritableSignal, signal, Signal, inject, Injector} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {RecursivePartial, extend, isBlank} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {BasicRowSelectorOptions, BasicRowSelector} from './basicRowSelector.interface';
import {DataLoader, GridPlugin, GridPluginInstances} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, ROW_SELECTOR_OPTIONS} from '../../../misc/tokens';
import {GridPluginType} from '../../../misc/enums';

/**
 * Default options for row selector
 */
const defaultOptions: BasicRowSelectorOptions =
{
    getRowId: null,
    autoResetOnDataChange: false,
    multiSelection: true,
    getRowData: data => data
};

/**
 * Component used for handling row selection
 *
 * This component requires `ContentRenderer` which supports row selection, one possible use is with `TableContentRendererComponent` with `AdvancedTableBodyContentRendererComponent`, any
 * other `ContentRenderer` that supports row selection can be used
 *
 * Working with `BasicRowSelectorComponent` from code should be done using extensions methods
 */
@Component(
{
    selector: 'ng-basic-row-selector',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicRowSelectorSAComponent<TSelectedData = unknown, TData = unknown, TId = unknown> implements BasicRowSelector<TSelectedData, TData, TId>, GridPlugin<BasicRowSelectorOptions<TSelectedData, TData, TId>>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected ɵoptions: BasicRowSelectorOptions<TSelectedData, TData, TId>;

    /**
     * Data loader used for loading data
     */
    protected dataLoader: DataLoader|undefined|null;

    /**
     * Subscription for data changes
     */
    protected dataChangedSubscription: Subscription|undefined|null;

    /**
     * Array of currently selected row ids
     */
    protected ɵselectedIds: WritableSignal<TId[]> = signal([]);

    /**
     * Array of currently selected row data
     */
    protected ɵselectedData: WritableSignal<TSelectedData[]> = signal([]);

    /**
     * Angular injector used for injecting dependencies
     */
    protected injector: Injector = inject(Injector);

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
    public get options(): BasicRowSelectorOptions<TSelectedData, TData, TId>
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<BasicRowSelectorOptions<TSelectedData, TData, TId>>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options) as BasicRowSelectorOptions<TSelectedData, TData, TId>;
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
    constructor(@Inject(ROW_SELECTOR_OPTIONS) @Optional() options?: BasicRowSelectorOptions<TSelectedData, TData, TId>)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.dataChangedSubscription?.unsubscribe();
        this.dataChangedSubscription = null;
    }

    //######################### public methods - implementation of RowSelector #########################

    /**
     * @inheritdoc
     */
    public resetSelection(): void
    {
        this.ɵselectedIds.set([]);
        this.ɵselectedData.set([]);
    }

    /**
     * @inheritdoc
     */
    public selectItem(item: TData, select: boolean = true): void
    {
        if(isBlank(this.options.getRowId))
        {
            throw new Error('BasicRowSelectorSAComponent: Missing "getRowId" method in options before first use!');
        }

        if(!this.options.multiSelection)
        {
            this.resetSelection();
        }

        const id = this.options.getRowId(item);
        const index = this.selectedIds().indexOf(id);

        //select if not selected
        if(select && index < 0)
        {
            this.ɵselectedIds.update(ids => [...ids, id]);
            this.ɵselectedData.update(data => [...data, this.options.getRowData(item)]);
        }
        //remove from selection if selected
        else if(!select && index >= 0)
        {
            this.ɵselectedIds.update(ids =>
            {
                ids.splice(index, 1);

                return [...ids];
            });

            this.ɵselectedData.update(data =>
            {
                data.splice(index, 1);

                return [...data];
            });
        }
    }

    /**
     * @inheritdoc
     */
    public isSelected(item: TData): boolean
    {
        if(isBlank(this.options.getRowId))
        {
            throw new Error('BasicRowSelectorSAComponent: Missing "getRowId" method in options before first use!');
        }

        const id = this.options.getRowId(item);

        return this.selectedIds().indexOf(id) > -1;
    }

    /**
     * @inheritdoc
     */
    public initialize(force: boolean): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('BasicRowSelectorSAComponent: missing gridPlugins!');
        }

        const dataLoader: DataLoader = this.gridPlugins[GridPluginType.DataLoader] as DataLoader;

        //data loader obtained and its different instance
        if(force || (this.dataLoader && this.dataLoader != dataLoader))
        {
            this.dataChangedSubscription?.unsubscribe();
            this.dataChangedSubscription = null;

            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader)
        {
            this.dataLoader = dataLoader;

            this.dataChangedSubscription = toObservable(this.dataLoader.result, {injector: this.injector}).subscribe(() =>
            {
                if(this.options.autoResetOnDataChange)
                {
                    this.resetSelection();
                }
            });
        }
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