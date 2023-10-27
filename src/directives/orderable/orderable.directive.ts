import {Directive, ElementRef, HostListener, Inject, Injector, Input, OnChanges, OnDestroy, OnInit, Optional, Renderer2, SimpleChanges, booleanAttribute, inject} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {GridPluginInstances} from '../../misc/types';
import {GRID_INSTANCE, GRID_PLUGIN_INSTANCES, ORDERABLE_CELL} from '../../misc/tokens';
import {Grid, GridOrderableCell, OrderableIndicatorRenderer, Ordering} from '../../interfaces';

/**
 * Directive that is used for handling ordering of column
 */
@Directive(
{
    selector: '[orderable]',
    standalone: true,
})
export class OrderableSADirective implements OnInit, OnDestroy, OnChanges
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Subscription for ordering changes
     */
    protected orderingChangeSubscription: Subscription|undefined|null;

    /**
     * Indication whether is grid initialized
     */
    protected gridInitialized: boolean = false;

    /**
     * Current html element that is this directive attached to
     */
    protected element: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * Available instances of grid plugins
     */
    protected plugins: GridPluginInstances = inject(GRID_PLUGIN_INSTANCES);

    /**
     * Instance of renderer used for rendering html
     */
    protected renderer: Renderer2 = inject(Renderer2);

    /**
     * Instance of grid
     */
    protected grid: Grid = inject(GRID_INSTANCE);

    /**
     * Angular injector used for injecting dependencies
     */
    protected injector: Injector = inject(Injector);

    /**
     * Instance of renderer used for rendering ordering 'visual state'
     */
    protected indicatorRenderer: OrderableIndicatorRenderer|undefined|null;

    /**
     * Current css class that is applied to cell
     */
    protected currentCssClass: string|undefined|null;

    /**
     * Gets instance of ordering
     */
    protected get ordering(): Ordering
    {
        return this.plugins.Ordering as Ordering;
    }

    //######################### public properties - inputs #########################

    /**
     * Gets or sets indication whether is column orderable or not
     */
    @Input({transform: booleanAttribute})
    public orderable: boolean = false;

    /**
     * Id of column which should be used for order by
     */
    @Input()
    public orderById: string|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(ORDERABLE_CELL) @Optional() orderable?: GridOrderableCell,)
    {
        if(orderable)
        {
            orderable.orderable = this;
        }
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initSubscriptions.add(this.grid.initialized.subscribe(initialized =>
        {
            this.gridInitialized = initialized;
            this.orderingChangeSubscription?.unsubscribe();
            this.orderingChangeSubscription = null;
            this.initOrdering();            
        }));
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<OrderableSADirective>('orderable') in changes)
        {
            this.initOrdering();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
        this.indicatorRenderer?.destroy(this.element.nativeElement, this.renderer);
    }

    //######################### protected methods - host #########################

    /**
     * Handles click event, that should trigger ordering for column
     * @param event - Event that occured
     */
    @HostListener('click', ['$event'])
    protected orderBy(event: MouseEvent): void
    {
        if(!this.orderable)
        {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if(!this.orderById)
        {
            throw new Error('OrderableSADirective: missing "orderById"');
        }

        const ordering = this.plugins.Ordering as Ordering;

        ordering.orderByColumn(this.orderById);
    }

    //######################### protected methods #########################

    /**
     * Initialized ordering according current ordering flag
     */
    protected initOrdering(): void
    {
        if(this.gridInitialized)
        {
            //remove previous indicator and create new one
            this.indicatorRenderer?.destroy(this.element.nativeElement, this.renderer);
            this.indicatorRenderer = new this.ordering.options.indicatorRenderer();

            //remove previous value
            if(this.currentCssClass)
            {
                for(const cls of this.currentCssClass.split(' '))
                {
                    this.renderer.removeClass(this.element.nativeElement, cls);
                }

                this.currentCssClass = null;
            }

            //is orderable
            if(this.orderable)
            {
                //create indicator and apply current ordering
                this.indicatorRenderer?.create(this.element.nativeElement, this.renderer);
                this.applyCssClasses();

                //add new class
                if(this.ordering.options.cssClasses.orderable)
                {
                    for(const cls of this.ordering.options.cssClasses.orderable.split(' '))
                    {
                        this.renderer.addClass(this.element.nativeElement, cls);
                    }

                    this.currentCssClass = this.ordering.options.cssClasses.orderable;
                }
            }

            this.orderingChangeSubscription = toObservable(this.ordering.ordering, {injector: this.injector}).subscribe(() => this.applyCssClasses());
        }
    }

    /**
     * Applies css classes according current ordering state
     */
    protected applyCssClasses(): void
    {
        if(!this.orderable)
        {
            return;
        }

        if(!this.orderById)
        {
            throw new Error('OrderableSADirective: missing "orderById"');
        }

        this.indicatorRenderer?.apply(this.ordering.getCssClassesForColumn(this.orderById), this.renderer);
    }
}