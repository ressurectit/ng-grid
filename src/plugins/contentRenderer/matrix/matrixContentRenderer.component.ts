import {Component, ChangeDetectionStrategy, inject, ElementRef, Inject, Optional, ValueProvider, TemplateRef, ViewChild, ViewContainerRef, OnDestroy, FactoryProvider} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {MatrixContentRenderer, MatrixContentRendererOptions} from './matrixContentRenderer.interface';
import {ContentRendererCurrentViewContainer, GridContext, GridPlugin, MatrixGridMetadata, MetadataSelector} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';
import {CONTENT_RENDERER_CURRENT_VIEW_CONTAINER, CONTENT_RENDERER_OPTIONS, DEFAULT_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../misc/tokens';
import {GridContainerSAComponent} from '../../../components/gridContainer/gridContainer.component';
import {GridContainerTemplateSADirective} from '../../../directives/gridContainerTemplate/gridContainerTemplate.directive';

//TODO: first version will rerender whole content on changes of metadata, better checking should be implemented

/**
 * Default 'GridOptions'
 */
const defaultOptions: MatrixContentRendererOptions =
{
    cssClasses:
    {
    },
};

/**
 * Component used for rendering content using new 'matrix' metadata gatherer
 */
@Component(
{
    selector: 'div.matrix-content-renderer',
    templateUrl: 'matrixContentRenderer.component.html',
    // styleUrls: ['matrixContentRenderer.component.css'],
    standalone: true,
    imports:
    [
        GridContainerSAComponent,
        GridContainerTemplateSADirective,

    ],
    providers:
    [
        <ValueProvider>
        {
            provide: DEFAULT_OPTIONS,
            useValue: defaultOptions,
        },
        <FactoryProvider>
        {
            provide: CONTENT_RENDERER_CURRENT_VIEW_CONTAINER,
            useFactory: () => 
            {
                return <ContentRendererCurrentViewContainer> {
                    viewContainer: undefined,
                };
            }
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixContentRendererSAComponent implements MatrixContentRenderer, GridPlugin<MatrixContentRendererOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options for matrix content renderer
     */
    protected ɵoptions: MatrixContentRendererOptions;

    /**
     * Metadata selector currently used
     */
    protected metadataSelector: MetadataSelector<MatrixGridMetadata>|undefined|null;

    /**
     * Subscription for metadata changes
     */
    protected metadataChangeSubscription: Subscription|undefined|null;

    //######################### public properties - implementation of MatrixContentRenderer #########################

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null = inject(GRID_PLUGIN_INSTANCES);

    /**
     * @inheritdoc
     */
    readonly pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * @inheritdoc
     */
    public get options(): MatrixContentRendererOptions
    {
        return this.ɵoptions;
    }
    public set options(value: RecursivePartial<MatrixContentRendererOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, value);
    }

    //######################### protected properties - children #########################

    /**
     * Default grid container template
     */
    @ViewChild(GridContainerTemplateSADirective, {static: true, read: TemplateRef})
    protected defaultGridContainerTemplate!: TemplateRef<GridContext>;

    /**
     * Default container used for rendering content
     */
    @ViewChild('container', {static: true, read: ViewContainerRef})
    protected container!: ViewContainerRef;

    //######################### constructor #########################
    constructor(@Inject(DEFAULT_OPTIONS) defaultOptions: MatrixContentRendererOptions,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: RecursivePartial<MatrixContentRendererOptions>,)
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

    //######################### public methods - implementation of MatrixContentRenderer #########################

    /**
     * @inheritdoc
     */
    public initialize(force: boolean): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('MatrixContentRendererSAComponent: missing gridPlugins!');
        }

        const metadataSelector: MetadataSelector<MatrixGridMetadata> = this.gridPlugins.MetadataSelector as MetadataSelector<MatrixGridMetadata>;

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

            this.metadataChangeSubscription = this.metadataSelector.metadataChange.subscribe(() => this.renderGridContainer());
        }

        this.renderGridContainer();
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
     * Renders grid container
     */
    protected renderGridContainer(): void
    {
        this.container.clear();
        this.container.createEmbeddedView(this.metadataSelector?.metadata?.gridContainer ?? this.defaultGridContainerTemplate);
    }
}