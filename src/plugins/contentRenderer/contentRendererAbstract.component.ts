import {EventEmitter, Inject, OnDestroy, resolveForwardRef, Injectable, ElementRef, Optional} from "@angular/core";
import {extend} from "@jscrpt/common";
import {Subscription} from "rxjs";

import {GridPluginInstances} from "../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../components/grid/types";
import {ContentRendererPlugins, ContentRendererOptions, ContentRenderer, HeaderContentRenderer, HEADER_CONTENT_RENDERER, BodyContentRenderer, BODY_CONTENT_RENDERER} from "./contentRenderer.interface";
import {MetadataSelector} from "../metadataSelector";
import {METADATA_SELECTOR} from "../metadataSelector/types";
import {DataResponse, DataLoader, DATA_LOADER} from "../dataLoader";
import {GridPluginGeneric} from "../../misc";

/**
 * Abstract component for content renderers
 */
@Injectable()
export class ContentRendererAbstractComponent<TOrdering, TData, TMetadata, TOptions extends ContentRendererOptions<any, ContentRendererPlugins>> implements ContentRenderer<TOrdering>, OnDestroy, GridPluginGeneric<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for content renderer
     */
    protected _options: TOptions;

    /**
     * Metadata selector currently used
     */
    protected _metadataSelector: MetadataSelector<TMetadata>;

    /**
     * Data loader currently used
     */
    protected _dataLoader: DataLoader<DataResponse<TData>>;

    /**
     * Subscription listening for metadata changes
     */
    protected _metadataChangedSubscription: Subscription;

    /**
     * Subscription listening for data changes
     */
    protected _dataChangedSubscription: Subscription;

    /**
     * Subscription listening for ordering changes
     */
    protected _orderingChangedSubscription: Subscription;

    //######################### public properties - implementation of TableContentRenderer #########################

    /**
     * Options for content renderer
     */
    public set options(options: TOptions)
    {
        this._options = extend(true, this._options, options) as TOptions;
    }
    public get options(): TOptions
    {
        return this._options;
    }

    /**
     * Information about current ordering state
     */
    public get ordering(): TOrdering
    {
        let headerRenderer: HeaderContentRenderer<TOrdering, TMetadata> = this.gridPlugins[HEADER_CONTENT_RENDERER] as HeaderContentRenderer<TOrdering, TMetadata>;

        return headerRenderer ? headerRenderer.ordering : null;
    }
    public set ordering(ordering: TOrdering)
    {
        let headerRenderer: HeaderContentRenderer<TOrdering, TMetadata> = this.gridPlugins[HEADER_CONTENT_RENDERER] as HeaderContentRenderer<TOrdering, TMetadata>;

        if(headerRenderer)
        {
            headerRenderer.ordering = ordering;
        }

        headerRenderer.invalidateVisuals();
    }

    /**
     * Indication that ordering has changed
     */
    public orderingChange: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._metadataChangedSubscription)
        {
            this._metadataChangedSubscription.unsubscribe();
            this._metadataChangedSubscription = null;
        }

        if(this._orderingChangedSubscription)
        {
            this._orderingChangedSubscription.unsubscribe();
            this._orderingChangedSubscription = null;
        }

        if(this._dataChangedSubscription)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;
        }
    }

    //######################### public methods - implementation of TableContentRenderer #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._invalidateVisuals();
    }

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
        let metadataSelector: MetadataSelector<TMetadata> = this.gridPlugins[METADATA_SELECTOR] as MetadataSelector<TMetadata>;

        if(this._metadataSelector && this._metadataSelector != metadataSelector)
        {
            this._metadataChangedSubscription.unsubscribe();
            this._metadataChangedSubscription = null;
            this._metadataSelector = null;
        }

        if(!this._metadataSelector)
        {
            this._metadataSelector = metadataSelector;

            this._metadataChangedSubscription = this._metadataSelector.metadataChange.subscribe(() => this._invalidateVisuals());
        }

        let dataLoader: DataLoader<DataResponse<TData>> = this.gridPlugins[DATA_LOADER] as DataLoader<DataResponse<TData>>;

        if(this._dataLoader && this._dataLoader != dataLoader)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;
            this._dataLoader = null;
        }

        if(!this._dataLoader)
        {
            this._dataLoader = dataLoader;

            this._dataChangedSubscription = this._dataLoader.resultChange.subscribe(() => this._invalidateVisuals());
        }

        this.gridPlugins[HEADER_CONTENT_RENDERER].initialize();
        this.gridPlugins[BODY_CONTENT_RENDERER].initialize();

        this._invalidateVisuals();
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions()
    {
        if(this._options.plugins)
        {
            if(this._options.plugins.bodyRenderer)
            {
                this._options.plugins.bodyRenderer.type = resolveForwardRef(this._options.plugins.bodyRenderer.type);

                if(this._options.plugins.bodyRenderer.instance &&
                   this._options.plugins.bodyRenderer.instance != this.gridPlugins[BODY_CONTENT_RENDERER])
                {
                    this.gridPlugins[BODY_CONTENT_RENDERER] = this._options.plugins.bodyRenderer.instance;
                    this._options.plugins.bodyRenderer.instance.gridPlugins = this.gridPlugins;
                }

                if(this.gridPlugins[BODY_CONTENT_RENDERER])
                {
                    if(this._options.plugins && this._options.plugins.bodyRenderer && this._options.plugins.bodyRenderer.options)
                    {
                        this.gridPlugins[BODY_CONTENT_RENDERER].options = this._options.plugins.bodyRenderer.options;
                    }

                    this.gridPlugins[BODY_CONTENT_RENDERER].initOptions();
                }
            }

            if(this._options.plugins.headerRenderer)
            {
                this._options.plugins.headerRenderer.type = resolveForwardRef(this._options.plugins.headerRenderer.type);

                if(this._options.plugins.headerRenderer.instance &&
                   this._options.plugins.headerRenderer.instance != this.gridPlugins[HEADER_CONTENT_RENDERER])
                {
                    this.gridPlugins[HEADER_CONTENT_RENDERER] = this._options.plugins.headerRenderer.instance;
                    this._options.plugins.headerRenderer.instance.gridPlugins = this.gridPlugins;

                    if(this._orderingChangedSubscription)
                    {
                        this._orderingChangedSubscription.unsubscribe();
                        this._orderingChangedSubscription = null;
                    }

                    this._orderingChangedSubscription = this._options.plugins.headerRenderer.instance.orderingChange.subscribe(() => this.orderingChange.emit());
                }

                if(this.gridPlugins[HEADER_CONTENT_RENDERER])
                {
                    if(this._options.plugins && this._options.plugins.headerRenderer && this._options.plugins.headerRenderer.options)
                    {
                        this.gridPlugins[HEADER_CONTENT_RENDERER].options = this._options.plugins.headerRenderer.options;
                    }

                    this.gridPlugins[HEADER_CONTENT_RENDERER].initOptions();
                }
            }
        }
    }

    //######################### public methods - template bindings #########################

    /**
     * Sets body renderer component
     * @param bodyRenderer Created body renderer that is rendered
     * @internal
     */
    public setBodyRendererComponent(bodyRenderer: BodyContentRenderer<TData, TMetadata>)
    {
        if(!bodyRenderer)
        {
            return;
        }

        this.gridPlugins[BODY_CONTENT_RENDERER] = bodyRenderer;

        if(this._options.plugins && this._options.plugins.bodyRenderer && this._options.plugins.bodyRenderer.options)
        {
            bodyRenderer.options = this._options.plugins.bodyRenderer.options;
        }

        bodyRenderer.initOptions();

        if(this._options.plugins && this._options.plugins.bodyRenderer && this._options.plugins.bodyRenderer.instanceCallback)
        {
            this._options.plugins.bodyRenderer.instanceCallback(bodyRenderer);
        }
    }

    /**
     * Sets header renderer component
     * @param headerRenderer Created header renderer that is rendered
     * @internal
     */
    public setHeaderRendererComponent(headerRenderer: HeaderContentRenderer<TOrdering, TMetadata>)
    {
        if(!headerRenderer)
        {
            return;
        }

        this.gridPlugins[HEADER_CONTENT_RENDERER] = headerRenderer;

        if(this._options.plugins && this._options.plugins.headerRenderer && this._options.plugins.headerRenderer.options)
        {
            headerRenderer.options = this._options.plugins.headerRenderer.options;
        }

        headerRenderer.initOptions();

        if(this._options.plugins && this._options.plugins.headerRenderer && this._options.plugins.headerRenderer.instanceCallback)
        {
            this._options.plugins.headerRenderer.instanceCallback(headerRenderer);
        }

        if(this._orderingChangedSubscription)
        {
            this._orderingChangedSubscription.unsubscribe();
            this._orderingChangedSubscription = null;
        }

        this._orderingChangedSubscription = headerRenderer.orderingChange.subscribe(() => this.orderingChange.emit());
    }

    //######################### protected methods #########################

    /**
     * Invalidates visuals, redraw template
     */
    protected _invalidateVisuals()
    {
        let bodyRenderer: BodyContentRenderer<TData, TMetadata> = this.gridPlugins[BODY_CONTENT_RENDERER] as BodyContentRenderer<TData, TMetadata>;
        let headerRenderer: HeaderContentRenderer<TOrdering, TMetadata> = this.gridPlugins[HEADER_CONTENT_RENDERER] as HeaderContentRenderer<TOrdering, TMetadata>;

        if(headerRenderer.metadata != this._metadataSelector.metadata)
        {
            headerRenderer.metadata = this._metadataSelector.metadata;
            headerRenderer.resetMetadata();
            headerRenderer.invalidateVisuals();
        }

        if(bodyRenderer.data != this._dataLoader.result.data || bodyRenderer.metadata != this._metadataSelector.metadata)
        {
            bodyRenderer.data = this._dataLoader.result.data;
            bodyRenderer.metadata = this._metadataSelector.metadata;
            bodyRenderer.invalidateVisuals();
        }
    }
}