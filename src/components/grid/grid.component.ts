import {Component, ChangeDetectionStrategy, Inject, Optional, Type, Input, OnInit, AfterViewInit, ContentChild, forwardRef, ChangeDetectorRef, FactoryProvider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';
import {RecursivePartial, extend} from '@jscrpt/common';
import {Observable, BehaviorSubject} from 'rxjs';

import {GridPluginType, PagingPosition} from '../../misc/enums';
import {ContentRenderer, DataLoader, Grid, GridInitializer, GridOptions, GridPlugin, MetadataGatherer, MetadataSelector, NoDataRenderer, Ordering, Paging, RowSelector} from '../../interfaces';
import {CONTENT_RENDERER_TYPE, DATA_LOADER_TYPE, GRID_INITIALIZER_TYPE, GRID_OPTIONS, GRID_PLUGIN_INSTANCES, METADATA_GATHERER, METADATA_SELECTOR_TYPE, NO_DATA_RENDERER_TYPE, ORDERING_TYPE, PAGING_TYPE, ROW_SELECTOR_TYPE} from '../../misc/tokens';
import {AsyncDataLoaderSAComponent, BasicPagingSAComponent, BasicRowSelectorSAComponent, NoGridInitializerSAComponent, NoMetadataSelectorSAComponent, NoOrderingSAComponent, SimpleNoDataRendererSAComponent, TableContentRendererSAComponent} from '../../plugins';
import {GridAction, GridFunction, GridPluginInstances} from '../../misc/types';
import {setPluginFactory} from '../../misc/utils';
import {ResolveForwardRefSAPipe} from '../../pipes';

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
            type: forwardRef(() => NoOrderingSAComponent),
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
            type: forwardRef(() => BasicRowSelectorSAComponent),
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
        <FactoryProvider>
        {
            provide: GRID_PLUGIN_INSTANCES,
            useFactory: () => {return {};}
        }
    ]
})
export class GridSAComponent implements OnInit, AfterViewInit, Grid
{
    //######################### protected fields #########################

    /**
     * Grid options
     */
    protected ɵgridOptions: GridOptions;

    /**
     * Subject used for indication that grid was initialized
     */
    protected initializedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //######################### public properties - inputs #########################

    /**
     * Gets or sets grid options
     */
    @Input()
    public get gridOptions(): GridOptions
    {
        return this.ɵgridOptions;
    }
    public set gridOptions(options: GridOptions)
    {
        this.ɵgridOptions = extend(true, this.ɵgridOptions, options);
    }

    //######################### public properties - outputs #########################

    /**
     * Occurs every time when grid is initialized or reinitialized
     */
    public get initialized(): Observable<boolean>
    {
        return this.initializedSubject.asObservable();
    }

    //######################### public properties - children #########################

    /**
     * Metadata gatherer instance
     * @internal
     */
    @ContentChild(METADATA_GATHERER)
    public metadataGatherer: MetadataGatherer|undefined|null;

