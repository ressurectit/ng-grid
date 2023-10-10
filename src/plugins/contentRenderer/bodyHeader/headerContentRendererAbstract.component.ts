import {EventEmitter, ChangeDetectorRef, ElementRef, Directive} from '@angular/core';
import {OrderByDirection, RecursivePartial, extend} from '@jscrpt/common';

import {HeaderContentRenderer, BasicOrderableColumn, HeaderContentRendererOptions, CssClassesHeaderContentRenderer} from './bodyHeaderContentRenderer.interface';
import {GridInitializer, GridPlugin, SimpleOrdering} from '../../../interfaces';
import {TableGridMetadata} from '../../../components';
import {GridPluginInstances} from '../../../misc/types';
import {GridPluginType} from '../../../misc/enums';

/**
 * Abstract component for header content renderer
 */
@Directive()
export abstract class HeaderContentRendererAbstractComponent<TData = unknown, TOptions extends HeaderContentRendererOptions<CssClassesHeaderContentRenderer> = HeaderContentRendererOptions<CssClassesHeaderContentRenderer>> implements HeaderContentRenderer<SimpleOrdering, TableGridMetadata<BasicOrderableColumn<TData>>>, GridPlugin<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for header content renderer
     */
    protected ɵoptions: TOptions;

    /**
     * Current ordering state
     */
    protected ɵordering: SimpleOrdering|undefined|null = null;

    /**
     * Instance of grid initializer
     */
    protected gridInitializer: GridInitializer<string>|undefined|null = null;

    //######################### public properties - implementation of TableHeaderContentRenderer #########################

    /**
     * Options for header content renderer
     */
    public get options(): TOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<TOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options) as TOptions;
    }

    /**
     * Metadata used for rendering
     */
    public metadata: TableGridMetadata<BasicOrderableColumn<TData>>|undefined|null;

    /**
     * @inheritdoc
     */
    public get ordering(): SimpleOrdering|undefined|null
    {
        if(!this.ɵordering)
        {
            //TODO: rework
            // this.ɵordering = deserializeSimpleOrdering(this.gridInitializer.getOrdering());
            this.ɵordering = null;

            this.initializeOrderingCss();
        }

        return this.ɵordering;
    }
    public set ordering(ordering: SimpleOrdering|undefined|null)
    {
        //TODO: rework
        // this.gridInitializer.setOrdering(serializeSimpleOrdering(ordering));
        this.ɵordering = ordering;
    }

    /**
     * @inheritdoc
     */
    public orderingChange: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef<HTMLElement>,
                public gridPlugins: GridPluginInstances|undefined|null,
                protected changeDetector: ChangeDetectorRef,
                defaultOptions: TOptions,
                options?: TOptions,)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of TableHeaderContentRenderer #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this.orderingChange.emit();
        this.changeDetector.detectChanges();
    }

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize(): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('HeaderContentRendererAbstractComponent: missing gridPlugins!');
        }

        this.gridInitializer = this.gridPlugins[GridPluginType.GridInitializer] as GridInitializer<string>;
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions(): void
    {
    }

    /**
     * Resets metadata to defaults
     * @param force - Indication whether forcibly reset ordering, otherwise it is reset only if column is not present in displayed metadata
     */
    public resetMetadata(force: boolean = false): void
    {
        //sets initial css classes for all columns
        this.resetOrdering();

        //only if current ordering column was removed from metadata or forced
        if(force || !(!!this.ordering?.orderBy && this.metadata?.columns?.find(itm => itm.name == this.ordering?.orderBy && itm.ordering)))
        {
            this.ordering = null;
            this.resetOrdering();
        }
    }

    //######################### public methods - template bindings #########################

    /**
     * Merges css classes specified as strings
     */
    public mergeStringClasses(...classes: string[]): string[]
    {
        const result: string[] = [];

        classes.forEach(cls => cls ? (result.push(cls)) : null);

        return result;
    }

    /**
     * Applies ordering for specified column
     * @param meta - Metadata for column that was selected for ordering
     */
    public orderBy(meta: BasicOrderableColumn<TData>): void
    {
        if(!meta.ordering)
        {
            return;
        }

        //no ordering, or ordering different column
        if(!this.ordering || this.ordering.orderBy != meta.name)
        {
            this.resetOrdering();

            this.ordering =
            {
                orderByDirection: OrderByDirection.Ascending,
                orderBy: meta.name ?? '',
            };

            meta.orderingClass = this.options.cssClasses.spanOrderingDirection.asc;
            this.orderingChange.emit();
        }
        else if(this.ordering.orderByDirection == OrderByDirection.Ascending)
        {
            this.ordering =
            {
                orderByDirection: OrderByDirection.Descending,
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
    protected resetOrdering(): void
    {
        this.metadata?.columns.forEach(meta => meta.orderingClass = this.options.cssClasses.spanOrderingDirection.none);
    }

    /**
     * Initialize ordering css
     */
    protected initializeOrderingCss(): void
    {
        //initialize css for ordering if set
        if(this.ɵordering?.orderBy)
        {
            const meta = this.metadata?.columns?.find(itm => itm.name == this.ɵordering?.orderBy);

            if(meta)
            {
                switch(this.ɵordering.orderByDirection)
                {
                    case OrderByDirection.Ascending:
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