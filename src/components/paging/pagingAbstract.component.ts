import {EventEmitter, ChangeDetectorRef, Injectable} from "@angular/core";

/**
 * Abstract class that represents any paging component
 */
@Injectable()
export abstract class PagingAbstractComponent
{
    //######################### protected fields #########################

    /**
     * Indication whether is component initialized
     */
    protected _initialized: boolean = false;

    //######################### public properties #########################

    /**
     * Gets or sets options specific to paging implementation
     */
    public abstract set pagingOptions(options: any);
    public abstract get pagingOptions(): any;

    /**
     * Gets or sets index of currently selected page
     */
    public abstract set page(page: number);
    public abstract get page(): number;

    /**
     * Gets or sets number of items currently used for paging
     */
    public abstract set itemsPerPage(itemsPerPage: number);
    public abstract get itemsPerPage(): number;

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    public abstract set totalCount(totalCount: number);
    public abstract get totalCount(): number;

    //######################### public properties - events #########################

    /**
     * Occurs when index of currently selected page has been changed
     */
    public abstract pageChange: EventEmitter<number>;

    /**
     * Occurs when number of items per page currently selected has been changed
     */
    public abstract itemsPerPageChange: EventEmitter<number>;

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize(): void
    {
        this._initialized = true;
    }

    /**
     * Method that unitialize paging component, this method can be used for delaying initialization if paging used dynamicaly
     */
    public uninitialize(): void
    {
        this._initialized = false;
    }
}