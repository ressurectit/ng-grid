import {Component, Input, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Paginator} from '@jscrpt/common';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {ItemsPerPageItem} from '../basic/basicPaging.component';
import {PreviousNextPaging, PreviousNextPagingOptions, CssClassesPreviousNextPaging} from './previousNextPaging.interface';
import {GRID_PLUGIN_INSTANCES, PAGING_OPTIONS} from '../../../misc/tokens';
import {GridPluginInstances} from '../../../misc/types';

/**
 * Default options for paging
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
    selector: 'next-previous-paging',
    templateUrl: 'previousNextPaging.component.html',
    styleUrl: 'previousNextPaging.component.css',
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviousNextPagingSAComponent extends PagingAbstractComponent<CssClassesPreviousNextPaging, PreviousNextPagingOptions> implements PreviousNextPaging
{
    //######################### protected fields #########################

    /**
     * Paginator used for getting page numbers
     */
    protected paginator: Paginator = new Paginator();

    /**
     * Index of currently selected page
     */
    protected ɵpage: number = 0;

    /**
     * Number of items currently used for paging
     */
    protected ɵitemsPerPage: number = 0;

    /**
     * Number of all items that are paged with current filter criteria
     */
    protected ɵtotalCount: number = 0;

    //######################### protected properties - template bindings #########################

    /**
     * Array of items per page that are rendered
     */
    protected itemsPerPageItems: ItemsPerPageItem[] = [];

    /**
     * Indication that currently displayed page is first
     */
    protected get isFirst(): boolean
    {
        return this.paginator.isFirst();
    }

    /**
     * Indication that currently displayed page is last
     */
    protected get isLast(): boolean
    {
        return this.paginator.isLast();
    }

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get firstItemIndex(): number
    {
        const offset = this.paginator.getOffset();

        return isNaN(offset) ? 0 : offset;
    }

    //######################### public properties - inputs #########################

    /**
     * @inheritdoc
     */
    @Input()
    public get page(): number
    {
        return this.ɵpage;
    }
    public set page(page: number)
    {
        this.ɵpage = page;
        this.paginator.setPage(page);
    }

    /**
     * @inheritdoc
     */
    @Input()
    public get itemsPerPage(): number
    {
        return this.ɵitemsPerPage;
    }
    public set itemsPerPage(itemsPerPage: number)
    {
        this.ɵitemsPerPage = itemsPerPage;
        this.paginator.setItemsPerPage(itemsPerPage);
        this.generateItemsPerPage();
    }

    /**
     * @inheritdoc
     */
    @Input()
    public get totalCount(): number
    {
        return this.ɵtotalCount;
    }
    public set totalCount(totalCount: number)
    {
        this.ɵtotalCount = totalCount;
        this.paginator.setItemCount(totalCount);
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(PAGING_OPTIONS) @Optional() options?: PreviousNextPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);

        this.optionsSet();
    }

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public override async initialize(force: boolean): Promise<void>
    {
        await super.initialize(force);

        this.paginator.setPage(this.ɵpage);
        this.paginator.setItemsPerPage(this.ɵitemsPerPage);
    }

    //######################### protected methods - template methods #########################

    /**
     * Sets page for current paging
     * @param page - Page index to be set
     */
    protected setPage(page: number): void
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
        this.pageChangeSubject.next(this.page);
    }

    /**
     * Sets items per page for current paging
     * @param itemsPerPage - Number of items per page
     */
    protected setItemsPerPage(itemsPerPage: ItemsPerPageItem): void
    {
        if(itemsPerPage.isActive)
        {
            return;
        }

        this.itemsPerPage = itemsPerPage.value;
        this.itemsPerPageChangeSubject.next(this.itemsPerPage);
    }

    /**
     * Generates rendered items per page
     */
    protected generateItemsPerPage(): void
    {
        this.itemsPerPageItems.forEach(itm => itm.isActive = itm.value == this.itemsPerPage || (isNaN(itm.value) && isNaN(this.itemsPerPage)));
    }

    /**
     * Converts number to text that is going to be rendered for ItemsPerPage
     * @param value - Text to be displayed for items per page
     */
    protected renderItemsPerPageText(value: number): string
    {
        return isNaN(value) ? '&infin;' : value.toString();
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override optionsSet(): void
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