    //######################### constructors #########################
    constructor(protected changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) protected pluginInstances: GridPluginInstances,
                @Inject(GRID_OPTIONS) @Optional() options?: RecursivePartial<GridOptions>,
                @Inject(PAGING_TYPE) @Optional() pagingType?: Type<Paging>,
                @Inject(ORDERING_TYPE) @Optional() orderingType?: Type<Ordering>,
                @Inject(GRID_INITIALIZER_TYPE) @Optional() gridInitializerType?: Type<GridInitializer>,
                @Inject(DATA_LOADER_TYPE) @Optional() dataLoaderType?: Type<DataLoader>,
                @Inject(CONTENT_RENDERER_TYPE) @Optional() contentRendererType?: Type<ContentRenderer>,
                @Inject(METADATA_SELECTOR_TYPE) @Optional() metadataSelectorType?: Type<MetadataSelector>,
                @Inject(NO_DATA_RENDERER_TYPE) @Optional() noDataRendererType?: Type<NoDataRenderer>,
                @Inject(ROW_SELECTOR_TYPE) @Optional() rowSelectorType?: Type<RowSelector>)
    {
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

        this.ɵgridOptions = extend(true, {}, defaultOptions, opts);
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initOptions();
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit(): void
    {
        if(this.ɵgridOptions.autoInitialize)
        {
            this.initialize();
        }
    }

    //######################### protected methods - template bindings #########################

    /**
     * Sets paging component
     * @param paging - Created paging that is rendered
     */
    protected setPagingComponent = setPluginFactory(GridPluginType.Paging, () => this.ɵgridOptions.plugins.paging).bind(this);

    /**
     * Sets grid initializer component
     * @param gridInitializer - Created grid initializer that is used
     */
    protected setGridInitializerComponent = setPluginFactory(GridPluginType.GridInitializer, () => this.ɵgridOptions.plugins.gridInitializer).bind(this);

    /**
     * Sets metadata selector component
     * @param metadataSelector - Created metadata selector that is used
     */
    protected setMetadataSelectorComponent = setPluginFactory(GridPluginType.MetadataSelector, () => this.ɵgridOptions.plugins.metadataSelector, metadataSelector =>
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
    protected setDataLoaderComponent = setPluginFactory(GridPluginType.DataLoader, () => this.ɵgridOptions.plugins.dataLoader).bind(this);

    /**
     * Sets content renderer component
     * @param contentRenderer - Created content renderer that is rendered
     */
    protected setContentRendererComponent = setPluginFactory(GridPluginType.ContentRenderer, () => this.ɵgridOptions.plugins.contentRenderer).bind(this);

    /**
     * Sets no data renderer component
     * @param noDataRenderer - Created no data renderer that is rendered
     */
    protected setNoDataRendererComponent = setPluginFactory(GridPluginType.NoDataRenderer, () => this.ɵgridOptions.plugins.noDataRenderer).bind(this);

    /**
     * Sets row selector component
     * @param rowSelector - Created row selector that is rendered
     */
    protected setRowSelectorComponent = setPluginFactory(GridPluginType.RowSelector, () => this.ɵgridOptions.plugins.rowSelector).bind(this);

    /**
     * Sets ordering component
     * @param ordering - Created ordering that is rendered
     */
    protected setOrderingComponent = setPluginFactory(GridPluginType.Ordering, () => this.ɵgridOptions.plugins.ordering).bind(this);

    //######################### public methods #########################

    /**
     * Initialize component, automatically called once if not blocked by options
     */
    public initialize()
    {
        this.pluginInstances[GridPluginType.RowSelector].initialize();
        this.pluginInstances[GridPluginType.MetadataSelector].initialize();
        this.pluginInstances[GridPluginType.GridInitializer].initialize();
        this.pluginInstances[GridPluginType.Paging].initialize();
        this.pluginInstances[GridPluginType.ContentRenderer].initialize();
        this.pluginInstances[GridPluginType.NoDataRenderer].initialize();
        this.pluginInstances[GridPluginType.DataLoader].initialize();

        this.initializedSubject.next(true);
    }

    /**
     * Initialize options, automaticaly called during init phase, but can be used to reinitialize GridOptions
     */
    public initOptions()
    {
        if(this.ɵgridOptions.plugins)
        {
            if(this.ɵgridOptions.plugins.paging)
            {
                if(this.ɵgridOptions.plugins.paging.instance &&
                   this.ɵgridOptions.plugins.paging.instance != this.pluginInstances[GridPluginType.Paging])
                {
                    this.pluginInstances[GridPluginType.Paging] = this.ɵgridOptions.plugins.paging.instance;
                    this.ɵgridOptions.plugins.paging.instance.gridPlugins = this.pluginInstances;
                }

                if(this.pluginInstances[GridPluginType.Paging])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.paging && this.ɵgridOptions.plugins.paging.options)
                    {
                        this.pluginInstances[GridPluginType.Paging].options = this.ɵgridOptions.plugins.paging.options;
                    }

                    this.pluginInstances[GridPluginType.Paging].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.ordering)
            {
                if(this.ɵgridOptions.plugins.ordering.instance &&
                   this.ɵgridOptions.plugins.ordering.instance != this.pluginInstances[GridPluginType.Ordering])
                {
                    this.pluginInstances[GridPluginType.Ordering] = this.ɵgridOptions.plugins.ordering.instance;
                    this.ɵgridOptions.plugins.ordering.instance.gridPlugins = this.pluginInstances;
                }

                if(this.pluginInstances[GridPluginType.Ordering])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.ordering && this.ɵgridOptions.plugins.ordering.options)
                    {
                        this.pluginInstances[GridPluginType.Ordering].options = this.ɵgridOptions.plugins.ordering.options;
                    }

                    this.pluginInstances[GridPluginType.Ordering].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.gridInitializer)
            {
                if(this.ɵgridOptions.plugins.gridInitializer.instance &&
                   this.ɵgridOptions.plugins.gridInitializer.instance != this.pluginInstances[GridPluginType.GridInitializer])
                {
                    this.pluginInstances[GridPluginType.GridInitializer] = this.ɵgridOptions.plugins.gridInitializer.instance;
                    this.ɵgridOptions.plugins.gridInitializer.instance.gridPlugins = this.pluginInstances;
                }

                if(this.pluginInstances[GridPluginType.GridInitializer])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.gridInitializer && this.ɵgridOptions.plugins.gridInitializer.options)
                    {
                        this.pluginInstances[GridPluginType.GridInitializer].options = this.ɵgridOptions.plugins.gridInitializer.options;
                    }

                    this.pluginInstances[GridPluginType.GridInitializer].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.dataLoader)
            {
                if(this.ɵgridOptions.plugins.dataLoader.instance &&
                   this.ɵgridOptions.plugins.dataLoader.instance != this.pluginInstances[GridPluginType.DataLoader])
                {
                    this.pluginInstances[GridPluginType.DataLoader] = this.ɵgridOptions.plugins.dataLoader.instance;
                    this.ɵgridOptions.plugins.dataLoader.instance.gridPlugins = this.pluginInstances;
                }

                if(this.pluginInstances[GridPluginType.DataLoader])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.dataLoader && this.ɵgridOptions.plugins.dataLoader.options)
                    {
                        this.pluginInstances[GridPluginType.DataLoader].options = this.ɵgridOptions.plugins.dataLoader.options;
                    }

                    this.pluginInstances[GridPluginType.DataLoader].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.contentRenderer)
            {
                if(this.ɵgridOptions.plugins.contentRenderer.instance &&
                   this.ɵgridOptions.plugins.contentRenderer.instance != this.pluginInstances[GridPluginType.ContentRenderer])
                {
                    this.pluginInstances[GridPluginType.ContentRenderer] = this.ɵgridOptions.plugins.contentRenderer.instance;
                    this.ɵgridOptions.plugins.contentRenderer.instance.gridPlugins = this.pluginInstances;
                }

                if(this.pluginInstances[GridPluginType.ContentRenderer])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.contentRenderer && this.ɵgridOptions.plugins.contentRenderer.options)
                    {
                        this.pluginInstances[GridPluginType.ContentRenderer].options = this.ɵgridOptions.plugins.contentRenderer.options;
                    }

                    this.pluginInstances[GridPluginType.ContentRenderer].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.metadataSelector)
            {
                if(this.ɵgridOptions.plugins.metadataSelector.instance &&
                   this.ɵgridOptions.plugins.metadataSelector.instance != this.pluginInstances[GridPluginType.MetadataSelector])
                {
                    this.pluginInstances[GridPluginType.MetadataSelector] = this.ɵgridOptions.plugins.metadataSelector.instance;
                    this.ɵgridOptions.plugins.metadataSelector.instance.gridPlugins = this.pluginInstances;

                    if(this.metadataGatherer)
                    {
                        this.ɵgridOptions.plugins.metadataSelector.instance.setMetadataGatherer(this.metadataGatherer);
                    }
                }

                if(this.pluginInstances[GridPluginType.MetadataSelector])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.metadataSelector && this.ɵgridOptions.plugins.metadataSelector.options)
                    {
                        this.pluginInstances[GridPluginType.MetadataSelector].options = this.ɵgridOptions.plugins.metadataSelector.options;
                    }

                    this.pluginInstances[GridPluginType.MetadataSelector].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.noDataRenderer)
            {
                if(this.ɵgridOptions.plugins.noDataRenderer.instance &&
                   this.ɵgridOptions.plugins.noDataRenderer.instance != this.pluginInstances[GridPluginType.NoDataRenderer])
                {
                    this.pluginInstances[GridPluginType.NoDataRenderer] = this.ɵgridOptions.plugins.noDataRenderer.instance;
                    this.ɵgridOptions.plugins.noDataRenderer.instance.gridPlugins = this.pluginInstances;
                }

                if(this.pluginInstances[GridPluginType.NoDataRenderer])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.noDataRenderer && this.ɵgridOptions.plugins.noDataRenderer.options)
                    {
                        this.pluginInstances[GridPluginType.NoDataRenderer].options = this.ɵgridOptions.plugins.noDataRenderer.options;
                    }

                    this.pluginInstances[GridPluginType.NoDataRenderer].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.rowSelector)
            {
                if(this.ɵgridOptions.plugins.rowSelector.instance &&
                   this.ɵgridOptions.plugins.rowSelector.instance != this.pluginInstances[GridPluginType.RowSelector])
                {
                    this.pluginInstances[GridPluginType.RowSelector] = this.ɵgridOptions.plugins.rowSelector.instance;
                    this.ɵgridOptions.plugins.rowSelector.instance.gridPlugins = this.pluginInstances;
                }

                if(this.pluginInstances[GridPluginType.RowSelector])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.rowSelector && this.ɵgridOptions.plugins.rowSelector.options)
                    {
                        this.pluginInstances[GridPluginType.RowSelector].options = this.ɵgridOptions.plugins.rowSelector.options;
                    }

                    this.pluginInstances[GridPluginType.RowSelector].initOptions();
                }
            }
        }
    }

    /**
     * Explicitly runs invalidation of content (change detection)
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