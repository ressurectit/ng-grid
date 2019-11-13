import {Injectable, Inject, Optional, OnDestroy, EventEmitter, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";
import {Subscription, Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

import {DataLoader, DataLoaderOptions} from './dataLoader.interface';
import {Paging} from "../paging";
import {PAGING} from "../paging/types";
import {ContentRenderer} from "../contentRenderer";
import {CONTENT_RENDERER} from "../contentRenderer/types";
import {GridPluginInstances} from "../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../components/grid/types";
import {GridPluginGeneric} from "../../misc";
import {DataLoaderState} from "./types";

/**
 * Abstract class that represents any data loader component
 */
@Injectable()
export abstract class DataLoaderAbstractComponent<TOptions extends DataLoaderOptions, TOrdering, TResult> implements DataLoader<TResult>, GridPluginGeneric<TOptions>, OnDestroy
{
    //######################### private fields #########################

    /**
     * Last page used for loading data
     */
    private _lastPage: number;

    /**
     * Last items per page used for loading data
     */
    private _lastItemsPerPage: number;

    /**
     * Last ordering used for loading data
     */
    private _lastOrdering: TOrdering;

    //######################### protected fields #########################

    /**
     * Options for 'AsyncDataLoader'
     */
    protected _options: TOptions;

    /**
     * Paging used in grid
     */
    protected _paging: Paging;

    /**
     * Current state of data loader
     */
    protected _state: DataLoaderState = DataLoaderState.NotLoadedYet;

    /**
     * Subscription for page change in paging
     */
    protected _pageChangedSubscription: Subscription;

    /**
     * Subscription for items per page change in paging
     */
    protected _itemsPerPageChangedSubscription: Subscription;

    /**
     * Subscription for ordering change in content renderer
     */
    protected _orderingChangedSubscription: Subscription;

    /**
     * Content renderer used for rendering data
     */
    protected _contentRenderer: ContentRenderer<TOrdering>;

    /**
     * Subject for debounce dataCallback
     */
    protected _debounceSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Subscription for debounce dataCallback
     */
    protected _debounceSubscription: Subscription = null;

    //######################### public properties #########################

    /**
     * Current state of data loader
     */
    public get state(): DataLoaderState
    {
        return this._state;
    }

    /**
     * Gets or sets options for 'DataLoader'
     */
    public set options(options: TOptions)
    {
        this._options = extend(true, this._options, options) as TOptions;
    }
    public get options(): TOptions
    {
        return this._options;
    }

    /**
     * Current result of data loader
     */
    public abstract get result(): TResult;

    /**
     * Indication that data has changed
     */
    public resultChange: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Indication that data loader state has changed
     */
    public stateChange: EventEmitter<void> =  new EventEmitter<void>();

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._debounceSubscription)
        {
            this._debounceSubscription.unsubscribe();
            this._debounceSubscription = null;
        }

        if(this._pageChangedSubscription)
        {
            this._pageChangedSubscription.unsubscribe();
            this._pageChangedSubscription = null;
        }

        if(this._itemsPerPageChangedSubscription)
        {
            this._itemsPerPageChangedSubscription.unsubscribe();
            this._itemsPerPageChangedSubscription = null;
        }

        if(this._orderingChangedSubscription)
        {
            this._orderingChangedSubscription.unsubscribe();
            this._orderingChangedSubscription = null;
        }
    }

    //######################### public methodes - implements DataLoader #########################

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
        this._registerDebounce();

        let paging: Paging = this.gridPlugins[PAGING] as Paging;

        if(this._paging && this._paging != paging)
        {
            this._pageChangedSubscription.unsubscribe();
            this._pageChangedSubscription = null;
            this._itemsPerPageChangedSubscription.unsubscribe();
            this._itemsPerPageChangedSubscription = null;

            this._paging = null;
        }

        if(!this._paging)
        {
            this._paging = paging;

            this._pageChangedSubscription = this._paging.pageChange.subscribe(() => this._debounceSubject.next());
            this._itemsPerPageChangedSubscription = this._paging.itemsPerPageChange.subscribe(() => this._debounceSubject.next());
        }

        let contentRenderer: ContentRenderer<TOrdering> = this.gridPlugins[CONTENT_RENDERER] as ContentRenderer<TOrdering>;

        if(this._contentRenderer && this._contentRenderer != contentRenderer)
        {
            this._orderingChangedSubscription.unsubscribe();
            this._orderingChangedSubscription = null;

            this._contentRenderer = null;
        }

        if(!this._contentRenderer)
        {
            this._contentRenderer = contentRenderer;

            this._orderingChangedSubscription = this._contentRenderer.orderingChange.subscribe(() => this._debounceSubject.next());
        }

        if(this._options.autoLoadData)
        {
            this.loadData();
        }
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions()
    {

    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals()
    {
    }

    /**
     * Loads data from 'source'
     * @param force Indication that data should be reloaded even if nothing changed
     */
    public loadData(force?: boolean)
    {
        this._debounceSubject.next(force);
    }

    //######################### protected methods #########################

    /**
     * Loads data from 'source'
     * @param force Indication that data should be reloaded even if nothing changed
     */
    protected abstract _loadData(force?: boolean);

    /**
     * Check for changes on input
     */
    protected _checkChanges(): boolean
    {
        if(this._paging.page != this._lastPage ||
           this._paging.itemsPerPage != this._lastItemsPerPage ||
           this._contentRenderer.ordering != this._lastOrdering)
        {
            this._lastPage = this._paging.page;
            this._lastItemsPerPage = this._paging.itemsPerPage;
            this._lastOrdering = this._contentRenderer.ordering;

            return true;
        }

        return false;
    }

    //######################### private methods #########################

    /**
     * Registers debounce subject
     */
    private _registerDebounce()
    {
        if(this._debounceSubscription)
        {
            this._debounceSubscription.unsubscribe();
            this._debounceSubscription = null;
        }

        this._debounceSubscription = this._debounceSubject
            .asObservable()
            .pipe(debounceTime(this._options.debounceDataCallback))
            .subscribe(force => this._loadData(force));
    }
}