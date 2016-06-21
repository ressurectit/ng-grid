import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Paginator} from '@ng2/common';
import {isBlank, isArray} from '@angular/core/src/facade/lang';

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
 * Component used for rendering paging
 */
@Component(
{
    selector: "paging",
    template:
   `<div>
        <ul class="pagination pagination-sm margin-sm-vertical">
            <li *ngFor="let page of pages" [ngClass]="{disabled: page.isDisabled, active: page.isActive, 'pointer-cursor': !page.IsDisabled && !page.isActive}">
                <a (click)="setPage(page)">
                    <span [innerHtml]="page.title"></span>
                </a>
            </li>
        </ul>
        
        <ul class="pagination pagination-sm margin-sm-vertical pull-right" *ngIf="!!itemsPerPageItems && itemsPerPageItems.length > 0">
            <li *ngFor="let itemsPerPage of itemsPerPageItems" [ngClass]="{active: itemsPerPage.isActive, 'pointer-cursor': !itemsPerPage.isActive}">
                <a (click)="setItemsPerPage(itemsPerPage)">
                    <span [innerHtml]="_renderItemsPerPageText(itemsPerPage.value)"></span>
                </a>
            </li>
        </ul>
    </div>`
})
export class PagingComponent implements OnInit
{
    //######################### private fields #########################

    /**
     * Paginator used for getting page numbers
     */
    private _paginator: Paginator = new Paginator();

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

    //######################### public properties #########################

    /**
     * Array of pages that are rendered
     */
    public pages: {isActive: boolean; isDisabled: boolean; title: string; page: number}[] = [];
    
    /**
     * Array of items per page that are rendered
     */
    public itemsPerPageItems: ItemsPerPageItem[] = [];

    //######################### public properties - inputs #########################

    /**
     * Gets or sets array of available values for itemsPerPage
     */
    @Input()
    public set itemsPerPageValues(val: number[])
    {
        //TODO - localize text for NaN
        
        if(!val || !isArray(val))
        {
            this.itemsPerPageItems = [];
            
            return;
        }
        
        this.itemsPerPageItems = val.map(itm => 
        {
            return {
                value: itm, 
                isActive: false
            };
        });
        
        this._generateItemsPerPage();
    }
    public get itemsPerPageValues(): number[]
    {
        return this.itemsPerPageItems.map(itm => itm.value);
    }
    
    /**
     * Page dispersion parameter for rendered pages
     */
    @Input()
    public pagesDispersion: number = 4;

    /**
     * Gets or sets index of currently selected page
     */
    @Input()
    public set page(page: number)
    {
        this._page = page;
        this._paginator.SetPage(page);
        this._generatePages();
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
        this._paginator.SetItemsPerPage(itemsPerPage);
        this._generatePages();
        this._generateItemsPerPage();
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
        this._paginator.SetItemCount(totalCount);
        this._generatePages();
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
        if(isBlank(this.page) || isBlank(this.itemsPerPage) || isBlank(this.totalCount))
        {
            throw new Error("You must set 'page', 'itemsPerPage' and 'totalCount' if you want to use 'PagingComponent'");
        }
    }

    //######################### public methods #########################
    
    /**
     * Sets page for current paging
     * @param  {number} page Page index to be set
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

    //######################### private methods #########################

    /**
     * Converts number to text that is going to be rendered for ItemsPerPage
     * @param  {number} value
     */
    private _renderItemsPerPageText(value: number): string
    {
        return isNaN(value) ? "&infin;" : value.toString();
    }

    /**
     * Generates rendered pages
     */
    private _generatePages()
    {
        var pageCount = this._paginator.GetPageCount();
        
        //Applied when displaying all items
        if(isNaN(pageCount))
        {
            if(this._page != 1)
            {
                this._page = 1;
                this._paginator.SetPage(1);
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
            isDisabled: this._paginator.IsFirst(),
            title: "&laquo;",
            page: this._paginator.GetFirstPage()
        });
        
        this._paginator.GetPagesWithTrimDispersion(this.pagesDispersion).forEach(page =>
        {
            this.pages.push(
            {
                isActive: this._paginator.GetPage() == page,
                isDisabled: false,
                title: page.toString(),
                page: page
            });
        });
        
        this.pages.push(
        {
            isActive: false,
            isDisabled: this._paginator.IsLast(),
            title: "&raquo;",
            page: this._paginator.GetLastPage()
        });
    }
    
    /**
     * Generates rendered items per page
     */
    private _generateItemsPerPage()
    {
        this.itemsPerPageItems.forEach(itm => itm.isActive = itm.value == this.itemsPerPage);
    }
}