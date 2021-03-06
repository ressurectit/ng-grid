import {EventEmitter, ChangeDetectorRef, Injectable, Inject, Optional, Input, Output, OnDestroy, ElementRef} from "@angular/core";
import {extend, isPresent} from '@jscrpt/common';
import {Subscription} from "rxjs";

import {PagingOptions, Paging} from "./paging.interface";
import {GridPluginInstances} from "../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../components/grid/types";
import {GridPluginGeneric} from "../../misc";
import {DataLoader, DataResponse} from "../dataLoader";
import {DATA_LOADER} from "../dataLoader/types";
import {GridInitializer} from "../gridInitializer";
import {GRID_INITIALIZER} from "../gridInitializer/types";

/**
 * Abstract class that represents any paging component
 */
@Injectable()
export abstract class PagingAbstractComponent<TCssClasses = any, TOptions extends PagingOptions<TCssClasses> = any> implements Paging, GridPluginGeneric<TOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscription for changes in data
     */
    protected _dataChangedSubscription: Subscription;

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
    protected _dataLoader?: DataLoader<DataResponse>;

    //######################### public properties #########################

    /**
     * Zero based index of first displayed item on page
     */
    public abstract get firstItemIndex(): number;

    /**
     * Gets or sets options specific to paging implementation
     */
    @Input()
    public get options(): TOptions
    {
        return this._options;
    }
    public set options(options: TOptions)
    {
        this._options = extend(true, this._options, options) as TOptions;

        this.optionsSet();
    }

    /**
     * Gets or sets index of currently selected page
     */
    public abstract get page(): number;
    public abstract set page(page: number);

    /**
     * Gets or sets number of items currently used for paging
     */
    public abstract get itemsPerPage(): number;
    public abstract set itemsPerPage(itemsPerPage: number);

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    public abstract get totalCount(): number;
    public abstract set totalCount(totalCount: number);

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
        let gridInitializer = this.gridPlugins[GRID_INITIALIZER] as GridInitializer;
        let initialPage = this._options.initialPage;
        let initialItemsPerPage = this._options.initialItemsPerPage;

        if(gridInitializer)
        {
            gridInitializer.initialize();

            let page = gridInitializer.getPage();

            if(isPresent(page))
            {
                initialPage = page;
            }

            let itemsPerPage = gridInitializer.getItemsPerPage();

            if(isPresent(itemsPerPage))
            {
                initialItemsPerPage = itemsPerPage;
            }
        }

        this.page = initialPage
        this.itemsPerPage = initialItemsPerPage;

        let dataLoader: DataLoader<DataResponse> = this.gridPlugins[DATA_LOADER] as DataLoader<DataResponse>;

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

    /**
     * Initialize options
     */
    public initOptions()
    {
    }

    //######################### protected methods #########################

    /**
     * Method called when options are set, allowing to do something after that when overriden
     */
    protected optionsSet()
    {
    }
}