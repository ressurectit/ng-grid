import {Injectable, OnDestroy, ElementRef} from '@angular/core';
import {extend} from '@jscrpt/common';
import {Subscription, Subject, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {ContentRenderer, DataLoader, DataLoaderOptions, GridPlugin, Paging} from '../../interfaces';
import {DataLoaderState, GridPluginType} from '../../misc/enums';
import {GridPluginInstances} from '../../misc/types';

/**
 * Abstract class that represents any data loader component
 */
@Injectable()
export abstract class DataLoaderAbstractComponent<TOptions extends DataLoaderOptions = DataLoaderOptions, TOrdering = unknown, TResult = unknown> implements DataLoader<TResult>, GridPlugin<TOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Last page used for loading data
     */
    protected lastPage: number|undefined|null;

    /**
     * Last items per page used for loading data
     */
    protected lastItemsPerPage: number|undefined|null;

    /**
     * Last ordering used for loading data
     */
    protected lastOrdering: TOrdering|undefined|null;

    /**
     * Options for 'AsyncDataLoader'
     */
    protected ɵoptions: TOptions;

    /**
     * Paging used in grid
     */
    protected paging: Paging|undefined|null;

    /**
     * Current state of data loader
     */
    protected ɵstate: DataLoaderState = DataLoaderState.NotLoadedYet;

    /**
     * Subscription for page change in paging
     */
    protected pageChangedSubscription: Subscription|undefined|null;

    /**
     * Subscription for items per page change in paging
     */
    protected itemsPerPageChangedSubscription: Subscription|undefined|null;

    /**
     * Subscription for ordering change in content renderer
     */
    protected orderingChangedSubscription: Subscription|undefined|null;

    /**
     * Content renderer used for rendering data
     */
    protected contentRenderer: ContentRenderer<TOrdering>|undefined|null;

    /**
     * Subject for debounce dataCallback
     */
    protected debounceSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Subject used for emitting changes in result
     */
    protected resultChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Subject used for emitting changes in state
     */
    protected stateChangeSubject: Subject<void> =  new Subject<void>();

    /**
     * Subscription for debounce dataCallback
     */
    protected debounceSubscription: Subscription|undefined|null;

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get state(): DataLoaderState
    {
        return this.ɵstate;
    }

    /**
     * @inheritdoc
     */
    public get options(): TOptions
    {
        return this.ɵoptions;
    }
    public set options(options: TOptions)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
    }

    /**
     * @inheritdoc
     */
    public abstract get result(): TResult;

    /**
     * @inheritdoc
     */
    public get resultChange(): Observable<void>
    {
        return this.resultChangeSubject.asObservable();
    }

    /**
     * @inheritdoc
     */
    public get stateChange(): Observable<void>
    {
        return this.stateChangeSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef<HTMLElement>,
                public gridPlugins: GridPluginInstances|undefined|null,
                defaultOptions: TOptions,
                options?: TOptions,)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.debounceSubscription?.unsubscribe();
        this.debounceSubscription = null;

        this.pageChangedSubscription?.unsubscribe();
        this.pageChangedSubscription = null;

        this.itemsPerPageChangedSubscription?.unsubscribe();
        this.itemsPerPageChangedSubscription = null;

        this.orderingChangedSubscription?.unsubscribe();
        this.orderingChangedSubscription = null;
    }

    //######################### public methodes - implements DataLoader #########################

    /**
     * @inheritdoc
     */
    public initialize(): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('DataLoaderAbstractComponent: missing gridPlugins!');
        }

        this.registerDebounce();

        const paging: Paging = this.gridPlugins[GridPluginType.Paging] as Paging;

        //paging obtained and its different instance
        if(this.paging && this.paging != paging)
        {
            this.pageChangedSubscription?.unsubscribe();
            this.pageChangedSubscription = null;
            this.itemsPerPageChangedSubscription?.unsubscribe();
            this.itemsPerPageChangedSubscription = null;

            this.paging = null;
        }

        //no paging obtained
        if(!this.paging)
        {
            this.paging = paging;

            this.pageChangedSubscription = this.paging.pageChange.subscribe(() => this.debounceSubject.next(false));
            this.itemsPerPageChangedSubscription = this.paging.itemsPerPageChange.subscribe(() => this.debounceSubject.next(false));
        }

        const contentRenderer: ContentRenderer<TOrdering> = this.gridPlugins[GridPluginType.ContentRenderer] as ContentRenderer<TOrdering>;

        //content renderer obtained and its different instance
        if(this.contentRenderer && this.contentRenderer != contentRenderer)
        {
            this.orderingChangedSubscription?.unsubscribe();
            this.orderingChangedSubscription = null;

            this.contentRenderer = null;
        }

        //no content renderer obtained
        if(!this.contentRenderer)
        {
            this.contentRenderer = contentRenderer;

            this.orderingChangedSubscription = this.contentRenderer.orderingChange.subscribe(() => this.debounceSubject.next(false));
        }

        if(this.options.autoLoadData)
        {
            this.loadData();
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

    /**
     * @inheritdoc
     */
    public loadData(force?: boolean): void
    {
        this.debounceSubject.next(!!force);
    }

    //######################### protected methods #########################

    /**
     * Loads data from 'source'
     * @param force - Indication that data should be reloaded even if nothing changed
     */
    protected abstract loadGridData(force?: boolean): void;

    /**
     * Check for changes on input
     */
    protected checkChanges(): boolean
    {
        if(this.paging?.page != this.lastPage ||
           this.paging?.itemsPerPage != this.lastItemsPerPage ||
           this.contentRenderer?.ordering != this.lastOrdering)
        {
            this.lastPage = this.paging?.page;
            this.lastItemsPerPage = this.paging?.itemsPerPage;
            this.lastOrdering = this.contentRenderer?.ordering;

            return true;
        }

        return false;
    }

    //######################### protected methods #########################

    /**
     * Registers debounce subject
     */
    protected registerDebounce(): void
    {
        this.debounceSubscription?.unsubscribe();
        this.debounceSubscription = null;

        this.debounceSubscription = this.debounceSubject
            .asObservable()
            .pipe(debounceTime(this.options.debounceDataCallback))
            .subscribe(force => this.loadGridData(force));
    }
}