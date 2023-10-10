import {Component, Input, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional, OnDestroy} from '@angular/core';
import {STRING_LOCALIZATION, StringLocalization} from '@anglr/common';
import {extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {GridPluginInstances} from '../../../components/grid';
import {GRID_PLUGIN_INSTANCES} from '../../../components/grid/types';
import {PagingAbstractComponent} from '../pagingAbstract.component';
import {PAGING_OPTIONS} from '../types';
import {LoadMorePaging, CssClassesLoadMorePaging, LoadMorePagingOptions, LoadMorePagingTexts} from './loadMorePaging.interface';

/**
 * Default options for paging
 * @internal
 */
const defaultOptions: LoadMorePagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    cssClasses:
    {
        containerDiv: 'text-center',
        loadMoreBtn: 'btn btn-primary btn-sm'
    },
    texts:
    {
        loadMoreBtn: 'Load More'
    }
};

/**
 * Paging that uses simple button to load more content
 */
@Component(
{
    selector: 'load-more-paging',
    templateUrl: 'loadMorePaging.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMorePagingComponent  extends PagingAbstractComponent<CssClassesLoadMorePaging, LoadMorePagingOptions> implements LoadMorePaging, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Currently displayed pages
     */
    protected _displayedPages: number = 1;

    /**
     * Number of all items that are paged with current filter criteria
     */
    protected _totalCount: number = 0;

    /**
     * Subscription for changes in texts
     */
    protected _textsChangedSubscription: Subscription;

    //######################### public properties - template bindings #########################

    /**
     * Indication that more items are available
     * @internal
     */
    public moreAvailable: boolean = true;

    /**
     * Object containing available texts
     */
    public texts: LoadMorePagingTexts = {};

    //######################### public properties #########################

    /**
     * Zero based index of first displayed item on page
     */
    public get firstItemIndex(): number
    {
        return 0;
    }

    //######################### public properties - inputs #########################

    /**
     * Gets or sets index of currently selected page - NOT USED
     */
    public page: number;

    /**
     * Gets or sets number of items currently used for paging
     */
    @Input()
    public itemsPerPage: number;

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    @Input()
    public get totalCount(): number
    {
        return this._totalCount;
    }
    public set totalCount(value: number)
    {
        this._totalCount = value;
        this.moreAvailable = (this._displayedPages * this.itemsPerPage) < this._totalCount;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(STRING_LOCALIZATION) protected _stringLocalization: StringLocalization,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: LoadMorePagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public override ngOnDestroy()
    {
        if(this._textsChangedSubscription)
        {
            this._textsChangedSubscription.unsubscribe();
            this._textsChangedSubscription = null;
        }
    }

    //######################### public methods #########################

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public override initialize()
    {
        this._textsChangedSubscription = this._stringLocalization.textsChange.subscribe(() => this._initTexts());

        this._initTexts();
        super.initialize();
    }

    //######################### public methods - template bindings #########################

    /**
     * Loads more data
     * @internal
     */
    public loadMore()
    {
        this._displayedPages++;

        this.page = this._displayedPages;
        this.pageChange.emit(this._displayedPages);
    }

    //######################### protected methods #########################

    /**
     * Initialize texts
     */
    protected _initTexts()
    {
        Object.keys(this.options.texts).forEach(key =>
        {
            this.texts[key] = this._stringLocalization.get(this.options.texts[key]);
        });

        this.changeDetector.detectChanges();
    }
}