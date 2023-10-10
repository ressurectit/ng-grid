import {Injectable, OnDestroy, Input} from '@angular/core';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {VirtualScrollPagingOptions, CssClassesVirtualScrollPaging, VirtualScrollPaging} from './virtualScrollPaging.interface';
import {DataLoader, DataResponse} from '../../../interfaces';
import {GridPluginType} from '../../../misc/enums';

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
    protected displayedPages: number = 1;

    /**
     * Indication that data are loading
     */
    protected loading: boolean = false;

    /**
     * Mutation observer for checking for changes in body
     */
    protected bodyObserver: MutationObserver|undefined|null;

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get firstItemIndex(): number
    {
        return 0;
    }

    //######################### public properties - inputs #########################

    /**
     * @inheritdoc
     */
    public page: number = 0;

    /**
     * @inheritdoc
     */
    @Input()
    public itemsPerPage: number = 0;

    /**
     * @inheritdoc
     */
    @Input()
    public totalCount: number = 0;

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public override ngOnDestroy(): void
    {
        this.bodyObserver?.disconnect();
        this.bodyObserver = null;
    }

    //######################### protected methods #########################

    /**
     * Initialize base events for scrolling
     * @param element - Element which scrolling is tracked
     * @param bodyElement - Element that changes when new data are loaded
     * @param document - Html document
     */
    protected initEvents(element: Element, bodyElement: HTMLElement, document?: Document): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('VirtualScrollPagingAbstractComponent: missing gridPlugins!');
        }

        const dataLoader: DataLoader<DataResponse> = this.gridPlugins[GridPluginType.DataLoader] as DataLoader<DataResponse>;

        if(dataLoader.result.data.length)
        {
            this.loadData(element);
        }

        (document || element).addEventListener('scroll', () =>
        {
            this.loadData(element);
        });

        this.bodyObserver = new MutationObserver(() =>
        {
            this.loading = false;

            this.loadData(element);
        });

        this.bodyObserver.observe(bodyElement,
        {
            childList: true
        });
    }

    /**
     * Loads more data
     */
    protected load(): void
    {
        this.loading = true;
        this.displayedPages++;

        this.page = this.displayedPages;
        this.pageChangeSubject.next(this.displayedPages);
    }

    /**
     * Performs loading data if needed
     */
    protected loadData(element: Element): void
    {
        if(this.loading)
        {
            return;
        }

        const offset = element.scrollTop / (element.scrollHeight - element.clientHeight);

        if(isNaN(offset) || offset >= this.ɵoptions.loadOffsetTreshold)
        {
            this.load();
        }
    }
}