import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Paginator, isArray, isBlank, isPresent, isJsObject, isNumber} from '@anglr/common';
import {PagingAbstractLegacyComponent} from "./pagingAbstract.component";

/**
 * Items per page single item
 */
export class LegacyItemsPerPageItem
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
 * Component used for rendering basic simple paging
 */
@Component(
{
    selector: "basic-legacy-paging",
    template:
   `<div>
        <ul class="pagination pagination-sm margin-sm-vertical">
            <li *ngFor="let page of pages" [ngClass]="{disabled: page.isDisabled, active: page.isActive, 'pointer-cursor': !page.IsDisabled && !page.isActive}">
                <a (click)="setPage(page)">
                    <span [innerHtml]="page.title"></span>
                </a>
            </li>
        </ul>

        <div class="pull-right" *ngIf="!!itemsPerPageItems && itemsPerPageItems.length > 0">
            <span style="float: left; margin-right: 8px; line-height: 42px;">{{displayedItemsCount}}</span>

            <ul class="pagination pagination-sm margin-sm-vertical">
                <li *ngFor="let itemsPerPage of itemsPerPageItems" [ngClass]="{active: itemsPerPage.isActive, 'pointer-cursor': !itemsPerPage.isActive}">
                    <a (click)="setItemsPerPage(itemsPerPage)">
                        <span [innerHtml]="renderItemsPerPageText(itemsPerPage.value)"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicPagingLegacyComponent extends PagingAbstractLegacyComponent implements OnInit
{
    //######################### private fields #########################

    /**
     * Paginator used for getting page numbers
     */
    private _paginator: Paginator = new Paginator();

    /**
     * Options specific to paging implementation
     * - pagesDispersion - Page dispersion parameter for rendered pages
     * - itemsPerPageValues - Gets or sets array of available values for itemsPerPage
     */
    private _pagingOptions: {pagesDispersion?: number, itemsPerPageValues: number[]} = {itemsPerPageValues: null, pagesDispersion: 4};

    /**
     * Index of currently selected page
     */
    private _page: number;

    /**
     * Number of items currently used for paging
     */
    private _itemsPerPage: number;

    /**
     * Number of all items that are paged with current filter criteria
     */
    private _totalCount: number;

    //######################### public properties - bindings #########################

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
    public itemsPerPageItems: LegacyItemsPerPageItem[] = [];

    //######################### public properties - inputs #########################

    /**
     * Gets or sets options specific to paging implementation
     */
    @Input()
    public set pagingOptions(options: any)
    {
        if(!isJsObject(options))
        {
            return;
        }

        if(isPresent(options.pagesDispersion) && isNumber(options.pagesDispersion))
        {
            this._pagingOptions.pagesDispersion = options.pagesDispersion;
        }

        if(isBlank(options.itemsPerPageValues) || !isArray(options.itemsPerPageValues))
        {
            this.itemsPerPageItems = [];
            this._pagingOptions.itemsPerPageValues = [];

            return;
        }

        this._pagingOptions.itemsPerPageValues = options.itemsPerPageValues;
        this.itemsPerPageItems = options.itemsPerPageValues.map(itm =>
        {
            return {
                value: itm,
                isActive: false
            };
        });

        this._generateItemsPerPage();
    }
    public get pagingOptions(): any
    {
        return this._pagingOptions;
    }

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

    //######################### public properties - outputs #########################

    /**
     * Occurs when index of currently selected page has been changed
     */
    @Output()
    public pageChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Occurs when number of items per page currently selected has been changed
     */
    @Output()
    public itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._initialized = true;
    }

    //######################### public methods - template methods #########################

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
     * @param  {LegacyItemsPerPageItem} itemsPerPage Number of items per page
     * @internal
     */
    public setItemsPerPage(itemsPerPage: LegacyItemsPerPageItem)
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

    //######################### private methods #########################

    /**
     * Generates rendered pages
     */
    private _generatePages()
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

        this._paginator.getPagesWithTrimDispersion(this._pagingOptions.pagesDispersion).forEach(page =>
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
    private _generateItemsPerPage()
    {
        this.itemsPerPageItems.forEach(itm => itm.isActive = itm.value == this.itemsPerPage || (isNaN(itm.value) && isNaN(this.itemsPerPage)));
    }

    /**
     * Sets displayed items count
     */
    private _setDisplayedItemsCount()
    {
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
}