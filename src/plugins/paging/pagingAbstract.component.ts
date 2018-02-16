import {EventEmitter, ChangeDetectorRef, Injectable, Inject, Optional, Input, Output, OnDestroy, ElementRef} from "@angular/core";
import {Utils} from '@anglr/common';
import {Subscription} from "rxjs/Subscription";

import {PagingOptions, Paging} from "./paging.interface";
import {GridPluginInstances, GRID_PLUGIN_INSTANCES} from "../../components/grid";
import {GridPluginGeneric} from "../../misc";
import {DataLoader, DATA_LOADER, DataResponse} from "../dataLoader";

/**
 * Abstract class that represents any paging component
 */
@Injectable()
export abstract class PagingAbstractComponent<TCssClasses, TOptions extends PagingOptions<TCssClasses>> implements Paging, GridPluginGeneric<TOptions>, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes in data
     */
    private _dataChangedSubscription: Subscription;

    //######################### protected fields #########################

    /**
     * Indication whether is component initialized
     */
    protected _initialized: boolean = false;

    /**
     * Options specific to paging implementation
     */
    protected _options?: TOptions;

    /**
     * Data loader used within grid
     */
    protected _dataLoader?: DataLoader<DataResponse<any>>;

    //######################### public properties #########################

    /**
     * Zero based index of first displayed item on page
     */
    public abstract get firstItemIndex(): number;

    /**
     * Gets or sets options specific to paging implementation
     */
    @Input()
    public set options(options: TOptions)
    {
        this._options = Utils.common.extend(true, this._options, options) as TOptions;

        this.optionsSet();
    }
    public get options(): TOptions
    {
        return this._options;
    }

    /**
     * Gets or sets index of currently selected page
     */
    public abstract set page(page: number);
    public abstract get page(): number;

    /**
     * Gets or sets number of items currently used for paging
     */
    public abstract set itemsPerPage(itemsPerPage: number);
    public abstract get itemsPerPage(): number;

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    public abstract set totalCount(totalCount: number);
    public abstract get totalCount(): number;

    /**
     * Grid plugin instances available for this plugin
     */
    public gridPlugins: GridPluginInstances;

    //######################### public properties - events #########################

    /**
     * Occurs when index of currently selected page has been changed
     */
    @Output()
    public pageChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Occurs when number of items per page currently selected has been changed
     */
    @Output()
    public itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances)
    {
        this.gridPlugins = gridPlugins;
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

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize(): void
    {
        this.page = this._options.initialPage;
        this.itemsPerPage = this._options.initialItemsPerPage;

        let dataLoader: DataLoader<DataResponse<any>> = this.gridPlugins[DATA_LOADER] as DataLoader<DataResponse<any>>;

        if(this._dataLoader && this._dataLoader != dataLoader)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;

            this._dataLoader = null;
        }

        if(!this._dataLoader && dataLoader)
        {
            this._dataLoader = dataLoader;
            this.totalCount = this._dataLoader.result.totalCount;

            this._dataChangedSubscription = this._dataLoader.resultChange.subscribe(() =>
            {
                this.totalCount = this._dataLoader.result.totalCount;
                this.invalidateVisuals();
            });
        }

        this._initialized = true;
    }

    //######################### protected methods #########################

    /**
     * Method called when options are set, allowing to do something after that when overriden
     */
    protected optionsSet()
    {
    }
}