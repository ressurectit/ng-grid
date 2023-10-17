import {Component, ChangeDetectionStrategy, inject, ElementRef, Inject, Optional, ValueProvider, ViewChild, ViewContainerRef, OnDestroy, FactoryProvider, Injector, OnInit, ComponentRef} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {RecursivePartial, extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {MatrixContentRenderer, MatrixContentRendererDefautTemplates, MatrixContentRendererOptions} from './matrixContentRenderer.interface';
import {ContentRendererInnerStructure, DataLoader, DataResponse, Grid, GridContext, GridDataRowContext, GridPlugin, GridRowContext, MatrixGridColumn, MatrixGridMetadata, MetadataSelector, Paging, RowSelector} from '../../../interfaces';
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
        gridContainerClass: 'grid-container-css-grid',
        headerContainerClass: 'grid-header-css-grid',
        contentContainerClass: 'grid-body-css-grid',
        footerContainerClass: 'grid-footer-css-grid',
        headerRowContainerClass: 'grid-header-row-css-grid',
        contentRowContainerClass: 'grid-content-row-css-grid',
        footerRowContainerClass: 'grid-footer-row-css-grid',
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
    protected metadataSelector: MetadataSelector<MatrixGridMetadata<MatrixGridColumn>>|undefined|null;

    /**
     * Data loader currently used
     */
    protected dataLoader: DataLoader<DataResponse>|undefined|null;

    /**
     * Paging currently used
     */
    protected paging: Paging|undefined|null;

    /**
     * Row selector currently used
     */
    protected rowSelector: RowSelector|undefined|null;

    /**
     * Subscription for metadata changes
     */
    protected metadataChangeSubscription: Subscription|undefined|null;

    /**
     * Subscription for data changes
     */
    protected dataChangeSubscription: Subscription|undefined|null;

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

        this.dataChangeSubscription?.unsubscribe();
        this.dataChangeSubscription = null;
    }

    //######################### public methods - implementation of MatrixContentRenderer #########################

    /**
     * @inheritdoc
     */
    public initialize(force: boolean): void
    {
        const metadataSelector: MetadataSelector<MatrixGridMetadata<MatrixGridColumn>> = this.gridPluginsSafe.MetadataSelector as MetadataSelector<MatrixGridMetadata<MatrixGridColumn>>;

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
            this.dataChangeSubscription?.unsubscribe();
            this.dataChangeSubscription = null;

            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader)
        {
            this.dataLoader = dataLoader;

            this.dataChangeSubscription = toObservable(this.dataLoader.result, {injector: this.injector}).subscribe(() => this.renderGridContainer());
        }

        const paging: Paging = this.gridPluginsSafe.Paging as Paging;

        //paging obtained and its different instance
        if(force || (this.paging && this.paging != paging))
        {
            this.paging = null;
        }

        //no paging obtained
        if(!this.paging)
        {
            this.paging = paging;
        }

        const rowSelector: RowSelector = this.gridPluginsSafe.RowSelector as RowSelector;

        //row selector obtained and its different instance
        if(force || (this.rowSelector && this.rowSelector != rowSelector))
        {
            this.rowSelector = null;
        }

        //no row selector obtained
        if(!this.rowSelector)
        {
            this.rowSelector = rowSelector;
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
        this.innerStructure.gridContainer = {renderableContent: null, view: null};
        this.innerStructure.headerContainer = {renderableContent: null, view: null};
        this.innerStructure.contentContainer = {renderableContent: null, view: null};
        this.innerStructure.footerContainer = {renderableContent: null, view: null};
        this.innerStructure.headerRowContainer = [];
        this.innerStructure.contentRowContainer = [];
        this.innerStructure.footerRowContainer = [];

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

        this.innerStructure.headerContainer.renderableContent = null;
        this.innerStructure.headerRowContainer = [];
        this.innerStructure.headerContainer.view?.detectChanges();

        //header container is renderable
        if(this.innerStructure.headerContainer.renderableContent)
        {
            //render header rows
            this.renderHeaderRowsContainers();
        }
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

        this.innerStructure.contentContainer.renderableContent = null;
        this.innerStructure.contentRowContainer = [];
        this.innerStructure.contentContainer.view?.detectChanges();

        //content container is renderable
        if(this.innerStructure.contentContainer.renderableContent)
        {
            //render content rows
            this.renderContentRowsContainers();
        }
    }

    /**
     * Renders footer container
     */
    protected renderFooterContainer(): void
    {
        const viewContainer = this.innerStructure.gridContainer.renderableContent?.viewContainer;

        this.innerStructure.footerContainer.view = viewContainer?.createEmbeddedView(this.metadataSelector?.metadata?.contentContainer?.template ?? this.defaultsSafe.footerContainer,
                                                                                      this.getGridContext(),
                                                                                      {
                                                                                          injector: this.createInjector(viewContainer.injector),
                                                                                      });

        this.innerStructure.footerContainer.renderableContent = null;
        this.innerStructure.footerRowContainer = [];
        this.innerStructure.footerContainer.view?.detectChanges();

        //footer container is renderable
        if(this.innerStructure.footerContainer.renderableContent)
        {
            //render footer rows
            this.renderFooterRowsContainers();
        }
    }

    /**
     * Renders header rows containers
     */
    protected renderHeaderRowsContainers(): void
    {
        const viewContainer = this.innerStructure.headerContainer.renderableContent?.viewContainer;

        //removing renderable content
        viewContainer?.clear();

        this.innerStructure.headerRowContainer = [];
        const headerRowsTemplates = this.metadataSelector?.metadata?.headerRowContainer?.length ? this.metadataSelector?.metadata?.headerRowContainer : [{template: this.defaultsSafe.headerRowContainer, predicate: null}];

        for(let index = 0; index < headerRowsTemplates.length; index++)
        {
            const context = this.getGridRowContext(index);
            const headerRow = headerRowsTemplates[index];

            //skip rendering of this row
            if(headerRow.predicate && !headerRow.predicate(context))
            {
                continue;
            }

            this.innerStructure.headerRowContainer.push({renderableContent: null, view: null});

            this.innerStructure.headerRowContainer[index].view = viewContainer?.createEmbeddedView(headerRow.template,
                                                                                                   context,
                                                                                                   {
                                                                                                       injector: this.createInjector(viewContainer.injector),
                                                                                                   });

            this.innerStructure.headerRowContainer[index].view?.detectChanges();

            const columnViewContainer = this.innerStructure.headerRowContainer[index].renderableContent?.viewContainer;
            const columns = this.metadataSelector?.metadata?.columns ?? [];

            columnViewContainer?.clear();

            for(const column of columns)
            {
                if(!column.headerTemplate)
                {
                    continue;
                }

                columnViewContainer?.createEmbeddedView(column.headerTemplate,
                                                        {
                                                            ...context,
                                                            metadata: column,
                                                        },
                                                        {
                                                            injector: this.createInjector(columnViewContainer.injector),
                                                        });
            }
        }
    }

    /**
     * Renders content rows containers
     */
    protected renderContentRowsContainers(): void
    {
        const viewContainer = this.innerStructure.contentContainer.renderableContent?.viewContainer;

        //removing renderable content
        viewContainer?.clear();

        this.innerStructure.contentRowContainer = [];
        const contentRowsTemplates = this.metadataSelector?.metadata?.contentRowContainer?.length ? this.metadataSelector?.metadata?.contentRowContainer : [{template: this.defaultsSafe.contentRowContainer, predicate: null}];

        for(let datumIndex = 0; datumIndex < (this.dataLoader?.result().data?.length ?? 0); datumIndex++)
        {
            const datum = this.dataLoader?.result().data[datumIndex];
            const context = this.getGridDataRowContext(datumIndex, datum);

            this.innerStructure.contentRowContainer.push([]);

            for(let index = 0; index < contentRowsTemplates.length; index++)
            {
                const contentRow = contentRowsTemplates[index];

                //skip rendering of this row
                if(contentRow.predicate && !contentRow.predicate(context))
                {
                    continue;
                }

                this.innerStructure.contentRowContainer[datumIndex].push({renderableContent: null, view: null});

                this.innerStructure.contentRowContainer[datumIndex][index].view = viewContainer?.createEmbeddedView(contentRow.template,
                                                                                                                    context,
                                                                                                                    {
                                                                                                                        injector: this.createInjector(viewContainer.injector),
                                                                                                                    });

                this.innerStructure.contentRowContainer[datumIndex][index].view?.detectChanges();

                //TODO move into function
                const columnViewContainer = this.innerStructure.contentRowContainer[datumIndex][index].renderableContent?.viewContainer;
                const columns = this.metadataSelector?.metadata?.columns ?? [];

                columnViewContainer?.clear();

                for(const column of columns)
                {
                    if(!column.bodyTemplate)
                    {
                        continue;
                    }

                    columnViewContainer?.createEmbeddedView(column.bodyTemplate,
                                                            {
                                                                ...context,
                                                                metadata: column,
                                                            },
                                                            {
                                                                injector: this.createInjector(columnViewContainer.injector),
                                                            });
                }
            }
        }
    }

    /**
     * Renders footer rows containers
     */
    protected renderFooterRowsContainers(): void
    {
        const viewContainer = this.innerStructure.footerContainer.renderableContent?.viewContainer;

        //removing renderable content
        viewContainer?.clear();

        this.innerStructure.footerRowContainer = [];
        const footerRowsTemplates = this.metadataSelector?.metadata?.footerRowContainer?.length ? this.metadataSelector?.metadata?.footerRowContainer : [{template: this.defaultsSafe.footerRowContainer, predicate: null}];

        for(let index = 0; index < footerRowsTemplates.length; index++)
        {
            const context = this.getGridRowContext(index);
            const footerRow = footerRowsTemplates[index];

            //skip rendering of this row
            if(footerRow.predicate && !footerRow.predicate(context))
            {
                continue;
            }

            this.innerStructure.footerRowContainer.push({renderableContent: null, view: null});

            this.innerStructure.footerRowContainer[index].view = viewContainer?.createEmbeddedView(footerRow.template,
                                                                                                   context,
                                                                                                   {
                                                                                                       injector: this.createInjector(viewContainer.injector),
                                                                                                   });

            this.innerStructure.footerRowContainer[index].view?.detectChanges();

            const columnViewContainer = this.innerStructure.footerRowContainer[index].renderableContent?.viewContainer;
            const columns = this.metadataSelector?.metadata?.columns ?? [];

            columnViewContainer?.clear();

            for(const column of columns)
            {
                if(!column.footerTemplate)
                {
                    continue;
                }

                columnViewContainer?.createEmbeddedView(column.footerTemplate,
                                                        {
                                                            ...context,
                                                            metadata: column,
                                                        },
                                                        {
                                                            injector: this.createInjector(columnViewContainer.injector),
                                                        });
            }
        }
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
            rowColumns: [],
        };
    }

    /**
     * Gets grid data row context
     * @param index - Current index to be used for creation of grid row context
     */
    protected getGridDataRowContext(index: number, datum: unknown): GridDataRowContext
    {
        const rowSelector = this.rowSelector;

        if(!this.paging)
        {
            throw new Error('MatrixContentRendererSAComponent: missing paging plugin');
        }

        return <GridDataRowContext>{
            ...this.getGridRowContext(index),
            datum,
            rowIndex: this.paging.firstItemIndex + index,
            startingIndex: this.paging.firstItemIndex,
            get isSelected(): boolean
            {
                return rowSelector?.isSelected(datum) ?? false;
            },
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