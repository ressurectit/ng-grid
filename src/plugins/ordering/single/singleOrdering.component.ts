import {ChangeDetectionStrategy, Component, ElementRef, Inject, Injector, OnDestroy, Optional, Signal, WritableSignal, inject, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {OrderByDirection, RecursivePartial} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';
import {Subscription} from 'rxjs';

import {SingleOrdering, SingleOrderingOptions} from './singleOrdering.interface';
import {GridInitializer, GridPluginInstances, MetadataSelector, OrderingOptions, SimpleOrdering, TableGridMetadata} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, ORDERING_OPTIONS} from '../../../misc/tokens';
import {DefaultOrderableIndicatorRenderer} from '../misc/services';

/**
 * Default options for ordering
 */
const defaultOptions: SingleOrderingOptions =
{
    indicatorRenderer: DefaultOrderableIndicatorRenderer,
    cssClasses:
    {
        asc: 'fa fa-sort-up',
        desc: 'fa fa-sort-down',
        none: 'fa fa-sort',
        orderable: 'header-orderable',
    },
};

/**
 * Component used for single ordering, used for ordering using single column
 */
@Component(
{
    selector: 'ng-single-ordering',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleOrderingComponent implements SingleOrdering, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Current ordering value
     */
    protected orderingValue: WritableSignal<SimpleOrdering|undefined|null> = signal(undefined);

    /**
     * Instance of injector used for DI
     */
    protected injector: Injector = inject(Injector);

    /**
     * Instance of options
     */
    protected ɵoptions: OrderingOptions;

    /**
     * Metadata change subscription
     */
    protected metadataChangeSubscription: Subscription|undefined|null;

    /**
     * Grid initializer currently used
     */
    protected gridInitializer: GridInitializer<SimpleOrdering>|undefined|null;

    /**
     * Grid metadata selector currently used
     */
    protected metadataSelector: MetadataSelector<TableGridMetadata>|undefined|null;

    //######################### public properties - implementation of SimpleOrdering #########################

    /**
     * @inheritdoc
     */
    public get ordering(): Signal<SimpleOrdering|undefined|null>
    {
        return this.orderingValue.asReadonly();
    }

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null = inject(GRID_PLUGIN_INSTANCES, {optional: true});

    /**
     * @inheritdoc
     */
    public get options(): OrderingOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<OrderingOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
    }

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    //######################### constructor #########################
    constructor(@Inject(ORDERING_OPTIONS) @Optional() options?: RecursivePartial<OrderingOptions>,)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.metadataChangeSubscription?.unsubscribe();
        this.metadataChangeSubscription = null;
    }

    //######################### public methods - implementation of SimpleOrdering #########################

    /**
     * @inheritdoc
     */
    public setOrdering(ordering: SimpleOrdering|undefined|null): void
    {
        this.orderingValue.set(ordering);
        this.gridInitializer?.setOrdering(this.orderingValue());
    }

    /**
     * @inheritdoc
     */
    public orderByColumn(columnId: string): void
    {
        //no ordering, or ordering different column
        const ordering = this.orderingValue();
        let newOrdering: SimpleOrdering|undefined|null;

        if(!ordering || ordering.orderBy != columnId)
        {
            newOrdering =
            {
                orderByDirection: OrderByDirection.Ascending,
                orderBy: columnId,
            };

            this.orderingValue.set(newOrdering);
        }
        else if(ordering.orderByDirection == OrderByDirection.Ascending)
        {
            newOrdering =
            {
                orderByDirection: OrderByDirection.Descending,
                orderBy: columnId
            };

            this.orderingValue.set(newOrdering);
        }
        else
        {
            newOrdering = null;
            this.orderingValue.set(newOrdering);
        }

        this.gridInitializer?.setOrdering(newOrdering);
    }

    /**
     * @inheritdoc
     */
    public getCssClassesForColumn(columnId: string): string[]
    {
        const ordering = this.orderingValue();

        if(ordering?.orderBy == columnId)
        {
            return [
                ordering.orderByDirection == OrderByDirection.Ascending
                    ? this.ɵoptions.cssClasses.asc
                    : this.ɵoptions.cssClasses.desc

            ];
        }

        return [this.ɵoptions.cssClasses.none];
    }

    /**
     * @inheritdoc
     */
    public async initialize(force: boolean): Promise<void>
    {
        if(!this.gridPlugins)
        {
            throw new Error('SingleOrderingComponent: missing gridPlugins!');
        }

        const gridInitializer: GridInitializer<SimpleOrdering> = this.gridPlugins.gridInitializer as GridInitializer<SimpleOrdering>;

        //grid initializer obtained and its different instance
        if(force || (this.gridInitializer && this.gridInitializer != gridInitializer))
        {
            this.gridInitializer = null;
        }

        //no grid initializer obtained
        if(!this.gridInitializer)
        {
            this.gridInitializer = gridInitializer;
        }

        const metadataSelector: MetadataSelector<TableGridMetadata> = this.gridPlugins.metadataSelector as MetadataSelector<TableGridMetadata>;

        //metadata selector obtained and its different instance
        if(force || (this.metadataSelector && this.metadataSelector != metadataSelector))
        {
            this.metadataChangeSubscription?.unsubscribe();
            this.metadataChangeSubscription = null;

            this.metadataSelector = null;
        }

        //no metadata selector obtained
        if(!this.metadataSelector)
        {
            this.metadataSelector = metadataSelector;

            this.metadataChangeSubscription = toObservable(this.metadataSelector.metadata, {injector: this.injector}).subscribe(() => this.checkColumns());
        }

        this.orderingValue.set(await this.gridInitializer.getOrdering());
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Checks columns
     */
    protected checkColumns(): void
    {
        if(!this.metadataSelector)
        {
            throw new Error('SingleOrderingComponent: metadata selector is missing!');
        }

        const ordering = this.ordering();

        if(!ordering)
        {
            return;
        }

        //ordering column is not visible
        if(!this.metadataSelector.metadata()?.columns.find(itm => itm.id == ordering.orderBy))
        {
            this.setOrdering(null);
        }
    }
}
