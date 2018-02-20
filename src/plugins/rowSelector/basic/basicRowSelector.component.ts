import {Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, Optional, OnDestroy} from "@angular/core";
import {Utils, isBlank} from "@anglr/common";
import {Subscription} from "rxjs/Subscription";

import {GridPluginInstances, GRID_PLUGIN_INSTANCES} from "../../../components/grid";
import {GridPluginGeneric} from "../../../misc";
import {DataLoader, DATA_LOADER} from "../../dataLoader";
import {RowSelector, RowSelectorOptions, ROW_SELECTOR_OPTIONS} from "../rowSelector.interface";

/**
 * Default options for row selector
 */
const defaultOptions: RowSelectorOptions<any, any, any> =
{
    getRowId: null,
    autoResetOnDataChange: false,
    multiSelection: true,
    getRowData: null
};

/**
 * Component used for handling row selection
 */
@Component(
{
    selector: 'ng-basic-row-selector',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicRowSelectorComponent<TSelectedData, TData, TId> implements RowSelector<TSelectedData, TData, TId>, GridPluginGeneric<RowSelectorOptions<TSelectedData, TData, TId>>, OnDestroy
{
    //######################### private fields #########################

    /**
     * Options for grid plugin
     */
    private _options: RowSelectorOptions<TSelectedData, TData, TId>;

    /**
     * Data loader used for loading data
     */
    private _dataLoader: DataLoader<any>;

    /**
     * Subscription for data changes
     */
    private _dataChangedSubscription: Subscription;
    
    //######################### public properties - implementation of RowSelector #########################

    /**
     * Options for grid plugin
     */
    public set options(options: RowSelectorOptions<TSelectedData, TData, TId>)
    {
        this._options = Utils.common.extend(true, this._options, options) as RowSelectorOptions<TSelectedData, TData, TId>;
    }
    public get options(): RowSelectorOptions<TSelectedData, TData, TId>
    {
        return this._options;
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
    public selectedChange?: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) public gridPlugins: GridPluginInstances,
                public pluginElement: ElementRef,
                @Inject(ROW_SELECTOR_OPTIONS) @Optional() options?: RowSelectorOptions<TSelectedData, TData, TId>)
    {
        this._options = Utils.common.extend(true, {}, defaultOptions, options) as RowSelectorOptions<TSelectedData, TData, TId>;
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._dataChangedSubscription)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;
        }
    }

    //######################### public methods - implementation of RowSelector #########################

    /**
     * Resets current selection
     * @param {boolean} emit Indication whether emit selection change
     */
    public resetSelection(emit: boolean = true)
    {
        this.selectedIds = [];
        this.selectedData = [];

        if(emit)
        {
            this.selectedChange.emit();
        }
    }

    /**
     * Adds item to selection (or remove it from selection if deselect is true)
     * @param {TData} item Item that is going to be selected
     * @param {boolean} select Indication whether select specified item, defaults to true
     */
    public selectItem(item: TData, select: boolean = true)
    {
        if(isBlank(this.options.getRowId))
        {
            throw new Error('Missing "getRowId" method in options before first use!');
        }

        if(!this.options.multiSelection)
        {
            this.resetSelection(false);
        }

        let id = this.options.getRowId(item);
        let index;

        //select if not selected
        if((index = this.selectedIds.indexOf(id)) < 0)
        {
            this.selectedIds.push(id);
            this.selectedData.push(this.options.getRowData(item));

            this.selectedChange.emit();
        }
        //remove from selection
        else if(!select)
        {
            this.selectedIds.splice(index, 1);
            this.selectedData.splice(index, 1);
            this.selectedIds = [...this.selectedIds];
            this.selectedData = [...this.selectedData];

            this.selectedChange.emit();
        }
    }

    /**
     * Gets indication whether item is currently selected
     * @param {TData} item Item that is tested for current selection
     */
    public isSelected(item: TData): boolean
    {
        if(isBlank(this.options.getRowId))
        {
            throw new Error('Missing "getRowId" method in options before first use!');
        }

        let id = this.options.getRowId(item);

        return this.selectedIds.indexOf(id) > -1;
    }

    /**
     * Initialize plugin, to be ready to use
     */
    public initialize()
    {
        let dataLoader: DataLoader<any> = this.gridPlugins[DATA_LOADER] as DataLoader<any>;

        if(this._dataLoader && this._dataLoader != dataLoader)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;

            this._dataLoader = null;
        }

        if(!this._dataLoader)
        {
            this._dataLoader = dataLoader;

            this._dataChangedSubscription = this._dataLoader.resultChange.subscribe(() =>
            {
                if(this.options.autoResetOnDataChange)
                {
                    this.resetSelection(false);
                }
            });
        }

        this.initOptions();
    }

    /**
     * Initialize options
     */
    public initOptions()
    {
        if(!this.options.getRowData)
        {
            this.options.getRowData = this.options.getRowId as any;
        }
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
    }
}