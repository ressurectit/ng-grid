import {Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional, OnDestroy} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {GridPluginInstances, GRID_PLUGIN_INSTANCES, PagingAbstractComponent, PAGING_OPTIONS, CONTENT_RENDERER} from '@anglr/grid';
import {extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {CdkVirtualScrollPagingOptions, CssClassesCdkVirtualScrollPaging, CdkVirtualScrollPaging} from './cdkVirtualScrollPaging.interface';
import {VirtualScrollTableContentRenderer} from '../../contentRenderer';

/**
 * Default options for paging
 * @internal
 */
const defaultOptions: CdkVirtualScrollPagingOptions =
{
    initialItemsPerPage: 25,
    initialPage: 1
};

/**
 * Paging that Angular CDK virtual scroll to load more content
 */
@Component(
{
    selector: 'cdk-virtual-scroll-paging',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdkVirtualScrollPagingComponent extends PagingAbstractComponent<CssClassesCdkVirtualScrollPaging, CdkVirtualScrollPagingOptions> implements CdkVirtualScrollPaging, OnDestroy
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
     * Instance of angular CDK virtual scroll viewport assigned to parent content renderer
     */
    protected _scrollViewport: CdkVirtualScrollViewport;

    /**
     * Subscription for changes of displayed range in cdk virtual scroll viewport
     */
    protected _scrollRangeChangeSubscription: Subscription;

    //######################### public properties - template bindings #########################

    /**
     * Indication that more items are available
     * @internal
     */
    public moreAvailable: boolean = true;

    //######################### public properties #########################

    /**
     * Zero based index of first displayed item on page
     */
    public get firstItemIndex(): number
    {
        return 0;
    }

    /**
     * Gets or sets index of currently selected page - NOT USED
     */
    public page: number;

    /**
     * Gets or sets number of items currently used for paging
     */
    public itemsPerPage: number;

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    public set totalCount(value: number)
    {
        this._totalCount = value;
        this.moreAvailable = (this._displayedPages * this.itemsPerPage) < this._totalCount;
    }
    public get totalCount(): number
    {
        return this._totalCount;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: CdkVirtualScrollPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        super.ngOnDestroy();

        if(this._scrollRangeChangeSubscription)
        {
            this._scrollRangeChangeSubscription.unsubscribe();
            this._scrollRangeChangeSubscription = null;
        }
    }

    //######################### public methods #########################

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize()
    {
        super.initialize();

        let contentRenderer = this.gridPlugins[CONTENT_RENDERER] as VirtualScrollTableContentRenderer<any>;

        if(!contentRenderer || !contentRenderer.scrollViewport)
        {
            throw new Error('It is not possible to use "CdkVirtualScrollPagingComponent" without "VirtualScrollTableContentRenderer"');
        }

        this._scrollViewport = contentRenderer.scrollViewport;

        if(this._scrollRangeChangeSubscription)
        {
            this._scrollRangeChangeSubscription.unsubscribe();
            this._scrollRangeChangeSubscription = null;
        }

        this._scrollRangeChangeSubscription = this._scrollViewport.renderedRangeStream.subscribe(range =>
        {
            let loadedItems = this._scrollViewport.getDataLength();
            let lastDisplayedItem = range.end;

            if(loadedItems === 0)
            {
                return;
            }

            if((lastDisplayedItem / loadedItems) > 0.8)
            {
                this._loadMore();
            }
        });
    }

    //######################### protected methods #########################

    /**
     * Loads more data
     */
    protected _loadMore()
    {
        if(!this.moreAvailable)
        {
            return;
        }

        this._displayedPages++;

        this.page = this._displayedPages;
        this.pageChange.emit(this._displayedPages);
    }
}