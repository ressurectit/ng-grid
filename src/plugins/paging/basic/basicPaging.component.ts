import {Component, ChangeDetectionStrategy, ValueProvider, signal, Signal, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Paginator, RecursivePartial, isPresent} from '@jscrpt/common';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {BasicPagingOptions, BasicPaging, CssClassesBasicPaging, PagesItem, ItemsPerPageItem} from './basicPaging.interface';
import {DEFAULT_OPTIONS} from '../../../misc/tokens';
import {InfinityNaNSAPipe} from '../../../pipes';

/**
 * Default options for paging
 */
const defaultOptions: BasicPagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    itemsPerPageValues: [],
    pagesDispersion: 4,
    cssClasses:
    {
        pagingUl: 'pagination pagination-sm margin-sm-vertical',
        itemsPerPageDiv: 'pull-right',
        displayedItemsCountSpan: 'items-count',
        itemsPerPageUl: 'pagination pagination-sm margin-sm-vertical'
    },
};

/**
 * Component used for rendering basic simple paging
 */
@Component(
{
    selector: 'ng-basic-paging',
    templateUrl: 'basicPaging.component.html',
    styleUrls: ['basicPaging.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        InfinityNaNSAPipe,
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
export class BasicPagingSAComponent extends PagingAbstractComponent<CssClassesBasicPaging, BasicPagingOptions> implements BasicPaging<BasicPagingOptions>
{
    //######################### protected fields #########################

    /**
     * Paginator used for getting page numbers
     */
    protected paginator: Paginator = new Paginator();

    //######################### protected properties - template bindings #########################

    /**
     * Text displaying items count
     */
    protected displayedItemsCount: Signal<string> = signal('').asReadonly();

    /**
     * Array of pages that are rendered
     */
    protected pages: Signal<PagesItem[]> = signal([]).asReadonly();

    /**
     * Array of items per page that are rendered
     */
    protected itemsPerPageItems: Signal<ItemsPerPageItem[]>;

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public get firstItemIndex(): number
    {
        const offset = this.paginator.getOffset();

        return isNaN(offset) ? 0 : offset;
    }

    //######################### public properties - overrides #########################

    /**
     * @inheritdoc
     */
    public override get options(): BasicPagingOptions
    {
        return super.options;
    }
    public override set options(options: RecursivePartial<BasicPagingOptions>)
    {
        super.options = options;
        
        this.optionsValue.update(opts =>
        {
            return {
                ...opts,
                itemsPerPageValues: options.itemsPerPageValues ?? opts.itemsPerPageValues,
            };
        });
    }

    //######################### constructor #########################
    constructor()
    {
        super();

        this.itemsPerPageItems = computed(() =>
        {
            const itemsPerPageValues = this.optionsValue().itemsPerPageValues;
            const itemsPerPage = this.itemsPerPageValue() ?? NaN;

            const result: ItemsPerPageItem[] = [];

            for(const val of itemsPerPageValues)
            {
                result.push(
                {
                    value: val,
                    isActive: val == itemsPerPage || (isNaN(val) && isNaN(itemsPerPage))
                });
            }

            return result;
        });
    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override async initialize(force: boolean): Promise<void>
    {
        await super.initialize(force);

        this.displayedItemsCount = computed(() =>
        {
            this.paginator.setPage(this.pageValue() ?? 1);
            this.paginator.setItemsPerPage(this.itemsPerPageValue() ?? NaN);
            this.paginator.setItemCount(this.totalCount());

            const displayedItems = this.paginator.getOffset() + this.paginator.getLength();
            const totalCount = this.totalCount();
            let result = '';
    
            if(isNaN(displayedItems) && isPresent(totalCount))
            {
                result = totalCount.toString();
            }
            else if(!isNaN(displayedItems) && isPresent(totalCount))
            {
                result = `${displayedItems}/${totalCount}`;
            }

            return result;
        });

        this.pages = computed(() =>
        {
            this.paginator.setPage(this.pageValue() ?? 1);
            this.paginator.setItemsPerPage(this.itemsPerPageValue() ?? NaN);
            this.paginator.setItemCount(this.totalCount());

            const pageCount = this.paginator.getPageCount() || 1;

            //Applied when displaying all items
            if(isNaN(pageCount))
            {
                setTimeout(() =>
                {
                    if(this.pageValue() != 1)
                    {
                        this.pageValue.set(1);
                        this.paginator.setPage(1);
                    }
                }, 0);

                return [];
            }

            //move to last page 
            if(!isNaN(pageCount) && pageCount < (this.pageValue() ?? 1) && this.totalCount() > 0)
            {
                setTimeout(() =>
                {
                    this.setPageItem(
                    {
                        page: pageCount,
                        isActive: false,
                        isDisabled: false,
                        title: '',
                    });
                }, 0);

                return [];
            }

            const result: PagesItem[] = [];

            result.push(
            {
                isActive: false,
                isDisabled: this.paginator.isFirst(),
                title: '&laquo;',
                page: this.paginator.GetFirstPage()
            });

            this.paginator.getPagesWithTrimDispersion(this.optionsValue().pagesDispersion).forEach(page =>
            {
                result.push(
                {
                    isActive: this.paginator.getPage() == page,
                    isDisabled: false,
                    title: page.toString(),
                    page: page
                });
            });

            result.push(
            {
                isActive: false,
                isDisabled: this.paginator.isLast(),
                title: '&raquo;',
                page: this.paginator.getLastPage()
            });

            return result;
        });
    }

    //######################### protected methods - template bindings #########################

    /**
     * Sets page item to current paging
     * @param page - Page item to be set
     */
    protected setPageItem(page: PagesItem): void
    {
        if(page.isActive || page.isDisabled)
        {
            return;
        }

        for(const page of this.pages())
        {
            page.isActive = false;
        }

        page.isActive = true;

        this.setPage(page.page);
    }

    /**
     * Sets items per page to current paging
     * @param itemsPerPage - Items per page item to be set
     */
    protected setItemsPerPageItem(itemsPerPage: ItemsPerPageItem): void
    {
        if(itemsPerPage.isActive)
        {
            return;
        }

        for(const page of this.itemsPerPageItems())
        {
            page.isActive = false;
        }

        itemsPerPage.isActive = true;

        this.setItemsPerPage(itemsPerPage.value);
    }
}