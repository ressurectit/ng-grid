import {Injectable, OnDestroy, ElementRef, Injector, inject, Signal, WritableSignal, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {RecursivePartial} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';
import {Subscription, Subject} from 'rxjs';
import {debounceTime, skip} from 'rxjs/operators';

import {Ordering, DataLoader, DataLoaderOptions, GridPlugin, Paging, GridPluginInstances} from '../../interfaces';
import {DataLoaderState, GridPluginType} from '../../misc/enums';
import {GRID_PLUGIN_INSTANCES} from '../../misc/tokens';

/**
 * Abstract class that represents any data loader component
 */
@Injectable()
export abstract class DataLoaderAbstractComponent<TOptions extends DataLoaderOptions = DataLoaderOptions, TOrdering = unknown, TResult = unknown> implements DataLoader<TResult>, GridPlugin<TOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Angular injector used for injecting dependencies
     */
    protected injector: Injector = inject(Injector);

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
    protected ɵstate: WritableSignal<DataLoaderState> = signal(DataLoaderState.NotLoadedYet);

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
     * Ordering plugin storing current ordering
     */
    protected ordering: Ordering<TOrdering>|undefined|null;

    /**
     * Subject for debounce dataCallback
     */
    protected debounceSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Subscription for debounce dataCallback
     */
    protected debounceSubscription: Subscription|undefined|null;

    //######################### public properties #########################

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
    public get state(): Signal<DataLoaderState>
    {
        return this.ɵstate.asReadonly();
    }

    /**
     * @inheritdoc
     */
    public abstract get result(): Signal<TResult>;

    /**
     * @inheritdoc
     */
    public get options(): TOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<TOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
    }

    //######################### constructor #########################
    constructor(defaultOptions: TOptions,
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
    public initialize(force: boolean): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('DataLoaderAbstractComponent: missing gridPlugins!');
        }

        this.registerDebounce();

        const paging: Paging = this.gridPlugins[GridPluginType.Paging] as Paging;

        //paging obtained and its different instance
        if(force || (this.paging && this.paging != paging))
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

            this.pageChangedSubscription = toObservable(this.paging.page, {injector: this.injector})
                .pipe(skip(1))
                .subscribe(() => this.loadData());
            this.itemsPerPageChangedSubscription = toObservable(this.paging.itemsPerPage, {injector: this.injector})
                .pipe(skip(1))
                .subscribe(() => this.loadData());
        }

        const ordering: Ordering<TOrdering> = this.gridPlugins[GridPluginType.Ordering] as Ordering<TOrdering>;

        //ordering obtained and its different instance
        if(force || (this.ordering && this.ordering != ordering))
        {
            this.orderingChangedSubscription?.unsubscribe();
            this.orderingChangedSubscription = null;

            this.ordering = null;
        }

        //no ordering obtained
        if(!this.ordering)
        {
            this.ordering = ordering;

            this.orderingChangedSubscription = toObservable(this.ordering.ordering, {injector: this.injector})
                .pipe(skip(1))
                .subscribe(() => this.loadData());
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
           this.ordering?.ordering != this.lastOrdering)
        {
            this.lastPage = this.paging?.page();
            this.lastItemsPerPage = this.paging?.itemsPerPage();
            this.lastOrdering = this.ordering?.ordering();

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