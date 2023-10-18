import {Directive, ElementRef, HostListener, Inject, Injector, Input, OnDestroy, OnInit, Optional, Renderer2, booleanAttribute, inject} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Subscription} from 'rxjs';

import {GridPluginInstances} from '../../misc/types';
import {GRID_INSTANCE, GRID_PLUGIN_INSTANCES, ORDERABLE_CELL} from '../../misc/tokens';
import {Grid, GridOrderableCell, Ordering} from '../../interfaces';

//TODO: handle changes in ordering, removing existing ordering - destroy, create, apply

/**
 * Directive that is used for handling ordering of column
 */
@Directive(
{
    selector: '[orderable]',
    standalone: true,
})
export class OrderableSADirective implements OnInit, OnDestroy
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
     * Indication whether is column orderable or not
     */
    protected eorderable: boolean = false;

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
     * Current css classes that are applied element which is displaying current ordering
     */
    protected currentCssClasses: string[] = [];

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
    public get orderable(): boolean
    {
        return this.eorderable;
    }
    public set orderable(value: boolean)
    {
        this.eorderable = value;
    }

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
            this.orderingChangeSubscription?.unsubscribe();
            this.orderingChangeSubscription = null;

            if(initialized)
            {
                this.orderingChangeSubscription = toObservable(this.ordering.ordering, {injector: this.injector}).subscribe(() => this.applyCssClasses());
                
                this.applyCssClasses();

                //remove previous value
                if(this.currentCssClass)
                {
                    for(const cls of this.currentCssClass.split(' '))
                    {
                        this.renderer.removeClass(this.element.nativeElement, cls);
                    }

                    this.currentCssClass = null;
                }

                //add new class
                if(this.orderable && this.ordering.options.cssClasses.orderable)
                {
                    for(const cls of this.ordering.options.cssClasses.orderable.split(' '))
                    {
                        this.renderer.addClass(this.element.nativeElement, cls);
                    }

                    this.currentCssClass = this.ordering.options.cssClasses.orderable;
                }
            }
        }));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
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
     * Method that initialize ordering 
     */
    protected initOrdering(): void
    {
        this.renderer.addClass(this.element.nativeElement, this.ordering.options.cssClasses.orderable);
    }

    /**
     * Applies css classes according current ordering state
     */
    protected applyCssClasses(): void
    {
        if(!this.orderById)
        {
            throw new Error('OrderableSADirective: missing "orderById"');
        }

        const cssClasses = this.ordering.getCssClassesForColumn(this.orderById);

        for(const cssClass of this.currentCssClasses)
        {
            for(const cls of cssClass.split(' '))
            {
                this.renderer.removeClass(this.element.nativeElement, cls);
            }
        }

        if(!this.orderable)
        {
            return;
        }

        this.currentCssClasses = cssClasses;

        for(const cssClass of this.currentCssClasses)
        {
            for(const cls of cssClass.split(' '))
            {
                this.renderer.addClass(this.element.nativeElement, cls);
            }
        }
    }
}