import {Component, ChangeDetectionStrategy, ValueProvider, Signal, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Paginator, RecursivePartial} from '@jscrpt/common';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {PreviousNextPaging, PreviousNextPagingOptions, CssClassesPreviousNextPaging} from './previousNextPaging.interface';
import {DEFAULT_OPTIONS} from '../../../misc/tokens';
import {ItemsPerPageItem} from '../basic/basicPaging.interface';
import {InfinityNaNSAPipe} from '../../../pipes';

/**
 * Default options for paging
 */
const defaultOptions: PreviousNextPagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    itemsPerPageValues: [],
    cssClasses:
    {
        pagingContainer: 'grid-flex-row',
        pagingElement: 'grid-flex-row pages',
        firstItemElement: 'fas fa-angle-double-left',
        previousItemElement: 'fas fa-angle-left',
        nextItemElement: 'fas fa-angle-right',
        pagingSeparatorElement: 'grid-flex-1',
        itemsPerPageElement: 'grid-flex-row items-per-page',
    }
};

/**
 * Component used for rendering paging with next and previous buttons
 */
@Component(
{
    selector: 'next-previous-paging',
    templateUrl: 'previousNextPaging.component.html',
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
export class PreviousNextPagingSAComponent extends PagingAbstractComponent<CssClassesPreviousNextPaging, PreviousNextPagingOptions> implements PreviousNextPaging<PreviousNextPagingOptions>
{
    //######################### protected fields #########################

    /**
     * Paginator used for getting page numbers
     */
    protected paginator: Paginator = new Paginator();

    //######################### protected properties - template bindings #########################

    /**
     * Array of items per page that are rendered
     */
    protected itemsPerPageItems: Signal<ItemsPerPageItem[]>;

    /**
     * Indication that currently displayed page is first
     */
    protected isFirst: Signal<boolean> = signal(false).asReadonly();

    /**
     * Indication that currently displayed page is last
     */
    protected isLast: Signal<boolean> = signal(false).asReadonly();

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
    public override get options(): PreviousNextPagingOptions
    {
        return super.options;
    }
    public override set options(options: RecursivePartial<PreviousNextPagingOptions>)
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

        this.isFirst = computed(() =>
        {
            this.paginator.setPage(this.pageValue() ?? 1);
            this.paginator.setItemsPerPage(this.itemsPerPageValue() ?? NaN);
            this.paginator.setItemCount(this.totalCount());

            return this.paginator.isFirst();
        });

        this.isLast = computed(() =>
        {
            this.paginator.setPage(this.pageValue() ?? 1);
            this.paginator.setItemsPerPage(this.itemsPerPageValue() ?? NaN);
            this.paginator.setItemCount(this.totalCount());

            return this.paginator.isLast();
        });

        this.changeDetector.detectChanges();
    }

    //######################### protected methods - template methods #########################

    /**
     * Sets page for current paging
     * @param page - Page index to be set
     */
    protected setPageValue(page: number): void
    {
        if(this.isFirst() && page <= 1)
        {
            return;
        }

        if(this.isLast() && page > (this.pageValue() ?? 1))
        {
            return;
        }

        this.setPage(page);
    }

    /**
     * Sets items per page for current paging
     * @param itemsPerPage - Number of items per page
     */
    protected setItemsPerPageValue(itemsPerPage: ItemsPerPageItem): void
    {
        if(itemsPerPage.isActive)
        {
            return;
        }

        this.setItemsPerPage(itemsPerPage.value);
    }
}