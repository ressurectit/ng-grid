import {Component, ChangeDetectionStrategy, inject, ElementRef, Inject, Optional, ValueProvider, TemplateRef, ViewChild, ViewContainerRef, OnDestroy, FactoryProvider, Injector} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {MatrixContentRenderer, MatrixContentRendererOptions} from './matrixContentRenderer.interface';
import {ContentRendererCurrentViewContainer, DataLoader, DataResponse, Grid, GridContext, GridPlugin, MatrixGridMetadata, MetadataSelector} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';
import {CONTENT_RENDERER_CURRENT_VIEW_CONTAINER, CONTENT_RENDERER_OPTIONS, DEFAULT_OPTIONS, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../../misc/tokens';
import {GridContainerSAComponent} from '../../../components/gridContainer/gridContainer.component';
import {GridContainerTemplateSADirective} from '../../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import {ContentContainerSAComponent} from '../../../components/contentContainer/contentContainer.component';
import {ContentContainerTemplateSADirective} from '../../../directives/contentContainerTemplate/contentContainerTemplate.directive';

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
        ContentContainerSAComponent,
        GridContainerTemplateSADirective,
        ContentContainerTemplateSADirective,
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
     * Instance of class that is used for sharing current view container
     */
    protected sharedViewContainer: ContentRendererCurrentViewContainer = inject(CONTENT_RENDERER_CURRENT_VIEW_CONTAINER);

    /**
     * Options for matrix content renderer
     */
    protected ɵoptions: MatrixContentRendererOptions;

    /**
     * Instance of grid itself
     */
    protected grid: Grid = inject(GRID_INSTANCE);

    /**
     * Gets plugins instances safely
     */
    protected get gridPluginsSafe(): GridPluginInstances
    {
        if(!this.gridPlugins)
        {
            throw new Error('MatrixContentRendererSAComponent: missing gridPlugins!');
        }

        return this.gridPlugins;
    }

    /**
     * Metadata selector currently used
     */
    protected metadataSelector: MetadataSelector<MatrixGridMetadata>|undefined|null;

    /**
     * Data loader currently used
     */
    protected dataLoader: DataLoader<DataResponse>|undefined|null;

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
     * Default content container template
     */
    @ViewChild(ContentContainerTemplateSADirective, {static: true, read: TemplateRef})
    protected defaultContentContainerTemplate!: TemplateRef<GridContext>;

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
        const metadataSelector: MetadataSelector<MatrixGridMetadata> = this.gridPluginsSafe.MetadataSelector as MetadataSelector<MatrixGridMetadata>;

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

        const dataLoader: DataLoader<DataResponse> = this.gridPluginsSafe.DataLoader as DataLoader<DataResponse>;

        //data loader obtained and its different instance
        if(force || (this.dataLoader && this.dataLoader != dataLoader))
        {
            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader)
        {
            this.dataLoader = dataLoader;
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
        const getGridContext = () =>
        {
            return <GridContext>{
                grid: this.grid,
                plugins: this.gridPluginsSafe,
                columns: this.metadataSelector?.metadata?.columns ?? [],
                data: this.dataLoader?.result()?.data ?? [],
            };
        };

        const createInjector = (injector: Injector) =>
        {
            return Injector.create(
            {
                providers:
                [
                    <FactoryProvider>
                    {
                        provide: CONTENT_RENDERER_CURRENT_VIEW_CONTAINER,
                        useFactory: () => this.sharedViewContainer,
                    }
                ],
                parent: injector,
            });
        };

        this.container.clear();
        let view = this.container.createEmbeddedView(this.metadataSelector?.metadata?.gridContainer ?? this.defaultGridContainerTemplate, 
                                                                                      getGridContext(),
                                                                                      {
                                                                                          injector: createInjector(this.container.injector),
                                                                                      });

        view.detectChanges();

        //render content (body) element
        if(this.sharedViewContainer.viewContainer)
        {
            this.sharedViewContainer.viewContainer.clear();
            view = this.sharedViewContainer.viewContainer.createEmbeddedView(this.metadataSelector?.metadata?.contentContainer ?? this.defaultContentContainerTemplate,
                                                                             getGridContext(),
                                                                             {
                                                                                 injector: createInjector(this.sharedViewContainer.viewContainer.injector),
                                                                             });
    
            view.detectChanges();
            this.sharedViewContainer.viewContainer = null;
        }
    }
}