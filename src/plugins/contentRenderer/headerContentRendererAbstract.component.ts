import {Injectable, EventEmitter, ChangeDetectorRef, ElementRef} from "@angular/core";
import {Utils, OrderByDirection} from "@anglr/common";

import {GridPluginInstances} from "../../components/grid";
import {HeaderContentRenderer, SimpleOrdering, BasicOrderableColumn, HeaderContentRendererOptions, CssClassesHeaderContentRenderer} from "./contentRenderer.interface";
import {GridPluginGeneric} from "../../misc";

/**
 * Abstract component for header content renderer
 */
@Injectable()
export class HeaderContentRendererAbstractComponent<TData, TOptions extends HeaderContentRendererOptions<CssClassesHeaderContentRenderer>> implements HeaderContentRenderer<SimpleOrdering, BasicOrderableColumn<TData>[]>, GridPluginGeneric<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for header content renderer
     */
    protected _options: TOptions;

    //######################### public properties - implementation of TableHeaderContentRenderer #########################

    /**
     * Options for header content renderer
     */
    public set options(options: TOptions)
    {
        this._options = Utils.common.extend(true, this._options, options) as TOptions;
    }
    public get options(): TOptions
    {
        return this._options;
    }

    /**
     * Metadata used for rendering
     */
    public metadata: BasicOrderableColumn<TData>[];

    /**
     * Current ordering state
     */
    public ordering: SimpleOrdering = null;

    /**
     * Occurs when ordering has changed
     */
    public orderingChange: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Grid plugin instances available for this plugin
     */
    public gridPlugins: GridPluginInstances;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                protected _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of TableHeaderContentRenderer #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this.orderingChange.emit();
        this._changeDetector.detectChanges();
    }

    /**
     * Initialize plugin, to be ready to use
     */
    public initialize()
    {
    }

    /**
     * Resets metadata to defaults
     */
    public resetMetadata(): void
    {
        this.ordering = null;
        this._resetOrdering();
    }

    //######################### public methods - template bindings #########################

    /**
     * Merges css classes specified as strings
     */
    public mergeStringClasses(...classes: string[])
    {
        let result = [];

        classes.forEach(cls => cls ? (result.push(cls)) : null);

        return result;
    }

    /**
     * Applies ordering for specified column
     * @param {BasicOrderableColumn<TData>} meta Metadata for column that was selected for ordering
     */
    public orderBy(meta: BasicOrderableColumn<TData>)
    {
        if(!meta.ordering)
        {
            return;
        }

        //no ordering, or ordering different column
        if(!this.ordering || this.ordering.orderBy != meta.name)
        {
            this._resetOrdering();

            this.ordering =
            {
                orderByDirection: OrderByDirection.Ascendant,
                orderBy: meta.name
            };

            meta.orderingClass = this.options.cssClasses.spanOrderingDirection.asc;
            this.orderingChange.emit();
        }
        else if(this.ordering.orderByDirection == OrderByDirection.Ascendant)
        {
            this.ordering =
            {
                orderByDirection: OrderByDirection.Descendant,
                orderBy: meta.name
            };

            meta.orderingClass = this.options.cssClasses.spanOrderingDirection.desc;
            this.orderingChange.emit();
        }
        else
        {
            this.ordering = null;
            meta.orderingClass = this.options.cssClasses.spanOrderingDirection.none;
            this.orderingChange.emit();
        }
    }

    //######################### private methods #########################

    /**
     * Resets ordering to none
     */
    private _resetOrdering()
    {
        this.metadata.forEach(meta => meta.orderingClass = this.options.cssClasses.spanOrderingDirection.none);
    }
}