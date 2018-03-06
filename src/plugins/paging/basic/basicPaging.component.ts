import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, ElementRef, forwardRef} from '@angular/core';
import {Paginator, isPresent, Utils} from '@anglr/common';

import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from '../../../components/grid';
import {PagingAbstractComponent} from '../pagingAbstract.component';
import {BasicPagingOptions, BasicPaging, CssClassesBasicPaging} from './basicPaging.interface';
import {PAGING_OPTIONS, PAGING_INITIALIZER, PagingInitializer} from '../paging.interface';
import {NoPagingInitializerComponent} from '../plugins/pagingInitializer';

/**
 * Items per page single item
 */
export class ItemsPerPageItem
{
    /**
     * Indication that item is active
     */
    public isActive: boolean;

    /**
     * Value of item
     */
    public value: number;
}

/**
 * Default options for paging
 */
const defaultOptions: BasicPagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    itemsPerPageValues: [],
    pagesDispersion: 4,
    cssClasses:
    {
        pagingUl: "pagination pagination-sm margin-sm-vertical",
        itemsPerPageDiv: "pull-right",
        displayedItemsCountSpan: "items-count",
        itemsPerPageUl: "pagination pagination-sm margin-sm-vertical"
    },
    pagingInitializer:
    {
        type: forwardRef(() => NoPagingInitializerComponent)
    }
};

/**
 * Component used for rendering basic simple paging
 */
