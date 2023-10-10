import {Component, Input, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalizeSAPipe} from '@anglr/common';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {LoadMorePaging, CssClassesLoadMorePaging, LoadMorePagingOptions} from './loadMorePaging.interface';
import {GRID_PLUGIN_INSTANCES, PAGING_OPTIONS} from '../../../misc/tokens';
import {GridPluginInstances} from '../../../misc/types';

/**
 * Default options for paging
 */
const defaultOptions: LoadMorePagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    cssClasses:
    {
        containerDiv: 'text-center',
        loadMoreBtn: 'btn btn-primary btn-sm'
    },
    texts:
    {
        loadMoreBtn: 'Load More'
    }
};

/**
 * Paging that uses simple button to load more content
 */
@Component(
{
    selector: 'load-more-paging',
    templateUrl: 'loadMorePaging.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        LocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMorePagingSAComponent  extends PagingAbstractComponent<CssClassesLoadMorePaging, LoadMorePagingOptions> implements LoadMorePaging
{
    //######################### protected fields #########################

    /**
     * Currently displayed pages
     */
    protected displayedPages: number = 1;

    /**
     * Number of all items that are paged with current filter criteria
     */
    protected ɵtotalCount: number = 0;

    //######################### protected properties - template bindings #########################

    /**
     * Indication that more items are available
     */
    protected moreAvailable: boolean = true;

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
    public get totalCount(): number
    {
        return this.ɵtotalCount;
    }
    public set totalCount(value: number)
    {
        this.ɵtotalCount = value;
        this.moreAvailable = (this.displayedPages * this.itemsPerPage) < this.ɵtotalCount;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(PAGING_OPTIONS) @Optional() options?: LoadMorePagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Loads more data
     */
    protected loadMore(): void
    {
        this.displayedPages++;

        this.page = this.displayedPages;
        this.pageChangeSubject.next(this.displayedPages);
    }
}