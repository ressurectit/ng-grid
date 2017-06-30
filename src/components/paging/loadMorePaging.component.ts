import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PagingAbstractComponent} from "./pagingAbstract.component";

/**
 * Paging that uses simple button to load more content
 */
@Component(
{
    selector: 'load-more-paging',
    template: `
    <div class="text-center" *ngIf="moreAvailable">
        <button type="button" class="btn btn-primary btn-sm" (click)="loadMore()">Load More</button>
    </div>`
})
export class LoadMorePagingComponent extends PagingAbstractComponent
{
    //######################### private fields #########################
    
    /**
     * Currently displayed pages
     */
    private _displayedPages: number = 1;

    /**
     * Number of all items that are paged with current filter criteria
     */
    private _totalCount: number = 0;

    //######################### public properties - bindings #########################

    /**
     * Indication that more items are available
     * @internal
     */
    public moreAvailable: boolean = true;

    //######################### public properties - inputs #########################
    
    /**
     * Gets or sets options specific to paging implementation - NOT USED
     */
    public pagingOptions: any;
    
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
        this.moreAvailable = (this._displayedPages * this.itemsPerPage) < this._totalCount;
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

    //######################### public methods - template methods #########################

    /**
     * Loads more data
     * @internal
     */
    public loadMore()
    {
        this._displayedPages++;

        this.pageChange.emit(this._displayedPages);
    }
}