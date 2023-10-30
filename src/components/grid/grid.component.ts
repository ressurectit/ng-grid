import {Component, ChangeDetectionStrategy, Inject, Optional, Type, Input, OnInit, ContentChild, forwardRef, ChangeDetectorRef, FactoryProvider, ExistingProvider, inject, ValueProvider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';
import {Func1, PromiseOr, RecursivePartial, extend} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {Observable, BehaviorSubject, map, combineLatest, distinctUntilChanged, Subject, take} from 'rxjs';

import {ContentRenderer, ContentRendererOptions, CssClassesContentRenderer, CssClassesOrdering, DataLoader, Grid, GridInitializer, GridMetadata, GridOptions, GridPlugin, MetadataGatherer, MetadataSelector, NoDataRenderer, Ordering, OrderingOptions, Paging, PluginDescription, RowSelector, GridPluginInstances} from '../../interfaces';
import {CONTENT_RENDERER_TYPE, DATA_LOADER_TYPE, DEFAULT_OPTIONS, GRID_INITIALIZER_TYPE, GRID_INSTANCE, GRID_OPTIONS, GRID_PLUGIN_INSTANCES, METADATA_GATHERER, METADATA_SELECTOR_TYPE, NO_DATA_RENDERER_TYPE, ORDERING_TYPE, PAGING_TYPE, ROW_SELECTOR_TYPE} from '../../misc/tokens';
import {AsyncDataLoaderSAComponent, BasicPagingSAComponent, NoRowSelectorSAComponent, NoGridInitializerSAComponent, NoMetadataSelectorSAComponent, SimpleNoDataRendererSAComponent, SingleOrderingSAComponent, TableContentRendererSAComponent} from '../../plugins';
import {GridAction, GridFunction} from '../../misc/types';
import {GridPluginType, PagingPosition} from '../../misc/enums';
import {setPluginFactory} from '../../misc/utils';
import {ResolveForwardRefSAPipe} from '../../pipes';
import {GridPluginInstancesDef} from '../../misc/gridPluginInstancesDef';

/**
 * Default 'GridOptions'
 */
const defaultOptions: GridOptions =
{
    autoInitialize: true,
    pagingPosition: PagingPosition.Bottom,
    plugins:
    {
        contentRenderer:
        {
            type: forwardRef(() => TableContentRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        dataLoader:
        {
            type: forwardRef(() => AsyncDataLoaderSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        gridInitializer:
        {
            type: forwardRef(() => NoGridInitializerSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        metadataSelector:
        {
            type: forwardRef(() => NoMetadataSelectorSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        noDataRenderer:
        {
            type: forwardRef(() => SimpleNoDataRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        ordering:
        {
            type: forwardRef(() => SingleOrderingSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        paging:
        {
            type: forwardRef(() => BasicPagingSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        rowSelector:
        {
            type: forwardRef(() => NoRowSelectorSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
    }
};

/**
 * Grid component used for rendering grid
 */
@Component(
{
    selector: 'ng-grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['grid.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports:
    [
        CommonModule,
        CommonDynamicModule,
        ResolveForwardRefSAPipe,
    ],
    providers:
    [
        <ExistingProvider>
        {
            provide: GRID_INSTANCE,
            useExisting: forwardRef(() => GridSAComponent),
        },
        <FactoryProvider>
        {
            provide: GRID_PLUGIN_INSTANCES,
            useFactory: () => {return new GridPluginInstancesDef();}
        },
        <ValueProvider>
        {
            provide: DEFAULT_OPTIONS,
            useValue: defaultOptions,
        },
    ]
})
export class GridSAComponent implements OnInit, Grid
{
    //######################### protected fields #########################

    /**
     * Instance of change detector
     */
    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * Grid plugin instances available for grid
     */
    protected pluginInstances: GridPluginInstances = inject(GRID_PLUGIN_INSTANCES);

    /**
     * Metadata gatherer instance
     */
    protected get metadataGatherer(): MetadataGatherer|undefined|null
    {
        return this.metadataGathererChild;
    }

    /**
     * Grid options
     */
    protected ɵgridOptions: GridOptions;

    /**
     * Instance that allows changing state of initialized plugins
     */
    protected pluginsOptionsInitialization =
    {
        contentRenderer: new BehaviorSubject<boolean>(false),
        dataLoader: new BehaviorSubject<boolean>(false),
        gridInitializer: new BehaviorSubject<boolean>(false),
        metadataSelector: new BehaviorSubject<boolean>(false),
        noDataRenderer: new BehaviorSubject<boolean>(false),
        ordering: new BehaviorSubject<boolean>(false),
        paging: new BehaviorSubject<boolean>(false),
        rowSelector: new BehaviorSubject<boolean>(false),
    };

    /**
     * Subject used for indication that grid was initialized
     */
    protected initializedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //######################### public properties - inputs #########################

    /**
     * @inheritdoc
     */
    @Input()
    public get gridOptions(): GridOptions
    {
        return this.ɵgridOptions;
    }
    public set gridOptions(options: RecursivePartial<GridOptions>)
    {
        this.ɵgridOptions = extend(true, this.ɵgridOptions, options);
    }

    //######################### public properties - implementation of Grid #########################

    /**
     * @inheritdoc
     */
    public get initialized(): Observable<boolean>
    {
        return this.initializedSubject.asObservable().pipe(distinctUntilChanged());
    }

    /**
     * @inheritdoc
     */
    public pluginsOptionsInitialized: Observable<boolean> = combineLatest(
    [
        this.pluginsOptionsInitialization.contentRenderer,
        this.pluginsOptionsInitialization.dataLoader,
        this.pluginsOptionsInitialization.gridInitializer,
        this.pluginsOptionsInitialization.metadataSelector,
        this.pluginsOptionsInitialization.noDataRenderer,
        this.pluginsOptionsInitialization.ordering,
        this.pluginsOptionsInitialization.paging,
        this.pluginsOptionsInitialization.rowSelector,
    ]).pipe(
        map(initFlags =>
        {
            const [contentRenderer, dataLoader, gridInitializer, metadataSelector, noDataRenderer, ordering, paging, rowSelector] = initFlags;

            return contentRenderer && dataLoader && gridInitializer && metadataSelector && noDataRenderer && ordering && paging && rowSelector;
        }),
        distinctUntilChanged());

    //######################### protected properties - children #########################

    /**
     * Metadata gatherer instance
     */
    @ContentChild(METADATA_GATHERER)
    protected metadataGathererChild: MetadataGatherer|undefined|null;

    //######################### constructors #########################
    constructor(@Inject(GRID_OPTIONS) @Optional() options?: RecursivePartial<GridOptions>,
                @Inject(PAGING_TYPE) @Optional() pagingType?: Type<Paging>,
                @Inject(ORDERING_TYPE) @Optional() orderingType?: Type<Ordering>,
                @Inject(GRID_INITIALIZER_TYPE) @Optional() gridInitializerType?: Type<GridInitializer>,
                @Inject(DATA_LOADER_TYPE) @Optional() dataLoaderType?: Type<DataLoader>,
                @Inject(CONTENT_RENDERER_TYPE) @Optional() contentRendererType?: Type<ContentRenderer>,
                @Inject(METADATA_SELECTOR_TYPE) @Optional() metadataSelectorType?: Type<MetadataSelector>,
                @Inject(NO_DATA_RENDERER_TYPE) @Optional() noDataRendererType?: Type<NoDataRenderer>,
                @Inject(ROW_SELECTOR_TYPE) @Optional() rowSelectorType?: Type<RowSelector>)
    {
        this.pluginsOptionsInitialized.subscribe(async initialized =>
        {
            if(initialized && this.ɵgridOptions.autoInitialize && !(await lastValueFrom(this.initialized.pipe(take(1)))))
            {
                this.initialize(false);
            }
        });

        const opts: RecursivePartial<GridOptions> = extend({}, options);

        if(!opts.plugins)
        {
            opts.plugins = {};
        }

        if(pagingType)
        {
            opts.plugins.paging ??= {};
            opts.plugins.paging.type = pagingType;
        }

        if(orderingType)
        {
            opts.plugins.ordering ??= {};
            opts.plugins.ordering.type = orderingType;
        }

        if(gridInitializerType)
        {
            opts.plugins.gridInitializer ??= {};
            opts.plugins.gridInitializer.type = gridInitializerType;
        }

        if(dataLoaderType)
        {
            opts.plugins.dataLoader ??= {};
            opts.plugins.dataLoader.type = dataLoaderType;
        }
        
        if(contentRendererType)
        {
            opts.plugins.contentRenderer ??= {};
            opts.plugins.contentRenderer.type = contentRendererType;
        }

        if(metadataSelectorType)
        {
            opts.plugins.metadataSelector ??= {};
            opts.plugins.metadataSelector.type = metadataSelectorType;
        }

        if(noDataRendererType)
        {
            opts.plugins.noDataRenderer ??= {};
            opts.plugins.noDataRenderer.type = noDataRendererType;
        }

        if(rowSelectorType)
        {
            opts.plugins.rowSelector ??= {};
            opts.plugins.rowSelector.type = rowSelectorType;
        }

        this.ɵgridOptions = extend(true, {}, inject<GridOptions>(DEFAULT_OPTIONS), opts);
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initOptions();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Sets paging component
     * @param paging - Created paging that is rendered
     */
    protected setPagingComponent: Func1<Promise<void>, Paging | null> = setPluginFactory(GridPluginType.Paging,
                                                                                         () => this.ɵgridOptions.plugins.paging,
                                                                                         () => this.pluginsOptionsInitialization.paging,).bind(this);

    /**
     * Sets grid initializer component
     * @param gridInitializer - Created grid initializer that is used
     */
    protected setGridInitializerComponent: Func1<Promise<void>, GridInitializer<unknown> | null> = setPluginFactory(GridPluginType.GridInitializer,
                                                                                                                    () => this.ɵgridOptions.plugins.gridInitializer,
                                                                                                                    () => this.pluginsOptionsInitialization.gridInitializer,).bind(this);

    /**
     * Sets metadata selector component
     * @param metadataSelector - Created metadata selector that is used
     */
    protected setMetadataSelectorComponent: Func1<Promise<void>, MetadataSelector<GridMetadata> | null> = setPluginFactory(GridPluginType.MetadataSelector, 
                                                                                                                           () => this.ɵgridOptions.plugins.metadataSelector,
                                                                                                                           () => this.pluginsOptionsInitialization.metadataSelector,
                                                                                                                           metadataSelector =>
                                                                                                                           {
                                                                                                                               if(this.metadataGatherer)
                                                                                                                               {
                                                                                                                                   metadataSelector.setMetadataGatherer(this.metadataGatherer);
                                                                                                                               }
                                                                                                                           }).bind(this);

    /**
     * Sets data loader component
     * @param dataLoader - Created data loader that is used
     */
    protected setDataLoaderComponent: Func1<Promise<void>, DataLoader<unknown> | null> = setPluginFactory(GridPluginType.DataLoader,
                                                                                                          () => this.ɵgridOptions.plugins.dataLoader,
                                                                                                          () => this.pluginsOptionsInitialization.dataLoader,).bind(this);

    /**
     * Sets content renderer component
     * @param contentRenderer - Created content renderer that is rendered
     */
    protected setContentRendererComponent: Func1<Promise<void>, ContentRenderer<ContentRendererOptions<CssClassesContentRenderer>> | null> = setPluginFactory(GridPluginType.ContentRenderer,
                                                                                                                                                              () => this.ɵgridOptions.plugins.contentRenderer,
                                                                                                                                                              () => this.pluginsOptionsInitialization.contentRenderer,).bind(this);

    /**
     * Sets no data renderer component
     * @param noDataRenderer - Created no data renderer that is rendered
     */
    protected setNoDataRendererComponent: Func1<Promise<void>, NoDataRenderer | null> = setPluginFactory(GridPluginType.NoDataRenderer,
                                                                                                         () => this.ɵgridOptions.plugins.noDataRenderer,
                                                                                                         () => this.pluginsOptionsInitialization.noDataRenderer,).bind(this);

    /**
     * Sets row selector component
     * @param rowSelector - Created row selector that is rendered
     */
    protected setRowSelectorComponent: Func1<Promise<void>, RowSelector<unknown, unknown, unknown> | null> = setPluginFactory(GridPluginType.RowSelector,
                                                                                                                              () => this.ɵgridOptions.plugins.rowSelector,
                                                                                                                              () => this.pluginsOptionsInitialization.rowSelector,).bind(this);

    /**
     * Sets ordering component
     * @param ordering - Created ordering that is rendered
     */
    protected setOrderingComponent: Func1<Promise<void>, Ordering<unknown, OrderingOptions<CssClassesOrdering>> | null> = setPluginFactory(GridPluginType.Ordering,
                                                                                                                                           () => this.ɵgridOptions.plugins.ordering,
                                                                                                                                           () => this.pluginsOptionsInitialization.ordering,).bind(this);

    //######################### public methods - implementation of Grid #########################

    /**
     * @inheritdoc
     */
    public async initialize(force: boolean): Promise<void>
    {
        this.initializedSubject.next(false);

        await this.pluginInstances[GridPluginType.RowSelector].initialize(force);
        await this.pluginInstances[GridPluginType.MetadataSelector].initialize(force);
        await this.pluginInstances[GridPluginType.GridInitializer].initialize(force);
        await this.pluginInstances[GridPluginType.Ordering].initialize(force);
        await this.pluginInstances[GridPluginType.Paging].initialize(force);
        await this.pluginInstances[GridPluginType.ContentRenderer].initialize(force);
        await this.pluginInstances[GridPluginType.NoDataRenderer].initialize(force);
        await this.pluginInstances[GridPluginType.DataLoader].initialize(force);

        this.initializedSubject.next(true);
    }

    /**
     * @inheritdoc
     */
    public async initOptions(): Promise<void>
    {
        const initOptionsFn = async <TPlugin extends GridPlugin>(pluginType: GridPluginType,
                                                                 pluginDescription: PluginDescription<TPlugin>,
                                                                 initOptionsSubject: Subject<boolean>,
                                                                 beforeOptionsSet?: Func1<PromiseOr<void>, TPlugin>): Promise<void> =>
        {
            initOptionsSubject.next(false);

            if(pluginDescription.instance && pluginDescription.type)
            {
                throw new Error(`GridSAComponent: provide only instance or type for plugin ${pluginType}, cant provide both of these properties at the same time!`);
            }

            //only for existing instances of plugins
            if(pluginDescription.instance)
            {
                //plugin is different from current plugin
                if (pluginDescription.instance != this.pluginInstances[pluginType])
                {
                    this.pluginInstances[pluginType] = pluginDescription.instance;
                    pluginDescription.instance.gridPlugins = this.pluginInstances;

                    await beforeOptionsSet?.(this.pluginInstances[pluginType] as TPlugin);
                }

                if(pluginDescription.options)
                {
                    this.pluginInstances[pluginType].options = pluginDescription.options;
                }

                await this.pluginInstances[pluginType].initOptions();
                initOptionsSubject.next(true);
            }
        };

        //init options paging
        await initOptionsFn(GridPluginType.Paging,
                            this.ɵgridOptions.plugins.paging,
                            this.pluginsOptionsInitialization.paging,);

        //init options ordering
        await initOptionsFn(GridPluginType.Ordering,
                            this.ɵgridOptions.plugins.ordering,
                            this.pluginsOptionsInitialization.ordering,);

        //init options grid initializer
        await initOptionsFn(GridPluginType.GridInitializer,
                            this.ɵgridOptions.plugins.gridInitializer,
                            this.pluginsOptionsInitialization.gridInitializer,);

        //init options data loader
        await initOptionsFn(GridPluginType.DataLoader,
                            this.ɵgridOptions.plugins.dataLoader,
                            this.pluginsOptionsInitialization.dataLoader,);

        //init options content renderer
        await initOptionsFn(GridPluginType.ContentRenderer,
                            this.ɵgridOptions.plugins.contentRenderer,
                            this.pluginsOptionsInitialization.contentRenderer,);

        //init options metadata selector
        await initOptionsFn(GridPluginType.MetadataSelector,
                            this.ɵgridOptions.plugins.metadataSelector,
                            this.pluginsOptionsInitialization.metadataSelector,
                            metadataSelector =>
                            {
                                if(this.metadataGatherer)
                                {
                                    metadataSelector.setMetadataGatherer(this.metadataGatherer);
                                }
                            });

        //init options no data renderer
        await initOptionsFn(GridPluginType.NoDataRenderer,
                            this.ɵgridOptions.plugins.noDataRenderer,
                            this.pluginsOptionsInitialization.noDataRenderer,);

        //init options row selector
        await initOptionsFn(GridPluginType.RowSelector,
                            this.ɵgridOptions.plugins.rowSelector,
                            this.pluginsOptionsInitialization.rowSelector,);
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.detectChanges();
    }

    /**
     * @inheritdoc
     */
    public getPlugin<PluginInstance extends GridPlugin>(pluginId: GridPluginType): PluginInstance
    {
        return this.pluginInstances[pluginId] as PluginInstance;
    }

    /**
     * @inheritdoc
     */
    public setGridPluginInstances(plugin: GridPlugin): void
    {
        plugin.gridPlugins = this.pluginInstances;
    }

    /**
     * @inheritdoc
     */
    public async execute(...actions: GridAction[]): Promise<void>
    {
        if(!actions)
        {
            return;
        }

        for(const action of actions)
        {
            await action(this);
        }
    }

    /**
     * @inheritdoc
     */
    public executeAndReturn<TResult>(func: GridFunction<TResult>): TResult
    {
        return func(this);
    }
}