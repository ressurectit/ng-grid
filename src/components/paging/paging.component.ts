import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {Paginator} from 'ng2-common/types';
import {isBlank} from 'angular2/src/facade/lang';

/**
 * Component used for rendering paging
 */
@Component(
{
    selector: "paging",
    template:
   `<div>
        <ul class="pagination pagination-sm margin-sm-vertical">
            <li *ngFor="#page of pages" [ngClass]="{disabled: page.isDisabled, active: page.isActive, 'pointer-cursor': !page.IsDisabled && !page.isActive}">
                <a (click)="setPage(page)">
                    <span [innerHtml]="page.title"></span>
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

    //######################### public properties - inputs #########################

    /**
     * Indication whether items per page can be changed
     */
    @Input()
    public itemsPerPageChangeable: boolean = false;
    
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
    public pageChange: EventEmitter<number> = new EventEmitter();

    /**
     * Occurs when number of items per page currently selected has been changed
     */
    @Output()
    public itemsPerPageChange: EventEmitter<number> = new EventEmitter();

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

    //######################### private methods #########################

    /**
     * Generates rendered pages
     */
    private _generatePages()
    {
        var pageCount = this._paginator.GetPageCount();
                    
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
}