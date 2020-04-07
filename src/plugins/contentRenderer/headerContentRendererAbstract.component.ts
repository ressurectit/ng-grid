import {EventEmitter, ChangeDetectorRef, ElementRef} from "@angular/core";
import {OrderByDirection, extend} from "@jscrpt/common";

import {GridPluginInstances} from "../../components/grid";
import {HeaderContentRenderer, SimpleOrdering, BasicOrderableColumn, HeaderContentRendererOptions, CssClassesHeaderContentRenderer} from "./contentRenderer.interface";
import {GridPluginGeneric} from "../../misc";
import {BasicTableMetadata} from "../../components/metadata";
import {GridInitializer} from '../gridInitializer';
import {GRID_INITIALIZER} from '../gridInitializer/types';
import {deserializeSimpleOrdering, serializeSimpleOrdering} from './types';

/**
 * Abstract component for header content renderer
 */
export abstract class HeaderContentRendererAbstractComponent<TData, TOptions extends HeaderContentRendererOptions<CssClassesHeaderContentRenderer>> implements HeaderContentRenderer<SimpleOrdering, BasicTableMetadata<BasicOrderableColumn<TData>>>, GridPluginGeneric<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for header content renderer
     */
    protected _options: TOptions;

    /**
     * Current ordering state
     */
    protected _ordering: SimpleOrdering = null;

    /**
     * Instance of grid initializer
     */
    protected _gridInitializer: GridInitializer = null;

    //######################### public properties - implementation of TableHeaderContentRenderer #########################

    /**
     * Options for header content renderer
     */
    public get options(): TOptions
    {
        return this._options;
    }
    public set options(options: TOptions)
    {
        this._options = extend(true, this._options, options) as TOptions;
    }

    /**
     * Metadata used for rendering
     */
    public metadata: BasicTableMetadata<BasicOrderableColumn<TData>>;

    /**
     * Current ordering state
     */
    public get ordering(): SimpleOrdering
    {
        if(!this._ordering)
        {
            this._ordering = deserializeSimpleOrdering(this._gridInitializer.getOrdering());

            this._initializeOrderingCss();
        }

        return this._ordering;
    }
    public set ordering(ordering: SimpleOrdering)
    {
        this._gridInitializer.setOrdering(serializeSimpleOrdering(ordering));
        this._ordering = ordering;
    }

    /**
     * Occurs when ordering has changed
     */
    public orderingChange: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                public gridPlugins: GridPluginInstances,
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
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
        this._gridInitializer = this.gridPlugins[GRID_INITIALIZER] as GridInitializer;
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions()
    {
    }

    /**
     * Resets metadata to defaults
     * @param force - Indication whether forcibly reset ordering, otherwise it is reset only if column is not present in displayed metadata
     */
    public resetMetadata(force: boolean = false): void
    {
        //only if current ordering column was removed from metadata or forced
        if(force || !(!!this.ordering?.orderBy && this.metadata?.columns?.find(itm => itm.name == this.ordering.orderBy && itm.ordering)))
        {
            this.ordering = null;
            this._resetOrdering();
        }
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
     * @param meta - Metadata for column that was selected for ordering
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

    //######################### protected methods #########################

    /**
     * Resets ordering to none
     */
    protected _resetOrdering()
    {
        this.metadata.columns.forEach(meta => meta.orderingClass = this.options.cssClasses.spanOrderingDirection.none);
    }

    /**
     * Initialize ordering css
     */
    protected _initializeOrderingCss()
    {
        //initialize css for ordering if set
        if(!!this._ordering?.orderBy)
        {
            let meta = this.metadata?.columns?.find(itm => itm.name == this._ordering.orderBy);

            if(meta)
            {
                switch(this._ordering.orderByDirection)
                {
                    case OrderByDirection.Ascendant:
                    {
                        meta.orderingClass = this.options.cssClasses.spanOrderingDirection.asc;

                        break;
                    }
                    default:
                    //case OrderByDirection.Descendant:
                    {
                        meta.orderingClass = this.options.cssClasses.spanOrderingDirection.desc;

                        break;
                    }
                }
            }
        }
    }
}