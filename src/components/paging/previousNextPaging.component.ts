import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Paginator, isArray, isBlank, isPresent, isJsObject, isNumber} from '@anglr/common';
import {PagingAbstractComponent} from "./pagingAbstract.component";
import {ItemsPerPageItem} from "./basicPaging.component";

/**
 * Component used for rendering paging with next and previous buttons
 */
@Component(
{
    selector: "next-previous-paging",
    template:
   `<div>
        <ul class="pagination pagination-sm margin-sm-vertical">
            <li [ngClass]="{disabled: isFirst, 'pointer-cursor': !isFirst}">
                <a (click)="setPage(1)">
                    <span class="fa fa-angle-double-left"></span>
                </a>
            </li>

            <li [ngClass]="{disabled: isFirst, 'pointer-cursor': !isFirst}">
                <a (click)="setPage(page - 1)">
                    <span class="fa fa-angle-left"></span>
                </a>
            </li>

            <li [ngClass]="{disabled: isLast, 'pointer-cursor': !isLast}">
                <a (click)="setPage(page + 1)">
                    <span class="fa fa-angle-right"></span>
                </a>
            </li>
        </ul>

        <div class="pull-right" *ngIf="!!itemsPerPageItems && itemsPerPageItems.length > 0">
            <ul class="pagination pagination-sm margin-sm-vertical">
                <li *ngFor="let itemsPerPage of itemsPerPageItems" [ngClass]="{active: itemsPerPage.isActive, 'pointer-cursor': !itemsPerPage.isActive}">
                    <a (click)="setItemsPerPage(itemsPerPage)">
                        <span [innerHtml]="_renderItemsPerPageText(itemsPerPage.value)"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviousNextPagingComponent extends PagingAbstractComponent implements OnInit
{
    //######################### private fields #########################

    /**
     * Indication whether is component initialized
     */
    private _initialized: Boolean = false;

    /**
     * Paginator used for getting page numbers
     */
    private _paginator: Paginator = new Paginator();

    /**
     * Options specific to paging implementation
     * - itemsPerPageValues - Gets or sets array of available values for itemsPerPage
     */
    private _pagingOptions: {itemsPerPageValues: number[]} = {itemsPerPageValues: null};

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

        this.generateItemsPerPage();
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
        this.generateItemsPerPage();
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
     * Generates rendered items per page
     * @internal
     */
    public generateItemsPerPage()
    {
        this.itemsPerPageItems.forEach(itm => itm.isActive = itm.value == this.itemsPerPage || (isNaN(itm.value) && isNaN(this.itemsPerPage)));
    }

    //######################### private methods #########################

    /**
     * Converts number to text that is going to be rendered for ItemsPerPage
     * @param  {number} value
     */
    private _renderItemsPerPageText(value: number): string
    {
        return isNaN(value) ? "&infin;" : value.toString();
    }
}