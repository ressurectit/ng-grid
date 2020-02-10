import {Component, Input, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional} from '@angular/core';
import {Paginator, extend} from '@jscrpt/common';

import {GridPluginInstances} from '../../../components/grid';
import {GRID_PLUGIN_INSTANCES} from '../../../components/grid/types';
import {PagingAbstractComponent} from '../pagingAbstract.component';
import {ItemsPerPageItem} from '../basic/basicPaging.component';
import {PAGING_OPTIONS} from '../types';
import {PreviousNextPaging, PreviousNextPagingOptions, CssClassesPreviousNextPaging} from './previousNextPaging.interface';

/**
 * Default options for paging
 * @internal
 */
const defaultOptions: PreviousNextPagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    itemsPerPageValues: [],
    cssClasses:
    {
        previousNextContainerUl: 'pagination pagination-sm margin-sm-vertical',
        firstItemSpan: 'fa fa-angle-double-left',
        previousItemSpan: 'fa fa-angle-left',
        nextItemSpan: 'fa fa-angle-right',
        displayedItemsCountDiv: 'pull-right',
        itemsPerPageUl: 'pagination pagination-sm margin-sm-vertical'
    }
};

/**
 * Component used for rendering paging with next and previous buttons
 */
@Component(
{
    selector: "next-previous-paging",
    templateUrl: 'previousNextPaging.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `.pointer-cursor
        {
            cursor: pointer;
        }`
    ]
})
export class PreviousNextPagingComponent extends PagingAbstractComponent<CssClassesPreviousNextPaging, PreviousNextPagingOptions> implements PreviousNextPaging
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
     * Array of items per page that are rendered
     * @internal
     */
    public itemsPerPageItems: ItemsPerPageItem[] = [];

    /**
     * Indication that currently displayed page is first
     * @internal
     */
    public get isFirst(): boolean
    {
        return this._paginator.isFirst();
    };

    /**
     * Indication that currently displayed page is last
     * @internal
     */
    public get isLast(): boolean
    {
        return this._paginator.isLast();
    };

    //######################### public properties #########################

    /**
     * Zero based index of first displayed item on page
     */
    public get firstItemIndex(): number
    {
        let offset = this._paginator.getOffset();

        return isNaN(offset) ? 0 : offset;
    }

    /**
     * Indication whether plugin is already initialized
     */
    public get initialized(): boolean
    {
        return this._initialized;
    }

    //######################### public properties - inputs #########################

    /**
     * Gets or sets index of currently selected page
     */
    @Input()
    public get page(): number
    {
        return this._page;
    }
    public set page(page: number)
    {
        this._page = page;
        this._paginator.setPage(page);
    }

    /**
     * Gets or sets number of items currently used for paging
     */
    @Input()
    public get itemsPerPage(): number
    {
        return this._itemsPerPage;
    }
    public set itemsPerPage(itemsPerPage: number)
    {
        this._itemsPerPage = itemsPerPage;
        this._paginator.setItemsPerPage(itemsPerPage);
        this.generateItemsPerPage();
    }

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    @Input()
    public get totalCount(): number
    {
        return this._totalCount;
    }
    public set totalCount(totalCount: number)
    {
        this._totalCount = totalCount;
        this._paginator.setItemCount(totalCount);
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: PreviousNextPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
        this.optionsSet();
    }

    //######################### public methods #########################

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize()
    {
        super.initialize();

        this._paginator.setPage(this._page);
        this._paginator.setItemsPerPage(this._itemsPerPage);
    }

    //######################### public methods - template methods #########################

    /**
     * Sets page for current paging
     * @param page - Page index to be set
     * @internal
     */
    public setPage(page: number)
    {
        if(this.isFirst && page <= 1)
        {
            return;
        }

        if(this.isLast && page > this.page)
        {
            return;
        }

        this.page = page;
        this.pageChange.emit(this.page);
    }

    /**
     * Sets items per page for current paging
     * @param itemsPerPage - Number of items per page
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
     * Generates rendered items per page
     * @internal
     */
    public generateItemsPerPage()
    {
        this.itemsPerPageItems.forEach(itm => itm.isActive = itm.value == this.itemsPerPage || (isNaN(itm.value) && isNaN(this.itemsPerPage)));
    }

    /**
     * Converts number to text that is going to be rendered for ItemsPerPage
     * @param value - Text to be displayed for items per page
     */
    public renderItemsPerPageText(value: number): string
    {
        return isNaN(value) ? "&infin;" : value.toString();
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

        this.generateItemsPerPage();
    }
}