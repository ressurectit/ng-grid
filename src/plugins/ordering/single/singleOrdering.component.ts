import {ChangeDetectionStrategy, Component, ElementRef, Inject, Optional, inject} from '@angular/core';
import {OrderByDirection, RecursivePartial, extend} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {GridPluginInstances} from '../../../misc/types';
import {SingleOrdering, SingleOrderingOptions} from './singleOrdering.interface';
import {GridInitializer, OrderingOptions, SimpleOrdering} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, ORDERING_OPTIONS} from '../../../misc/tokens';
import {GridPluginType} from '../../../misc/enums';

/**
 * Default options for ordering
 */
const defaultOptions: SingleOrderingOptions =
{
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
    protected orderingChangeSubject: Subject<void> = new Subject<void>();

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
    public ordering: SimpleOrdering|undefined|null;

    /**
     * @inheritdoc
     */
    public get orderingChange(): Observable<void>
    {
        return this.orderingChangeSubject.asObservable();
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
    public setOrdering(ordering: SimpleOrdering|undefined|null, emit: boolean = true): void
    {
        this.ordering = ordering;
        this.gridInitializer?.setOrdering(this.ordering);

        if(emit)
        {
            this.orderingChangeSubject.next();
        }
    }

    /**
     * @inheritdoc
     */
    public orderByColumn(columnId: string): void
    {
        //no ordering, or ordering different column
        if(!this.ordering || this.ordering.orderBy != columnId)
        {
            this.setOrdering(null, false);

            this.ordering =
            {
                orderByDirection: OrderByDirection.Ascending,
                orderBy: columnId,
            };

            this.gridInitializer?.setOrdering(this.ordering);
            this.orderingChangeSubject.next();
        }
        else if(this.ordering.orderByDirection == OrderByDirection.Ascending)
        {
            this.ordering =
            {
                orderByDirection: OrderByDirection.Descending,
                orderBy: columnId
            };

            this.gridInitializer?.setOrdering(this.ordering);
            this.orderingChangeSubject.next();
        }
        else
        {
            this.ordering = null;
            this.gridInitializer?.setOrdering(this.ordering);
            this.orderingChangeSubject.next();
        }
    }

    /**
     * @inheritdoc
     */
    public getCssClassesForColumn(columnId: string): string[]
    {
        if(this.ordering?.orderBy == columnId)
        {
            return [
                this.ordering.orderByDirection == OrderByDirection.Ascending
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

        this.ordering = await this.gridInitializer.getOrdering();
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