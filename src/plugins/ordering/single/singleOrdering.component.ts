import {ChangeDetectionStrategy, Component, ElementRef, Inject, Optional, Signal, WritableSignal, inject, signal} from '@angular/core';
import {OrderByDirection, RecursivePartial, extend} from '@jscrpt/common';

import {SingleOrdering, SingleOrderingOptions} from './singleOrdering.interface';
import {GridInitializer, GridPluginInstances, OrderingOptions, SimpleOrdering} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, ORDERING_OPTIONS} from '../../../misc/tokens';
import {GridPluginType} from '../../../misc/enums';
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
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleOrderingSAComponent implements SingleOrdering
{
    //######################### protected fields #########################

    /**
     * Subject used for emitting changes in ordering
     */
    protected ɵordering: WritableSignal<SimpleOrdering|undefined|null> = signal(undefined);

    /**
     * Instance of options
     */
    public ɵoptions: OrderingOptions;

    /**
     * Grid initializer currently used
     */
    protected gridInitializer: GridInitializer<SimpleOrdering>|undefined|null;

    //######################### public properties - implementation of SimpleOrdering #########################

    /**
     * @inheritdoc
     */
    public get ordering(): Signal<SimpleOrdering|undefined|null>
    {
        return this.ɵordering.asReadonly();
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

    //######################### public methods - implementation of SimpleOrdering #########################

    /**
     * @inheritdoc
     */
    public setOrdering(ordering: SimpleOrdering|undefined|null): void
    {
        this.ɵordering.set(ordering);
        this.gridInitializer?.setOrdering(this.ɵordering());
    }

    /**
     * @inheritdoc
     */
    public orderByColumn(columnId: string): void
    {
        //no ordering, or ordering different column
        const ordering = this.ɵordering();
        let newOrdering: SimpleOrdering|undefined|null;

        if(!ordering || ordering.orderBy != columnId)
        {
            newOrdering = 
            {
                orderByDirection: OrderByDirection.Ascending,
                orderBy: columnId,
            };

            this.ɵordering.set(newOrdering);
        }
        else if(ordering.orderByDirection == OrderByDirection.Ascending)
        {
            newOrdering = 
            {
                orderByDirection: OrderByDirection.Descending,
                orderBy: columnId
            };

            this.ɵordering.set(newOrdering);
        }
        else
        {
            newOrdering = null;
            this.ɵordering.set(newOrdering);
        }

        this.gridInitializer?.setOrdering(newOrdering);
    }

    /**
     * @inheritdoc
     */
    public getCssClassesForColumn(columnId: string): string[]
    {
        const ordering = this.ɵordering();

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
            throw new Error('SingleOrderingSAComponent: missing gridPlugins!');
        }

        const gridInitializer: GridInitializer<SimpleOrdering> = this.gridPlugins[GridPluginType.GridInitializer] as GridInitializer<SimpleOrdering>;

        //grid initializer obtained and its different instance
        if(force || (this.gridInitializer && this.gridInitializer != gridInitializer))
        {
            this.gridInitializer = null;
        }

        //no data loader obtained
        if(!this.gridInitializer)
        {
            this.gridInitializer = gridInitializer;
        }

        this.ɵordering.set(await this.gridInitializer.getOrdering());
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
}