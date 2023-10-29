import {Component, ChangeDetectionStrategy, inject, ElementRef, Inject, Optional, ValueProvider, ViewChild, ViewContainerRef, OnDestroy, FactoryProvider, Injector, ComponentRef, Provider, EmbeddedViewRef, TemplateRef} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Action4, Func1, NoopAction, RecursivePartial, extend} from '@jscrpt/common';
import {Subscription, skip} from 'rxjs';

import {MatrixContentRenderer, MatrixContentRendererDefautTemplates, MatrixContentRendererOptions} from './matrixContentRenderer.interface';
import {CurrentViewContainer, DataLoader, DataResponse, Grid, GridCellContext, GridContext, GridDataRowContext, GridOrderableCell, GridPlugin, GridRowContext, MatrixGridColumn, MatrixGridMetadata, MetadataSelector, Paging, RowSelector} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';
import {CONTENT_RENDERER_CURRENT_VIEW_CONTAINER, CONTENT_RENDERER_OPTIONS, DEFAULT_OPTIONS, GRID_INSTANCE, GRID_PLUGIN_INSTANCES, ORDERABLE_CELL} from '../../../misc/tokens';
import {CssGridDefaultTemplatesSAComponent} from './misc/components';
import type {FooterRowContainerTemplateSADirective} from '../../../directives/footerRowContainerTemplate/footerRowContainerTemplate.directive';
import type {HeaderRowContainerTemplateSADirective} from '../../../directives/headerRowContainerTemplate/headerRowContainerTemplate.directive';

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
            provide: CONTENT_RENDERER_CURRENT_VIEW_CONTAINER,
            useFactory: () =>
            {
                return <CurrentViewContainer> {
                    viewContainer: null,
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
     * Instance of current view container
     */
    protected currentViewContainer: CurrentViewContainer = inject(CONTENT_RENDERER_CURRENT_VIEW_CONTAINER);

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

            this.metadataChangeSubscription = this.metadataSelector
                .metadataChange
                .subscribe(() => this.renderGridContainer());
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

            this.dataChangeSubscription = toObservable(this.dataLoader.result, {injector: this.injector})
                .pipe(skip(1))
                .subscribe(() => this.renderGridContainer());
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
        this.defaultsContainer.clear();

        const defaultsComponent: ComponentRef<MatrixContentRendererDefautTemplates> = this.defaultsContainer.createComponent(this.ɵoptions.defaults,
                                                                                                                             {
                                                                                                                                 injector: this.injector,
                                                                                                                             });

        this.defaults = defaultsComponent.instance;
        defaultsComponent.changeDetectorRef.detectChanges();
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.renderGridContainer();
    }

    //######################### protected methods #########################

    /**
     * Renders grid container
     */
    protected renderGridContainer(): void
    {
        //remove existing
        this.container.clear();

        const view: EmbeddedViewRef<GridContext<unknown, MatrixGridColumn<unknown>>> = this.container.createEmbeddedView(this.metadataSelector?.metadata?.gridContainer?.template ?? this.defaultsSafe.gridContainer,
                                                                                                                         this.getGridContext(),
                                                                                                                         {
                                                                                                                             injector: this.createInjector(this.container.injector),
                                                                                                                         });

        view.detectChanges();

        //removing renderable content
        this.currentViewContainer.viewContainer?.clear();

        //grid container is renderable
        if(this.currentViewContainer.viewContainer)
        {
            //render header
            this.renderContainer(this.metadataSelector?.metadata?.headerContainer?.template ?? this.defaultsSafe.headerContainer, this.renderHeaderRowsContainers);

            //render content
            this.renderContainer(this.metadataSelector?.metadata?.contentContainer?.template ?? this.defaultsSafe.contentContainer, this.renderContentRowsContainers);

            //render footer
            this.renderContainer(this.metadataSelector?.metadata?.contentContainer?.template ?? this.defaultsSafe.footerContainer, this.renderFooterRowsContainers);
        }

        this.clearCurrentViewContainer();
    }

    /**
     * Renders header rows containers
     */
    protected renderHeaderRowsContainers(): void
    {
        this.renderHeaderFooterRowContainer(this.metadataSelector?.metadata?.headerRowContainer?.length ? this.metadataSelector?.metadata?.headerRowContainer : [{template: this.defaultsSafe.headerRowContainer, predicate: null, columns: null}],
                                            column => column.headerTemplate,
                                            this.renderHeaderCell);
    }

    /**
     * Renders content rows containers
     */
    protected renderContentRowsContainers(): void
    {
        const viewContainer = this.currentViewContainer.viewContainer;

        const contentRowsTemplates = this.metadataSelector?.metadata?.contentRowContainer?.length ? this.metadataSelector?.metadata?.contentRowContainer : [{template: this.defaultsSafe.contentRowContainer, predicate: null, columns: null}];
        const data = this.dataLoader?.result();
        const dataLength = data?.data?.length ?? 0;

        for(let datumIndex = 0; datumIndex < dataLength; datumIndex++)
        {
            const datum = data?.data[datumIndex];
            
            for(let index = 0; index < contentRowsTemplates.length; index++)
            {
                const contentRow = contentRowsTemplates[index];
                const rowColumns = contentRow
                    .columns
                    ?.map(id => this.metadataSelector
                        ?.metadata
                        ?.columns
                        ?.find(itm => itm.id == id) as MatrixGridColumn)
                    ?.filter(itm => itm) ?? this.metadataSelector?.metadata?.columns ?? [];
                const context = this.getGridDataRowContext(datumIndex, datum, rowColumns);

                //skip rendering of this row
                if(contentRow.predicate && !contentRow.predicate(context))
                {
                    continue;
                }


                const view: EmbeddedViewRef<GridDataRowContext<unknown, MatrixGridColumn<unknown>>> | undefined = viewContainer?.createEmbeddedView(contentRow.template,
                                                                                                                                                    context,
                                                                                                                                                    {
                                                                                                                                                        injector: this.createInjector(viewContainer.injector),
                                                                                                                                                    });

                this.clearCurrentViewContainer();
                view?.detectChanges();

                const columnViewContainer = this.currentViewContainer.viewContainer;

                if(!columnViewContainer)
                {
                    continue;
                }

                for(const column of rowColumns)
                {
                    if(!column.bodyTemplate)
                    {
                        continue;
                    }

                    columnViewContainer.createEmbeddedView(column.bodyTemplate,
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
        this.renderHeaderFooterRowContainer(this.metadataSelector?.metadata?.footerRowContainer?.length ? this.metadataSelector?.metadata?.footerRowContainer : [{template: this.defaultsSafe.footerRowContainer, predicate: null, columns: null}],
                                            column => column.footerTemplate,
                                            this.renderFooterCell);
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
     * @param rowColumns - Array of row columns rendered in current row
     */
    protected getGridRowContext(index: number, rowColumns: MatrixGridColumn[]): GridRowContext
    {
        return <GridRowContext>{
            ...this.getGridContext(),
            index,
            rowColumns: rowColumns,
        };
    }

    /**
     * Gets grid data row context
     * @param index - Current index to be used for creation of grid row context
     * @param datum - Datum for current row
     * @param rowColumns - Array of row columns rendered in current row
     */
    protected getGridDataRowContext(index: number, datum: unknown, rowColumns: MatrixGridColumn[]): GridDataRowContext
    {
        const rowSelector = this.rowSelector;

        if(!this.paging)
        {
            throw new Error('MatrixContentRendererSAComponent: missing paging plugin');
        }

        return <GridDataRowContext>{
            ...this.getGridRowContext(index, rowColumns),
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
     * @param additionalProviders - Array of additional providers
     */
    protected createInjector(injector: Injector, additionalProviders: Provider[] = []): Injector
    {
        return Injector.create(
        {
            providers:
            [
                <FactoryProvider>
                {
                    provide: CONTENT_RENDERER_CURRENT_VIEW_CONTAINER,
                    useFactory: () => this.currentViewContainer,
                },
                ...additionalProviders,
            ],
            parent: injector,
        });
    }

    /**
     * Clears current view container
     */
    protected clearCurrentViewContainer(): void
    {
        this.currentViewContainer.viewContainer = null;
    }

    /**
     * Renders one of containers, head, content or foot
     * @param template - Template to be rendered
     * @param rowsContainerRenderFn - Function to be called if container is renderable
     */
    protected renderContainer(template: TemplateRef<GridContext<unknown, MatrixGridColumn<unknown>>>, rowsContainerRenderFn: NoopAction): void
    {
        const viewContainer = this.currentViewContainer.viewContainer;

        const view: EmbeddedViewRef<GridContext<unknown, MatrixGridColumn<unknown>>> | undefined = viewContainer?.createEmbeddedView(template,
                                                                                                                                     this.getGridContext(),
                                                                                                                                     {
                                                                                                                                         injector: this.createInjector(viewContainer.injector),
                                                                                                                                     });

        this.clearCurrentViewContainer();
        view?.detectChanges();

        //container is renderable
        if(this.currentViewContainer.viewContainer)
        {
            //render rows
            rowsContainerRenderFn.bind(this)();
        }

        //restore parents view container
        this.currentViewContainer.viewContainer = viewContainer;
    }

    /**
     * Renders header or footer row container
     * @param rowTemplates - Array of row templates directives
     * @param cellTemplateGetter - Function for obtaining template for cell for column definition
     * @param cellRenderer - Function that renders 
     */
    protected renderHeaderFooterRowContainer(rowTemplates: Array<FooterRowContainerTemplateSADirective|HeaderRowContainerTemplateSADirective>,
                                             cellTemplateGetter: Func1<TemplateRef<GridCellContext<unknown, MatrixGridColumn>>|null|undefined, MatrixGridColumn>,
                                             cellRenderer: Action4<ViewContainerRef, TemplateRef<GridCellContext<unknown, MatrixGridColumn>>, GridRowContext<unknown, MatrixGridColumn>, MatrixGridColumn>): void
    {
        const viewContainer = this.currentViewContainer.viewContainer;

        for(let index = 0; index < rowTemplates.length; index++)
        {
            const row = rowTemplates[index];
            const rowColumns = row
                .columns
                ?.map(id => this.metadataSelector
                    ?.metadata
                    ?.columns
                    ?.find(itm => itm.id == id) as MatrixGridColumn)
                ?.filter(itm => itm) ?? this.metadataSelector?.metadata?.columns ?? [];
            const context = this.getGridRowContext(index, rowColumns);

            //skip rendering of this row
            if(row.predicate && !row.predicate(context))
            {
                continue;
            }

            const view: EmbeddedViewRef<GridRowContext<unknown, MatrixGridColumn<unknown>>> | undefined = viewContainer?.createEmbeddedView(row.template,
                                                                                                                                            context,
                                                                                                                                            {
                                                                                                                                                injector: this.createInjector(viewContainer.injector),
                                                                                                                                            });

            this.clearCurrentViewContainer();
            view?.detectChanges();

            const columnViewContainer = this.currentViewContainer.viewContainer;

            if(!columnViewContainer)
            {
                continue;
            }

            for(const column of rowColumns)
            {
                const cellTemplate = cellTemplateGetter(column);

                if(!cellTemplate)
                {
                    continue;
                }

                cellRenderer.bind(this)(columnViewContainer, cellTemplate, context, column);
            }
        }
    }

    /**
     * Renders header cell
     * @param viewContainer - View container used for rendering cell
     * @param template - Template used for rendering cell
     * @param context - Context passed to rendered cell
     * @param column - Instance of column metadata
     */
    protected renderHeaderCell(viewContainer: ViewContainerRef,
                               template: TemplateRef<GridCellContext<unknown, MatrixGridColumn>>,
                               context: GridRowContext<unknown, MatrixGridColumn>,
                               column: MatrixGridColumn,): void
    {
        const orderable: GridOrderableCell = {};

        const view = viewContainer.createEmbeddedView(template,
                                                      {
                                                          ...context,
                                                          metadata: column,
                                                      },
                                                      {
                                                          injector: this.createInjector(viewContainer.injector, 
                                                          [
                                                              <FactoryProvider>
                                                              {
                                                                  provide: ORDERABLE_CELL,
                                                                  useFactory: () => orderable
                                                              },
                                                          ]),
                                                      });

        if(orderable.orderable)
        {
            orderable.orderable.orderable = true;
            orderable.orderable.orderById = column.id;
        }

        view.detectChanges();
    }

    /**
     * Renders footer cell
     * @param viewContainer - View container used for rendering cell
     * @param template - Template used for rendering cell
     * @param context - Context passed to rendered cell
     * @param column - Instance of column metadata
     */
    protected renderFooterCell(viewContainer: ViewContainerRef,
                               template: TemplateRef<GridCellContext<unknown, MatrixGridColumn>>,
                               context: GridRowContext<unknown, MatrixGridColumn>,
                               column: MatrixGridColumn,): void
    {
        viewContainer.createEmbeddedView(template,
                                         {
                                             ...context,
                                             metadata: column,
                                         },
                                         {
                                             injector: this.createInjector(viewContainer.injector),
                                         });
    }
}