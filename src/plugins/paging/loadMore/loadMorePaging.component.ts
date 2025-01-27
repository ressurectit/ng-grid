import {Component, ChangeDetectionStrategy, ValueProvider, signal, Signal, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalizePipe} from '@anglr/common';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {LoadMorePaging, CssClassesLoadMorePaging, LoadMorePagingOptions} from './loadMorePaging.interface';
import {DEFAULT_OPTIONS} from '../../../misc/tokens';

/**
 * Default options for paging
 */
const defaultOptions: LoadMorePagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    cssClasses:
    {
        containerElement: 'grid-text-center',
        loadMoreBtn: 'btn btn-primary btn-sm'
    },
    texts:
    {
        loadMoreBtn: 'load more'
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
        LocalizePipe,
    ],
    providers:
    [
        <ValueProvider>
        {
            provide: DEFAULT_OPTIONS,
            useValue: defaultOptions,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMorePagingSAComponent  extends PagingAbstractComponent<CssClassesLoadMorePaging, LoadMorePagingOptions> implements LoadMorePaging<LoadMorePagingOptions>
{
    //######################### protected fields #########################

    /**
     * Currently displayed pages
     */
    protected displayedPages: number = 1;

    //######################### protected properties - template bindings #########################

    /**
     * Indication that more items are available
     */
    protected moreAvailable: Signal<boolean> = signal(true).asReadonly();

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get firstItemIndex(): number
    {
        return 0;
    }

    // this.moreAvailable = (this.displayedPages * this.itemsPerPage) < this.ɵtotalCount;

//######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override async initialize(force: boolean): Promise<void>
    {
        await super.initialize(force);

        this.moreAvailable = computed(() => (this.displayedPages * (this.itemsPerPageValue() ?? 0)) < this.totalCount());
        
        this.changeDetector.detectChanges();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Loads more data
     */
    protected loadMore(): void
    {
        this.displayedPages++;

        this.setPage(this.displayedPages);
    }
}