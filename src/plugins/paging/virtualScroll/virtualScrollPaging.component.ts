import {Component, Input, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional, forwardRef, OnDestroy} from '@angular/core';
import {Utils, isPresent} from '@anglr/common';

import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from '../../../components/grid/grid.interface';
import {CONTENT_RENDERER, ContentRenderer, BodyContentRenderer, BODY_CONTENT_RENDERER} from '../../contentRenderer';
import {DataLoader, DATA_LOADER, DataResponse} from '../../dataLoader';
import {PagingAbstractComponent} from '../pagingAbstract.component';
import {PAGING_OPTIONS} from '../paging.interface';
import {NoPagingInitializerComponent} from '../plugins/pagingInitializer';
import {VirtualScrollPagingOptions, CssClassesVirtualScrollPaging, VirtualScrollPaging} from './virtualScrollPaging.interface';

/**
 * Default options for paging
 * @internal
 */
const defaultOptions: VirtualScrollPagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    loadOffsetTreshold: 0.75,
    cssClasses:
    {
    },
    pagingInitializer:
    {
        type: forwardRef(() => NoPagingInitializerComponent)
    }
};

/**
 * Paging that uses scrolling to load data
 */
@Component(
{
    selector: 'virtual-scroll-paging',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollPagingComponent extends PagingAbstractComponent<CssClassesVirtualScrollPaging, VirtualScrollPagingOptions> implements VirtualScrollPaging, OnDestroy
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
     * Original style that is restored when paging is destroyed
     */
    protected _originalStyle: {overflowY: string, maxHeight: string};

    /**
     * Indication that data are loading
     */
    protected _loading: boolean = false;

    /**
     * Mutation observer for checking for changes in body
     */
    protected _bodyObserver: MutationObserver;

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
    public set totalCount(value: number)
    {
        this._totalCount = value;
    }
    public get totalCount(): number
    {
        return this._totalCount;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: VirtualScrollPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._originalStyle)
        {
            let contentRenderer: ContentRenderer<any> = this.gridPlugins[CONTENT_RENDERER] as ContentRenderer<any>;
            let element: HTMLElement = contentRenderer.pluginElement.nativeElement;

            element.style.maxHeight = this._originalStyle.maxHeight;
            element.style.overflowY = this._originalStyle.overflowY;
        }

        if(this._bodyObserver)
        {
            this._bodyObserver.disconnect();
            this._bodyObserver = null;
        }
    }

    //######################### public methods #########################

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize()
    {
        let contentRenderer: ContentRenderer<any> = this.gridPlugins[CONTENT_RENDERER] as ContentRenderer<any>;
        let dataLoader: DataLoader<DataResponse<any>> = this.gridPlugins[DATA_LOADER] as DataLoader<DataResponse<any>>;
        let bodyRenderer: BodyContentRenderer<any, any> = this.gridPlugins[BODY_CONTENT_RENDERER] as BodyContentRenderer<any, any>;
        let element: HTMLElement = contentRenderer.pluginElement.nativeElement;

        this._originalStyle =
        {
            maxHeight: element.style.maxHeight,
            overflowY: element.style.overflowY
        };

        element.style.overflowY = "auto";
        
        if(isPresent(this._options.maxHeight))
        {
            element.style.maxHeight = this._options.maxHeight;
        }

        if(dataLoader.result.data.length)
        {
            this._loadData(element);
        }

        element.addEventListener('scroll', () =>
        {
            this._loadData(element);
        });

        this._bodyObserver = new MutationObserver(() =>
        {
            this._loading = false;

            this._loadData(element);
        });

        this._bodyObserver.observe(bodyRenderer.pluginElement.nativeElement,
        {
            childList: true
        });

        super.initialize();
    }

    //######################### public methods - template bindings #########################

    /**
     * Loads more data
     * @internal
     */
    public load()
    {
        this._loading = true;
        this._displayedPages++;

        this.page = this._displayedPages;
        this.pageChange.emit(this._displayedPages);
    }

    //######################### protected methods #########################

    /**
     * Performs loading data if needed
     */
    protected _loadData(element: HTMLElement)
    {
        if(this._loading)
        {
            return;
        }

        let offset = element.scrollTop / (element.scrollHeight - element.clientHeight);

        if(isNaN(offset) || offset >= this._options.loadOffsetTreshold)
        {
            this.load();
        }
    }
}