import {Component, ChangeDetectionStrategy, inject, ElementRef, Inject, Optional, ValueProvider, ViewChild, ViewContainerRef, OnDestroy, FactoryProvider, Injector, OnInit, ComponentRef} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {MatrixContentRenderer, MatrixContentRendererDefautTemplates, MatrixContentRendererOptions} from './matrixContentRenderer.interface';
import {ContentRendererInnerStructure, DataLoader, DataResponse, Grid, GridContext, GridDataRowContext, GridPlugin, GridRowContext, MatrixGridMetadata, MetadataSelector} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';
import {CONTENT_RENDERER_INNER_STRUCTURE, CONTENT_RENDERER_OPTIONS, DEFAULT_OPTIONS, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../../misc/tokens';
import {CssGridDefaultTemplatesSAComponent} from './misc/components';

//TODO: first version will rerender whole content on changes of metadata, better checking should be implemented

/**
 * Default 'GridOptions'
 */
const defaultOptions: MatrixContentRendererOptions =
{
    defaults: CssGridDefaultTemplatesSAComponent,
    cssClasses:
    {
        gridContainerClass: 'grid-container',
        headerContainerClass: 'grid-header',
        contentContainerClass: 'grid-body',
        footerContainerClass: 'grid-footer',
        headerRowContainerClass: null,
        contentRowContainerClass: null,
        footerRowContainerClass: null,
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
    providers:
    [
        <ValueProvider>
        {
            provide: DEFAULT_OPTIONS,
            useValue: defaultOptions,
        },
        <FactoryProvider>
        {
            provide: CONTENT_RENDERER_INNER_STRUCTURE,
            useFactory: () =>
            {
                return <ContentRendererInnerStructure> {
                    gridContainer:
                    {
                        renderableContent: null,
                        view: null,
                    },
                    headerContainer:
                    {
                        renderableContent: null,
                        view: null,
                    },
                    contentContainer:
                    {
                        renderableContent: null,
                        view: null,
                    },
                    footerContainer:
                    {
                        renderableContent: null,
                        view: null,
                    },
                    headerRowContainer: [],
                    contentRowContainer: [],
                    footerRowContainer: [],
                };
            }
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixContentRendererSAComponent implements MatrixContentRenderer, GridPlugin<MatrixContentRendererOptions>, OnDestroy, OnInit
{
    //######################### protected fields #########################

    /**
     * Instance of inner structure components
     */
    protected innerStructure: ContentRendererInnerStructure = inject(CONTENT_RENDERER_INNER_STRUCTURE);

    /**
     * Options for matrix content renderer
     */
    protected ɵoptions: MatrixContentRendererOptions;

    /**
     * Instance of grid itself
     */
    protected grid: Grid = inject(GRID_INSTANCE);

    /**
     * Instance of injector used for DI
     */
    protected injector: Injector = inject(Injector);

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

    /**
     * Instance with default templates
     */
    protected defaults: MatrixContentRendererDefautTemplates|undefined|null;

    /**
     * Gets instance with default templates safely
     */
    protected get defaultsSafe(): MatrixContentRendererDefautTemplates
    {
        if(!this.defaults)
        {
            throw new Error('MatrixContentRendererSAComponent: missing default templates!');
        }

        return this.defaults;
    }

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
     * Container used for rendering defaults component
     */
    @ViewChild('defaults', {static: true, read: ViewContainerRef})
    protected defaultsContainer!: ViewContainerRef;

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

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        const defaultsComponent: ComponentRef<MatrixContentRendererDefautTemplates> = this.defaultsContainer.createComponent(this.ɵoptions.defaults,
                                                                                                                             {
                                                                                                                                 injector: this.injector,
                                                                                                                             });

        this.defaults = defaultsComponent.instance;
        defaultsComponent.changeDetectorRef.detectChanges();
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
        //remove existing
        this.container.clear();


        this.innerStructure.gridContainer.view = this.container.createEmbeddedView(this.metadataSelector?.metadata?.gridContainer?.template ?? this.defaultsSafe.gridContainer, 
                                                                                   this.getGridContext(),
                                                                                   {
                                                                                       injector: this.createInjector(this.container.injector),
                                                                                   });

        this.innerStructure.gridContainer.view.detectChanges();

        //removing renderable content
        this.innerStructure.gridContainer.renderableContent?.viewContainer.clear();

        //grid container is renderable
        if(this.innerStructure.gridContainer.renderableContent)
        {
            //render header
            this.renderHeaderContainer();

            //render content
            this.renderContentContainer();

            //render footer
            this.renderFooterContainer();
        }
    }

    /**
     * Renders header container
     */
    protected renderHeaderContainer(): void
    {
        const viewContainer = this.innerStructure.gridContainer.renderableContent?.viewContainer;

        this.innerStructure.headerContainer.view = viewContainer?.createEmbeddedView(this.metadataSelector?.metadata?.headerContainer?.template ?? this.defaultsSafe.headerContainer,
                                                                                      this.getGridContext(),
                                                                                      {
                                                                                          injector: this.createInjector(viewContainer.injector),
                                                                                      });
    
        this.innerStructure.contentContainer.view?.detectChanges();
    }

    /**
     * Renders content container
     */
    protected renderContentContainer(): void
    {
        const viewContainer = this.innerStructure.gridContainer.renderableContent?.viewContainer;

        this.innerStructure.contentContainer.view = viewContainer?.createEmbeddedView(this.metadataSelector?.metadata?.contentContainer?.template ?? this.defaultsSafe.contentContainer,
                                                                                      this.getGridContext(),
                                                                                      {
                                                                                          injector: this.createInjector(viewContainer.injector),
                                                                                      });
    
        this.innerStructure.contentContainer.view?.detectChanges();
    }

    /**
     * Renders footer container
     */
    protected renderFooterContainer(): void
    {
        const viewContainer = this.innerStructure.gridContainer.renderableContent?.viewContainer;

        this.innerStructure.contentContainer.view = viewContainer?.createEmbeddedView(this.metadataSelector?.metadata?.contentContainer?.template ?? this.defaultsSafe.footerContainer,
                                                                                      this.getGridContext(),
                                                                                      {
                                                                                          injector: this.createInjector(viewContainer.injector),
                                                                                      });
    
        this.innerStructure.contentContainer.view?.detectChanges();
    }

    /**
     * Renders header rows containers
     */
    protected renderHeaderRowsContainers(): void
    {
    }

    /**
     * Renders header row container
     */
    protected renderHeaderRowContainer(): void
    {
    }

    /**
     * Renders content rows containers
     */
    protected renderContentRowsContainers(): void
    {
    }

    /**
     * Renders content row container
     */
    protected renderContentRowContainer(): void
    {
    }

    /**
     * Renders footer rows containers
     */
    protected renderFooterRowsContainers(): void
    {
    }

    /**
     * Renders footer row container
     */
    protected renderFooterRowContainer(): void
    {
    }

    /**
     * Gets grid context
     */
    protected getGridContext(): GridContext
    {
        return <GridContext>{
            grid: this.grid,
            plugins: this.gridPluginsSafe,
            columns: this.metadataSelector?.metadata?.columns ?? [],
            data: this.dataLoader?.result()?.data ?? [],
            contentCssClasses: this.ɵoptions.cssClasses,
        };
    }

    /**
     * Gets grid row context
     * @param index - Current index to be used for creation of grid row context
     */
    protected getGridRowContext(index: number): GridRowContext
    {
        return <GridRowContext>{
            ...this.getGridContext(),
            index,
        };
    }

    //TODO: finish
    /**
     * Gets grid data row context
     * @param index - Current index to be used for creation of grid row context
     */
    protected getGridDataRowContext(index: number, datum: unknown): GridDataRowContext
    {
        return <GridDataRowContext>{
            ...this.getGridContext(),
            index,
            datum,
            isSelected: true,
            rowIndex: 0,
            startingIndex: 0,

        };
    }

    /**
     * Creates new injector with content renderer inner structure
     * @param injector - Injector used as parent injector
     */
    protected createInjector(injector: Injector): Injector
    {
        return Injector.create(
        {
            providers:
            [
                <FactoryProvider>
                {
                    provide: CONTENT_RENDERER_INNER_STRUCTURE,
                    useFactory: () => this.innerStructure,
                }
            ],
            parent: injector,
        });
    }
}