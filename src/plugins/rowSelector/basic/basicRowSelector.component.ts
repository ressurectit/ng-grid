import {Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, Optional, OnDestroy} from "@angular/core";
import {extend, isBlank} from "@jscrpt/common";
import {Subscription} from "rxjs";

import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {GridPluginGeneric} from "../../../misc";
import {DataLoader} from "../../dataLoader";
import {DATA_LOADER} from "../../dataLoader/types";
import {ROW_SELECTOR_OPTIONS} from "../types";
import {BasicRowSelectorOptions, BasicRowSelector} from "./basicRowSelector.interface";

/**
 * Default options for row selector
 * @internal
 */
const defaultOptions: BasicRowSelectorOptions<any, any, any> =
{
    getRowId: null,
    autoResetOnDataChange: false,
    multiSelection: true,
    getRowData: null
};

/**
 * Component used for handling row selection
 *
 * This component requires `ContentRenderer` which supports row selection, one possible use is with `TableContentRendererComponent` with `AdvancedTableBodyContentRendererComponent`, any
 * other `ContentRenderer` that supports row selection can be used
 *
 * Working with `BasicRowSelectorComponent` from code should be done using extensions methods
 *
 * If you want to use row selection you must provide at least `getRowId`, you can use `getRowData` for obtaining selected data in requested format see below example:
 * 
 * ``` typescript
 * var gridOptions =
 * {
 *     plugins:
 *     {
 *         contentRenderer:
 *         {
 *             options: <TableContentRendererOptions>
 *             {
 *                 plugins:
 *                 {
 *                     bodyRenderer:
 *                     {
 *                         type: AdvancedTableBodyContentRendererComponent
 *                     }
 *                 }
 *             }
 *         },
 *         rowSelector:
 *         {
 *             options: <RowSelectorOptions<SelectedDataType, DataType, string>>
 *             {
 *                 getRowId: item => item.uuid,
 *                 getRowData: item =>
 *                 {
 *                     return {
 *                         uuid: item.uuid,
 *                         myNumber: item.myNumber,
 *                         myString: item.myString
 *                     };
 *                 }
 *             }
 *         }
 *     }
 * };
 * ```
 *
 * Example usage with `AdvancedTableBodyContentRendererComponent`
 * 
 * ``` html
 * <ng-grid #grid [gridOptions]="gridOptions">
 *     <basic-table-metadata>
 *         <basic-table-column id="uuid" name="uuid" title="Id"></basic-table-column>
 *         <basic-table-column id="myNumber" name="myNumber" title="Number value"></basic-table-column>
 *         <basic-table-column id="myString" name="myString" title="String value"></basic-table-column>
 *
 *         <basic-table-column id="rowSelection" name="rowSelection" title="Row selection">
 *             <!-- selection of all rows in header -->
 *             <ng-template #headerTemplate>
 *                 <input type="checkbox" (click)="toggleAllSelected($event.target.checked, $event)" [checked]="selectedAll">
 *             </ng-template>
 *
 *             <!-- selection of single row -->
 *             <ng-template #bodyTemplate let-item let-rowSelector="rowSelector" let-isSelected="isSelected">
 *                 <input type="checkbox" (click)="rowSelector.selectItem(item, $event.target.checked)" [checked]="isSelected">
 *             </ng-template>
 *         </basic-table-column>
 *     </basic-table-metadata>
 * </ng-grid>
 * ```
 *
 * Selecting all items in code
 * 
 * ``` typescript
 * public selectedAll: boolean = false;
 * 
 * (at)ViewChild('grid')
 * public grid: GridComponent;
 * 
 * public ngAfterViewInit()
 * {
 *     this._setSelectedFlags();
 *
 *     let dataLoader = this.grid.getPlugin<DataLoader<DataResponse<any>>>(DATA_LOADER);
 *     let rowSelector = this.grid.getPlugin<RowSelector<any, any, any>>(ROW_SELECTOR);
 *
 *     rowSelector.selectedChange.subscribe(() => this._setSelectedFlags());
 *     dataLoader.resultChange.subscribe(() => this._setSelectedFlags());
 * }
 *
 * public toggleAllSelected(value: boolean)
 * {
 *     this.grid.execute(selectAllOnPage(value));
 * }
 *
 * private _setSelectedFlags()
 * {
 *     this.selectedAll = this.grid.executeAndReturn(areSelectedAllOnPage());
 *
 *     this._changeDetector.detectChanges();
 * }
 * ```
 */
@Component(
{
    selector: 'ng-basic-row-selector',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicRowSelectorComponent<TSelectedData, TData, TId> implements BasicRowSelector<TSelectedData, TData, TId>, GridPluginGeneric<BasicRowSelectorOptions<TSelectedData, TData, TId>>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected _options: BasicRowSelectorOptions<TSelectedData, TData, TId>;

    /**
     * Data loader used for loading data
     */
    protected _dataLoader: DataLoader<any>;

    /**
     * Subscription for data changes
     */
    protected _dataChangedSubscription: Subscription;

    //######################### public properties - implementation of RowSelector #########################

    /**
     * Options for grid plugin
     */
    public set options(options: BasicRowSelectorOptions<TSelectedData, TData, TId>)
    {
        this._options = extend(true, this._options, options) as BasicRowSelectorOptions<TSelectedData, TData, TId>;
    }
    public get options(): BasicRowSelectorOptions<TSelectedData, TData, TId>
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
    constructor(@Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances,
                public pluginElement: ElementRef,
                @Inject(ROW_SELECTOR_OPTIONS) @Optional() options?: BasicRowSelectorOptions<TSelectedData, TData, TId>)
    {
        this._options = extend(true, {}, defaultOptions, options) as BasicRowSelectorOptions<TSelectedData, TData, TId>;
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
     * @param emit Indication whether emit selection change
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
     * @param item Item that is going to be selected
     * @param select Indication whether select specified item, defaults to true
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
        let index = this.selectedIds.indexOf(id);

        //select if not selected
        if(select && index < 0)
        {
            this.selectedIds.push(id);
            this.selectedData.push(this.options.getRowData(item));

            this.selectedChange.emit();
        }
        //remove from selection if selected
        else if(!select && index >= 0)
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
     * @param item Item that is tested for current selection
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
     * Initialize plugin, to be ready to use, initialize communication with other plugins
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
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
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