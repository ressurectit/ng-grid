import {Component, ChangeDetectionStrategy, ElementRef, Inject, Optional, OnDestroy} from '@angular/core';
import {RecursivePartial, extend, isBlank} from '@jscrpt/common';
import {Subscription, Observable, Subject} from 'rxjs';

import {BasicRowSelectorOptions, BasicRowSelector} from './basicRowSelector.interface';
import {DataLoader, GridPlugin} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, ROW_SELECTOR_OPTIONS} from '../../../misc/tokens';
import {GridPluginInstances} from '../../../misc/types';
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
     * Subject used for emitting selected change
     */
    protected selectedChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties - implementation of RowSelector #########################

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
     * Array of currently selected row ids
     */
    public selectedIds: TId[] = [];

    /**
     * Array of currently selected row data
     */
    public selectedData: TSelectedData[] = [];

    /**
     * Occurs when selection has changed
     */
    public get selectedChange(): Observable<void>
    {
        return this.selectedChangeSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances|undefined|null,
                public pluginElement: ElementRef,
                @Inject(ROW_SELECTOR_OPTIONS) @Optional() options?: BasicRowSelectorOptions<TSelectedData, TData, TId>)
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
    public resetSelection(emit: boolean = true): void
    {
        this.selectedIds = [];
        this.selectedData = [];

        if(emit)
        {
            this.selectedChangeSubject.next();
        }
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
            this.resetSelection(false);
        }

        const id = this.options.getRowId(item);
        const index = this.selectedIds.indexOf(id);

        //select if not selected
        if(select && index < 0)
        {
            this.selectedIds.push(id);
            this.selectedData.push(this.options.getRowData(item));

            this.selectedChangeSubject.next();
        }
        //remove from selection if selected
        else if(!select && index >= 0)
        {
            this.selectedIds.splice(index, 1);
            this.selectedData.splice(index, 1);
            this.selectedIds = [...this.selectedIds];
            this.selectedData = [...this.selectedData];

            this.selectedChangeSubject.next();
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

        return this.selectedIds.indexOf(id) > -1;
    }

    /**
     * @inheritdoc
     */
    public initialize(): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('BasicRowSelectorSAComponent: missing gridPlugins!');
        }

        const dataLoader: DataLoader = this.gridPlugins[GridPluginType.DataLoader] as DataLoader;

        //data loader obtained and its different instance
        if(this.dataLoader && this.dataLoader != dataLoader)
        {
            this.dataChangedSubscription?.unsubscribe();
            this.dataChangedSubscription = null;

            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader)
        {
            this.dataLoader = dataLoader;

            this.dataChangedSubscription = this.dataLoader.resultChange.subscribe(() =>
            {
                if(this.options.autoResetOnDataChange)
                {
                    this.resetSelection(false);
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