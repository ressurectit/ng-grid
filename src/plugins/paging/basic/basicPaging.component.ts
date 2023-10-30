import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Paginator, isPresent} from '@jscrpt/common';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {BasicPagingOptions, BasicPaging, CssClassesBasicPaging} from './basicPaging.interface';
import {GridPluginType} from '../../../misc/enums';
import {GridInitializer, GridPluginInstances} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, PAGING_OPTIONS} from '../../../misc/tokens';

/**
 * Items per page single item
 */
export interface ItemsPerPageItem
{
    /**
     * Indication that item is active
     */
    isActive: boolean;

    /**
     * Value of item
     */
    value: number;
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
        pagingUl: 'pagination pagination-sm margin-sm-vertical',
        itemsPerPageDiv: 'pull-right',
        displayedItemsCountSpan: 'items-count',
        itemsPerPageUl: 'pagination pagination-sm margin-sm-vertical'
    },
};

/**
 * Component used for rendering basic simple paging
 */
@Component(
{
    selector: 'ng-basic-paging',
    templateUrl: 'basicPaging.component.html',
    styleUrls: ['basicPaging.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPagingSAComponent extends PagingAbstractComponent<CssClassesBasicPaging, BasicPagingOptions> implements BasicPaging
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
    protected ɵitemsPerPage: number = NaN;

    /**
     * Number of all items that are paged with current filter criteria
     */
    protected ɵtotalCount: number = 0;

    //######################### protected properties - template bindings #########################

    /**
     * Text displaying items count
     */
    protected displayedItemsCount: string = '';

    /**
     * Array of pages that are rendered
     */
    protected pages: {isActive: boolean; isDisabled: boolean; title: string; page: number}[] = [];

    /**
     * Array of items per page that are rendered
     */
    protected itemsPerPageItems: ItemsPerPageItem[] = [];

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
        this.generatePages();
        this.setDisplayedItemsCount();
        (this.gridPlugins?.[GridPluginType.GridInitializer] as GridInitializer).setPage(this.ɵpage);
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
        this.generatePages();
        this.generateItemsPerPage();
        this.setDisplayedItemsCount();
        (this.gridPlugins?.[GridPluginType.GridInitializer] as GridInitializer).setItemsPerPage(this.ɵitemsPerPage);
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
        this.generatePages();
        this.setDisplayedItemsCount();
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(PAGING_OPTIONS) @Optional() options?: BasicPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);

        this.optionsSet();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Sets page for current paging
     * @param page - Page index to be set
     */
    protected setPage(page: {isActive: boolean; isDisabled: boolean; page: number}): void
    {
        if(page.isActive || page.isDisabled)
        {
            return;
        }

        this.page = page.page;
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
     * Converts number to text that is going to be rendered for ItemsPerPage
     * @param value - Text that is returned for items per page
     */
    protected renderItemsPerPageText(value: number): string
    {
        return isNaN(value) ? '&infin;' : value.toString();
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

    //######################### protected methods #########################

    /**
     * Generates rendered pages
     */
    protected generatePages(): void
    {
        if(!this.initialized)
        {
            return;
        }

        const pageCount = this.paginator.getPageCount() || 1;

        //Applied when displaying all items
        if(isNaN(pageCount))
        {
            if(this.ɵpage != 1)
            {
                this.ɵpage = 1;
                this.paginator.setPage(1);
                this.pageChangeSubject.next(1);
            }

            this.pages = [];

            return;
        }

        if(!isNaN(pageCount) && pageCount < this.ɵpage)
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
            isDisabled: this.paginator.isFirst(),
            title: '&laquo;',
            page: this.paginator.GetFirstPage()
        });

        this.paginator.getPagesWithTrimDispersion(this.options.pagesDispersion).forEach(page =>
        {
            this.pages.push(
            {
                isActive: this.paginator.getPage() == page,
                isDisabled: false,
                title: page.toString(),
                page: page
            });
        });

        this.pages.push(
        {
            isActive: false,
            isDisabled: this.paginator.isLast(),
            title: '&raquo;',
            page: this.paginator.getLastPage()
        });
    }

    /**
     * Generates rendered items per page
     */
    protected generateItemsPerPage(): void
    {
        this.itemsPerPageItems.forEach(itm => itm.isActive = itm.value == this.itemsPerPage || (isNaN(itm.value) && isNaN(this.itemsPerPage)));
    }

    /**
     * Sets displayed items count
     */
    protected setDisplayedItemsCount(): void
    {
        if(!this.initialized)
        {
            return;
        }

        const displayedItems = this.paginator.getOffset() + this.paginator.getLength();

        this.displayedItemsCount = '';

        if(isNaN(displayedItems) && isPresent(this.ɵtotalCount))
        {
            this.displayedItemsCount = this.ɵtotalCount.toString();
        }
        else if(!isNaN(displayedItems) && isPresent(this.ɵtotalCount))
        {
            this.displayedItemsCount = `${displayedItems}/${this.ɵtotalCount}`;
        }
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