@Component(
{
    selector: "ng-basic-paging",
    templateUrl: 'basicPaging.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.items-count
        {
            float: left;
            margin-right: 8px;
            line-height: 42px;
        }
        .pointer-cursor
        {
            cursor: pointer;
        }`
    ]
})
export class BasicPagingComponent extends PagingAbstractComponent<CssClassesBasicPaging, BasicPagingOptions> implements BasicPaging
{
    //######################### protected fields #########################

    /**
     * Paginator used for getting page numbers
     */
    protected _paginator: Paginator = new Paginator();

    /**
     * Index of currently selected page
     */
    protected _page: number;

    /**
     * Number of items currently used for paging
     */
    protected _itemsPerPage: number;

    /**
     * Number of all items that are paged with current filter criteria
     */
    protected _totalCount: number;

    //######################### public properties - template bindings #########################

    /**
     * Text displaying items count
     * @internal
     */
    public displayedItemsCount: string = "";

    /**
     * Array of pages that are rendered
     * @internal
     */
    public pages: {isActive: boolean; isDisabled: boolean; title: string; page: number}[] = [];

    /**
     * Array of items per page that are rendered
     * @internal
     */
    public itemsPerPageItems: ItemsPerPageItem[] = [];

    //######################### public properties #########################

    /**
     * Zero based index of first displayed item on page
     */
    public get firstItemIndex(): number
    {
        let offset = this._paginator.getOffset();

        return isNaN(offset) ? 0 : offset;
    }

    //######################### public properties - inputs #########################

    /**
     * Gets or sets index of currently selected page
     */
    @Input()
    public set page(page: number)
    {
        this._page = page;
        this._paginator.setPage(page);
        this._generatePages();
        this._setDisplayedItemsCount();
        (this.gridPlugins[PAGING_INITIALIZER] as PagingInitializer).setPage(this._page);
    }
    public get page(): number
    {
        return this._page;
    }

    /**
     * Gets or sets number of items currently used for paging
     */
    @Input()
    public set itemsPerPage(itemsPerPage: number)
    {
        this._itemsPerPage = itemsPerPage;
        this._paginator.setItemsPerPage(itemsPerPage);
        this._generatePages();
        this._generateItemsPerPage();
        this._setDisplayedItemsCount();
        (this.gridPlugins[PAGING_INITIALIZER] as PagingInitializer).setItemsPerPage(this._itemsPerPage);
    }
    public get itemsPerPage(): number
    {
        return this._itemsPerPage;
    }

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    @Input()
    public set totalCount(totalCount: number)
    {
        this._totalCount = totalCount;
        this._paginator.setItemCount(totalCount);
        this._generatePages();
        this._setDisplayedItemsCount();
    }
    public get totalCount(): number
    {
        return this._totalCount;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: BasicPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
        this.initOptions();
    }

    //######################### public methods - template bindings #########################

    /**
     * Sets page for current paging
     * @param  {number} page Page index to be set
     * @internal
     */
    public setPage(page: {isActive: boolean; isDisabled: boolean; page: number})
    {
        if(page.isActive || page.isDisabled)
        {
            return;
        }

        this.page = page.page;
        this.pageChange.emit(this.page);
    }

    /**
     * Sets items per page for current paging
     * @param  {ItemsPerPageItem} itemsPerPage Number of items per page
     * @internal
     */
    public setItemsPerPage(itemsPerPage: ItemsPerPageItem)
    {
        if(itemsPerPage.isActive)
        {
            return;
        }

        this.itemsPerPage = itemsPerPage.value;
        this.itemsPerPageChange.emit(this.itemsPerPage);
    }

    /**
     * Converts number to text that is going to be rendered for ItemsPerPage
     * @param  {number} value
     * @internal
     */
    public renderItemsPerPageText(value: number): string
    {
        return isNaN(value) ? "&infin;" : value.toString();
    }

    //######################### public properties #########################

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize()
    {
        super.initialize();

        this._paginator.setPage(this._page);
        this._paginator.setItemsPerPage(this._itemsPerPage);
    }

    //######################### protected methods #########################

    /**
     * Generates rendered pages
     */
    protected _generatePages()
    {
        if(!this._initialized)
        {
            return;
        }

        var pageCount = this._paginator.getPageCount() || 1;

        //Applied when displaying all items
        if(isNaN(pageCount))
        {
            if(this._page != 1)
            {
                this._page = 1;
                this._paginator.setPage(1);
                this.pageChange.emit(1);
            }

            this.pages = [];

            return;
        }

        if(!isNaN(pageCount) && pageCount < this._page)
        {
            this.setPage(
            {
                page: pageCount,
                isActive: false,
                isDisabled: false
            });
        }

        this.pages = [];

        this.pages.push(
        {
            isActive: false,
            isDisabled: this._paginator.isFirst(),
            title: "&laquo;",
            page: this._paginator.GetFirstPage()
        });

        this._paginator.getPagesWithTrimDispersion(this.options.pagesDispersion).forEach(page =>
        {
            this.pages.push(
            {
                isActive: this._paginator.getPage() == page,
                isDisabled: false,
                title: page.toString(),
                page: page
            });
        });

        this.pages.push(
        {
            isActive: false,
            isDisabled: this._paginator.isLast(),
            title: "&raquo;",
            page: this._paginator.getLastPage()
        });
    }

    /**
     * Generates rendered items per page
     */
    protected _generateItemsPerPage()
    {
        this.itemsPerPageItems.forEach(itm => itm.isActive = itm.value == this.itemsPerPage || (isNaN(itm.value) && isNaN(this.itemsPerPage)));
    }

    /**
     * Sets displayed items count
     */
    protected _setDisplayedItemsCount()
    {
        if(!this._initialized)
        {
            return;
        }

        let displayedItems = this._paginator.getOffset() + this._paginator.getLength();

        this.displayedItemsCount = "";

        if(isNaN(displayedItems) && isPresent(this._totalCount))
        {
            this.displayedItemsCount = this._totalCount.toString();
        }
        else if(!isNaN(displayedItems) && isPresent(this._totalCount))
        {
            this.displayedItemsCount = `${displayedItems}/${this._totalCount}`;
        }
    }

    //######################### protected methods - overrides #########################

    /**
     * Method called when options are set, allowing to do something after that when overriden
     */
    protected optionsSet()
    {
        this.itemsPerPageItems = this.options.itemsPerPageValues.map(itm =>
        {
            return {
                value: itm,
                isActive: false
            };
        });

        this._generateItemsPerPage();
    }
}