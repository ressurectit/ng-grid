import {Injectable, OnDestroy, Input} from "@angular/core";

import {DataLoader, DataResponse, DATA_LOADER} from "../../dataLoader";
import {PagingAbstractComponent} from "../pagingAbstract.component";
import {VirtualScrollPagingOptions, CssClassesVirtualScrollPaging, VirtualScrollPaging} from './virtualScrollPaging.interface';

/**
 * Abstract class that represents virtual scroll paging component base
 */
@Injectable()
export abstract class VirtualScrollPagingAbstractComponent<TOptions extends VirtualScrollPagingOptions> extends PagingAbstractComponent<CssClassesVirtualScrollPaging, TOptions> implements VirtualScrollPaging, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Currently displayed pages
     */
    protected _displayedPages: number = 1;

    /**
     * Indication that data are loading
     */
    protected _loading: boolean = false;

    /**
     * Mutation observer for checking for changes in body
     */
    protected _bodyObserver: MutationObserver;

    //######################### public properties #########################

    /**
     * Zero based index of first displayed item on page
     */
    public get firstItemIndex(): number
    {
        return 0;
    }

    //######################### public properties - inputs #########################

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
    public totalCount: number;

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._bodyObserver)
        {
            this._bodyObserver.disconnect();
            this._bodyObserver = null;
        }
    }

    //######################### protected methods #########################

    /**
     * Initialize base events for scrolling
     * @param element Element which scrolling is tracked
     * @param bodyElement Element that changes when new data are loaded
     * @param document Html document
     */
    protected _initEvents(element: Element, bodyElement: HTMLElement, document?: HTMLDocument)
    {
        let dataLoader: DataLoader<DataResponse<any>> = this.gridPlugins[DATA_LOADER] as DataLoader<DataResponse<any>>;

        if(dataLoader.result.data.length)
        {
            this._loadData(element);
        }

        (document || element).addEventListener('scroll', () =>
        {
            this._loadData(element);
        });

        this._bodyObserver = new MutationObserver(() =>
        {
            this._loading = false;

            this._loadData(element);
        });

        this._bodyObserver.observe(bodyElement,
        {
            childList: true
        });
    }

    /**
     * Loads more data
     */
    protected _load()
    {
        this._loading = true;
        this._displayedPages++;

        this.page = this._displayedPages;
        this.pageChange.emit(this._displayedPages);
    }

    /**
     * Performs loading data if needed
     */
    protected _loadData(element: Element)
    {
        if(this._loading)
        {
            return;
        }

        let offset = element.scrollTop / (element.scrollHeight - element.clientHeight);

        if(isNaN(offset) || offset >= this._options.loadOffsetTreshold)
        {
            this._load();
        }
    }
}