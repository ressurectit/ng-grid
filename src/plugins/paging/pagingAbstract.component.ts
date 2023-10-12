import {ChangeDetectorRef, Injectable, Input, Output, OnDestroy, ElementRef} from '@angular/core';
import {RecursivePartial, extend, isPresent} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import {DataLoader, DataResponse, GridInitializer, GridPlugin, Paging, PagingOptions} from '../../interfaces';
import {GridPluginInstances} from '../../misc/types';
import {GridPluginType} from '../../misc/enums';

/**
 * Abstract class that represents any paging component
 */
@Injectable()
export abstract class PagingAbstractComponent<TCssClasses = unknown, TOptions extends PagingOptions<TCssClasses> = PagingOptions<TCssClasses>> implements Paging, GridPlugin<TOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscription for changes in data
     */
    protected dataChangedSubscription: Subscription|undefined|null;

    /**
     * Indication whether is component initialized
     */
    protected initialized: boolean = false;

    /**
     * Options specific to paging implementation
     */
    protected ɵoptions: TOptions;

    /**
     * Data loader used within grid
     */
    protected dataLoader?: DataLoader<DataResponse>|undefined|null;

    /**
     * Subject used for emitting changes in page
     */
    protected pageChangeSubject: Subject<number> = new Subject<number>();

    /**
     * Subject used for emitting changes in items per page
     */
    protected itemsPerPageChangeSubject: Subject<number> = new Subject<number>();

    //######################### public properties - implementation of Paging #########################

    /**
     * @inheritdoc
     */
    public abstract get firstItemIndex(): number;

    /**
     * @inheritdoc
     */
    @Input()
    public get options(): TOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<TOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);

        this.optionsSet();
    }

    /**
     * @inheritdoc
     */
    public abstract get page(): number;
    public abstract set page(page: number);

    /**
     * @inheritdoc
     */
    public abstract get itemsPerPage(): number;
    public abstract set itemsPerPage(itemsPerPage: number);

    /**
     * @inheritdoc
     */
    public abstract get totalCount(): number;
    public abstract set totalCount(totalCount: number);

    //######################### public properties - events #########################

    /**
     * @inheritdoc
     */
    @Output()
    public get pageChange(): Observable<number>
    {
        return this.pageChangeSubject.asObservable();
    }

    /**
     * @inheritdoc
     */
    @Output()
    public get itemsPerPageChange(): Observable<number>
    {
        return this.itemsPerPageChangeSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                protected changeDetector: ChangeDetectorRef,
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
        this.dataChangedSubscription?.unsubscribe();
        this.dataChangedSubscription = null;
    }

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.detectChanges();
    }

    /**
     * @inheritdoc
     */
    public async initialize(force: boolean): Promise<void>
    {
        if(!this.gridPlugins)
        {
            throw new Error('PagingAbstractComponent: missing gridPlugins!');
        }

        const gridInitializer = this.gridPlugins[GridPluginType.GridInitializer] as GridInitializer;
        let initialPage = this.ɵoptions.initialPage;
        let initialItemsPerPage = this.ɵoptions.initialItemsPerPage;

        if(gridInitializer)
        {
            await gridInitializer.initialize(force);

            const page = await gridInitializer.getPage();

            if(isPresent(page))
            {
                initialPage = page;
            }

            const itemsPerPage = await gridInitializer.getItemsPerPage();

            if(isPresent(itemsPerPage))
            {
                initialItemsPerPage = itemsPerPage;
            }
        }

        this.page = initialPage;
        this.itemsPerPage = initialItemsPerPage;

        const dataLoader: DataLoader<DataResponse> = this.gridPlugins[GridPluginType.DataLoader] as DataLoader<DataResponse>;

        //data loader obtained and its different instance
        if(force || (this.dataLoader && this.dataLoader != dataLoader))
        {
            this.dataChangedSubscription?.unsubscribe();
            this.dataChangedSubscription = null;

            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader && dataLoader)
        {
            this.dataLoader = dataLoader;
            this.totalCount = this.dataLoader.result.totalCount;

            this.dataChangedSubscription = this.dataLoader.resultChange.subscribe(() =>
            {
                this.totalCount = this.dataLoader?.result.totalCount ?? 0;
                this.invalidateVisuals();
            });
        }

        this.initialized = true;
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Method called when options are set, allowing to do something after that when overriden
     */
    protected optionsSet(): void
    {
    }
}