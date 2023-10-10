import {OnDestroy, resolveForwardRef, Directive, ElementRef, HostBinding} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import {ContentRenderer, CssClassesContentRenderer, DataLoader, DataResponse, GridMetadata, GridPlugin, MetadataSelector} from '../../../interfaces';
import {BodyContentRenderer, ContentRendererPlugins, HeaderBodyContentRendererOptions, HeaderContentRenderer} from './bodyHeaderContentRenderer.interface';
import {GridPluginInstances} from '../../../misc/types';
import {GridPluginType} from '../../../misc/enums';

/**
 * Abstract component for content renderers
 */
@Directive()
export abstract class BodyHeaderContentRendererAbstractComponent<TOrdering = unknown, TData = unknown, TMetadata extends GridMetadata = GridMetadata, TOptions extends HeaderBodyContentRendererOptions<CssClassesContentRenderer, ContentRendererPlugins> = HeaderBodyContentRendererOptions<CssClassesContentRenderer, ContentRendererPlugins>> implements ContentRenderer<TOrdering>, OnDestroy, GridPlugin<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for content renderer
     */
    protected ɵoptions: TOptions;

    /**
     * Metadata selector currently used
     */
    protected metadataSelector: MetadataSelector<TMetadata>|undefined|null;

    /**
     * Data loader currently used
     */
    protected dataLoader: DataLoader<DataResponse<TData>>|undefined|null;

    /**
     * Subscription listening for metadata changes
     */
    protected metadataChangedSubscription: Subscription|undefined|null;

    /**
     * Subscription listening for data changes
     */
    protected dataChangedSubscription: Subscription|undefined|null;

    /**
     * Subscription listening for ordering changes
     */
    protected orderingChangedSubscription: Subscription|undefined|null;

    /**
     * Subject used for emitting changes in ordering
     */
    protected orderingChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Null safe grid plugin instances
     */
    protected get gridPluginsInstance(): GridPluginInstances
    {
        if(!this.gridPlugins)
        {
            throw new Error('BodyHeaderContentRendererAbstractComponent: missing gridPlugins!');
        }

        return this.gridPlugins;
    }

    //######################### public properties - implementation of TableContentRenderer #########################

    /**
     * Options for content renderer
     */
    public get options(): TOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<TOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
    }

    /**
     * @inheritdoc
     */
    public get ordering(): TOrdering|undefined|null
    {
        const headerRenderer: HeaderContentRenderer<TOrdering, TMetadata> = this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType] as HeaderContentRenderer<TOrdering, TMetadata>;

        return headerRenderer ? headerRenderer.ordering : null;
    }
    public set ordering(ordering: TOrdering)
    {
        const headerRenderer: HeaderContentRenderer<TOrdering, TMetadata> = this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType] as HeaderContentRenderer<TOrdering, TMetadata>;

        if(headerRenderer)
        {
            headerRenderer.ordering = ordering;
        }

        headerRenderer.invalidateVisuals();
    }

    /**
     * Indication that ordering has changed
     */
    public get orderingChange(): Observable<void>
    {
        return this.orderingChangeSubject.asObservable();
    }

    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this.ɵoptions.cssClasses.containerDiv;
    }

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                public gridPlugins: GridPluginInstances|undefined|null,
                defaultOptions: TOptions,
                options?: TOptions,)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.metadataChangedSubscription?.unsubscribe();
        this.metadataChangedSubscription = null;

        this.orderingChangedSubscription?.unsubscribe();
        this.orderingChangedSubscription = null;

        this.dataChangedSubscription?.unsubscribe();
        this.dataChangedSubscription = null;
    }

    //######################### public methods - implementation of TableContentRenderer #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this.ɵinvalidateVisuals();
    }

    /**
     * @inheritdoc
     */
    public initialize(): void
    {
        const metadataSelector: MetadataSelector<TMetadata> = this.gridPluginsInstance[GridPluginType.MetadataSelector] as MetadataSelector<TMetadata>;

        if(this.metadataSelector && this.metadataSelector != metadataSelector)
        {
            this.metadataChangedSubscription?.unsubscribe();
            this.metadataChangedSubscription = null;
            this.metadataSelector = null;
        }

        if(!this.metadataSelector)
        {
            this.metadataSelector = metadataSelector;

            this.metadataChangedSubscription = this.metadataSelector.metadataChange.subscribe(() => this.ɵinvalidateVisuals());
        }

        const dataLoader: DataLoader<DataResponse<TData>> = this.gridPluginsInstance[GridPluginType.DataLoader] as DataLoader<DataResponse<TData>>;

        if(this.dataLoader && this.dataLoader != dataLoader)
        {
            this.dataChangedSubscription?.unsubscribe();
            this.dataChangedSubscription = null;
            this.dataLoader = null;
        }

        if(!this.dataLoader)
        {
            this.dataLoader = dataLoader;

            this.dataChangedSubscription = this.dataLoader.resultChange.subscribe(() => this.ɵinvalidateVisuals());
        }

        this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType].initialize();
        this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType].initialize();

        this.ɵinvalidateVisuals();
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
        if(this.ɵoptions.plugins)
        {
            if(this.ɵoptions.plugins.bodyRenderer)
            {
                this.ɵoptions.plugins.bodyRenderer.type = resolveForwardRef(this.ɵoptions.plugins.bodyRenderer.type);

                if(this.ɵoptions.plugins.bodyRenderer.instance &&
                   this.ɵoptions.plugins.bodyRenderer.instance != this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType])
                {
                    this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType] = this.ɵoptions.plugins.bodyRenderer.instance;
                    this.ɵoptions.plugins.bodyRenderer.instance.gridPlugins = this.gridPlugins;
                }

                if(this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType])
                {
                    if(this.ɵoptions.plugins && this.ɵoptions.plugins.bodyRenderer && this.ɵoptions.plugins.bodyRenderer.options)
                    {
                        this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType].options = this.ɵoptions.plugins.bodyRenderer.options;
                    }

                    this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType].initOptions();
                }
            }

            if(this.ɵoptions.plugins.headerRenderer)
            {
                this.ɵoptions.plugins.headerRenderer.type = resolveForwardRef(this.ɵoptions.plugins.headerRenderer.type);

                if(this.ɵoptions.plugins.headerRenderer.instance &&
                   this.ɵoptions.plugins.headerRenderer.instance != this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType])
                {
                    this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType] = this.ɵoptions.plugins.headerRenderer.instance;
                    this.ɵoptions.plugins.headerRenderer.instance.gridPlugins = this.gridPlugins;

                    if(this.orderingChangedSubscription)
                    {
                        this.orderingChangedSubscription.unsubscribe();
                        this.orderingChangedSubscription = null;
                    }

                    this.orderingChangedSubscription = this.ɵoptions.plugins.headerRenderer.instance.orderingChange.subscribe(() => this.orderingChangeSubject.next());
                }

                if(this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType])
                {
                    if(this.ɵoptions.plugins && this.ɵoptions.plugins.headerRenderer && this.ɵoptions.plugins.headerRenderer.options)
                    {
                        this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType].options = this.ɵoptions.plugins.headerRenderer.options;
                    }

                    this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType].initOptions();
                }
            }
        }
    }

    //######################### protected methods - template bindings #########################

    /**
     * Sets body renderer component
     * @param bodyRenderer - Created body renderer that is rendered
     */
    protected setBodyRendererComponent(bodyRenderer: BodyContentRenderer<TData, TMetadata>|undefined|null): void
    {
        if(!bodyRenderer)
        {
            return;
        }

        this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType] = bodyRenderer;

        if(this.ɵoptions.plugins && this.ɵoptions.plugins.bodyRenderer && this.ɵoptions.plugins.bodyRenderer.options)
        {
            bodyRenderer.options = this.ɵoptions.plugins.bodyRenderer.options;
        }

        bodyRenderer.initOptions();

        if(this.ɵoptions.plugins && this.ɵoptions.plugins.bodyRenderer && this.ɵoptions.plugins.bodyRenderer.instanceCallback)
        {
            this.ɵoptions.plugins.bodyRenderer.instanceCallback(bodyRenderer);
        }
    }

    /**
     * Sets header renderer component
     * @param headerRenderer - Created header renderer that is rendered
     */
    protected setHeaderRendererComponent(headerRenderer: HeaderContentRenderer<TOrdering, TMetadata>|undefined|null): void
    {
        if(!headerRenderer)
        {
            return;
        }

        this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType] = headerRenderer;

        if(this.ɵoptions.plugins && this.ɵoptions.plugins.headerRenderer && this.ɵoptions.plugins.headerRenderer.options)
        {
            headerRenderer.options = this.ɵoptions.plugins.headerRenderer.options;
        }

        headerRenderer.initOptions();

        if(this.ɵoptions.plugins && this.ɵoptions.plugins.headerRenderer && this.ɵoptions.plugins.headerRenderer.instanceCallback)
        {
            this.ɵoptions.plugins.headerRenderer.instanceCallback(headerRenderer);
        }

        if(this.orderingChangedSubscription)
        {
            this.orderingChangedSubscription.unsubscribe();
            this.orderingChangedSubscription = null;
        }

        this.orderingChangedSubscription = headerRenderer.orderingChange.subscribe(() => this.orderingChangeSubject.next());
    }

    //######################### protected methods #########################

    /**
     * Invalidates visuals, redraw template
     */
    protected ɵinvalidateVisuals(): void
    {
        const bodyRenderer: BodyContentRenderer<TData, TMetadata> = this.gridPluginsInstance['BODY_CONTENT_RENDERER' as unknown as GridPluginType] as BodyContentRenderer<TData, TMetadata>;
        const headerRenderer: HeaderContentRenderer<TOrdering, TMetadata> = this.gridPluginsInstance['HEADER_CONTENT_RENDERER' as unknown as GridPluginType] as HeaderContentRenderer<TOrdering, TMetadata>;

        if(headerRenderer.metadata != this.metadataSelector?.metadata)
        {
            headerRenderer.metadata = this.metadataSelector?.metadata;
            headerRenderer.resetMetadata();
            headerRenderer.invalidateVisuals();
        }

        if(bodyRenderer.data != this.dataLoader?.result.data || bodyRenderer.metadata != this.metadataSelector?.metadata)
        {
            bodyRenderer.data = this.dataLoader?.result.data ?? [];
            bodyRenderer.metadata = this.metadataSelector?.metadata;
            bodyRenderer.invalidateVisuals();
        }
    }
}