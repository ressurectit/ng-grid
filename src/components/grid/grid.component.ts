import {Component, ChangeDetectionStrategy, Inject, Optional, Type, Input, OnInit, AfterViewInit, ContentChild, forwardRef, resolveForwardRef, ChangeDetectorRef, FactoryProvider} from '@angular/core';
import {extend} from '@jscrpt/common';
import {Observable, BehaviorSubject} from 'rxjs';

import {PagingPosition} from '../../misc/enums';
import {Paging} from '../../plugins/paging';
import {BasicPagingComponent} from '../../plugins/paging/components';
import {PAGING} from '../../plugins/paging/types';
import {DataLoader} from '../../plugins/dataLoader';
import {AsyncDataLoaderComponent} from '../../plugins/dataLoader/components';
import {DATA_LOADER} from '../../plugins/dataLoader/types';
import {ContentRenderer} from '../../plugins/contentRenderer';
import {TableContentRendererComponent} from '../../plugins/contentRenderer/components';
import {CONTENT_RENDERER} from '../../plugins/contentRenderer/types';
import {MetadataSelector} from '../../plugins/metadataSelector';
import {NoMetadataSelectorComponent} from '../../plugins/metadataSelector/components';
import {METADATA_SELECTOR} from '../../plugins/metadataSelector/types';
import {NoDataRenderer} from '../../plugins/noDataRenderer';
import {SimpleNoDataRendererComponent} from '../../plugins/noDataRenderer/components';
import {NO_DATA_RENDERER} from '../../plugins/noDataRenderer/types';
import {RowSelector} from '../../plugins/rowSelector';
import {BasicRowSelectorComponent} from '../../plugins/rowSelector/components';
import {ROW_SELECTOR} from '../../plugins/rowSelector/types';
import {GridInitializer} from '../../plugins/gridInitializer';
import {NoGridInitializerComponent} from '../../plugins/gridInitializer/components';
import {GRID_INITIALIZER} from '../../plugins/gridInitializer/types';
import {Grid, GridOptions, PluginDescription} from '../../interfaces';
import {GRID_PLUGIN_INSTANCES} from '../../misc/tokens';

//TODO - make grid css class customizable

/**
 * Default 'GridOptions'
 */
const defaultOptions: GridOptions =
{
    autoInitialize: true,
    pagingPosition: PagingPosition.Bottom,
    plugins:
    {
        paging: <PluginDescription<Paging>>
        {
            type: forwardRef(() => BasicPagingComponent)
        },
        metadataSelector: <PluginDescription<MetadataSelector>>
        {
            type: forwardRef(() => NoMetadataSelectorComponent)
        },
        dataLoader: <PluginDescription<DataLoader>>
        {
            type: forwardRef(() => AsyncDataLoaderComponent)
        },
        contentRenderer: <PluginDescription<ContentRenderer>>
        {
            type: forwardRef(() => TableContentRendererComponent)
        },
        noDataRenderer: <PluginDescription<NoDataRenderer>>
        {
            type: forwardRef(() => SimpleNoDataRendererComponent)
        },
        rowSelector: <PluginDescription<RowSelector>>
        {
            type: forwardRef(() => BasicRowSelectorComponent)
        },
        gridInitializer: <PluginDescription<GridInitializer>>
        {
            type: forwardRef(() => NoGridInitializerComponent)
        }
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
    public metadataGatherer: MetadataGatherer;

    //######################### constructors #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) protected _pluginInstances: GridPluginInstances,
                @Inject(GRID_OPTIONS) @Optional() options?: GridOptions,
                @Inject(PAGING_TYPE) @Optional() pagingType?: Type<Paging>,
                @Inject(GRID_INITIALIZER_TYPE) @Optional() gridInitializerType?: Type<GridInitializer>,
                @Inject(DATA_LOADER_TYPE) @Optional() dataLoaderType?: Type<DataLoader>,
                @Inject(CONTENT_RENDERER_TYPE) @Optional() contentRendererType?: Type<ContentRenderer>,
                @Inject(METADATA_SELECTOR_TYPE) @Optional() metadataSelectorType?: Type<MetadataSelector>,
                @Inject(NO_DATA_RENDERER_TYPE) @Optional() noDataRendererType?: Type<NoDataRenderer>,
                @Inject(ROW_SELECTOR_TYPE) @Optional() rowSelectorType?: Type<RowSelector>)
    {
        const opts: GridOptions = extend({}, options);

        if(!opts.plugins)
        {
            opts.plugins = {};
        }

        if(pagingType)
        {
            if(!opts.plugins.paging)
            {
                opts.plugins.paging = {};
            }

            opts.plugins.paging.type = pagingType;
        }

        if(gridInitializerType)
        {
            if(!opts.plugins.gridInitializer)
            {
                opts.plugins.gridInitializer = {};
            }

            opts.plugins.gridInitializer.type = gridInitializerType;
        }

        if(dataLoaderType)
        {
            if(!opts.plugins.dataLoader)
            {
                opts.plugins.dataLoader = {};
            }

            opts.plugins.dataLoader.type = dataLoaderType;
        }
        
        if(contentRendererType)
        {
            if(!opts.plugins.contentRenderer)
            {
                opts.plugins.contentRenderer = {};
            }

            opts.plugins.contentRenderer.type = contentRendererType;
        }

        if(metadataSelectorType)
        {
            if(!opts.plugins.metadataSelector)
            {
                opts.plugins.metadataSelector = {};
            }

            opts.plugins.metadataSelector.type = metadataSelectorType;
        }

        if(noDataRendererType)
        {
            if(!opts.plugins.noDataRenderer)
            {
                opts.plugins.noDataRenderer = {};
            }

            opts.plugins.noDataRenderer.type = noDataRendererType;
        }

        if(rowSelectorType)
        {
            if(!opts.plugins.rowSelector)
            {
                opts.plugins.rowSelector = {};
            }

            opts.plugins.rowSelector.type = rowSelectorType;
        }

        this.ɵgridOptions = extend(true, {}, defaultOptions, opts);
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this.initOptions();
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {
        if(this.ɵgridOptions.autoInitialize)
        {
            this.initialize();
        }
    }

    //######################### public methods - template bindings #########################

    /**
     * Sets paging component
     * @param paging - Created paging that is rendered
     * @internal
     */
    public setPagingComponent(paging: Paging)
    {
        if(!paging)
        {
            return;
        }

        this._pluginInstances[PAGING] = paging;

        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.paging && this.ɵgridOptions.plugins.paging.options)
        {
            paging.options = this.ɵgridOptions.plugins.paging.options;
        }

        paging.initOptions();
        
        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.paging && this.ɵgridOptions.plugins.paging.instanceCallback)
        {
            this.ɵgridOptions.plugins.paging.instanceCallback(paging);
        }
    }

    /**
     * Sets grid initializer component
     * @param gridInitializer - Created grid initializer that is used
     * @internal
     */
    public setGridInitializerComponent(gridInitializer: GridInitializer)
    {
        if(!gridInitializer)
        {
            return;
        }

        this._pluginInstances[GRID_INITIALIZER] = gridInitializer;

        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.gridInitializer && this.ɵgridOptions.plugins.gridInitializer.options)
        {
            gridInitializer.options = this.ɵgridOptions.plugins.gridInitializer.options;
        }

        gridInitializer.initOptions();
        
        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.gridInitializer && this.ɵgridOptions.plugins.gridInitializer.instanceCallback)
        {
            this.ɵgridOptions.plugins.gridInitializer.instanceCallback(gridInitializer);
        }
    }

    /**
     * Sets metadata selector component
     * @param metadataSelector - Created metadata selector that is used
     * @internal
     */
    public setMetadataSelectorComponent(metadataSelector: MetadataSelector)
    {
        if(!metadataSelector)
        {
            return;
        }

        this._pluginInstances[METADATA_SELECTOR] = metadataSelector;

        metadataSelector.metadataGatherer = this.metadataGatherer;

        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.metadataSelector && this.ɵgridOptions.plugins.metadataSelector.options)
        {
            metadataSelector.options = this.ɵgridOptions.plugins.metadataSelector.options;
        }

        metadataSelector.initOptions();
        
        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.metadataSelector && this.ɵgridOptions.plugins.metadataSelector.instanceCallback)
        {
            this.ɵgridOptions.plugins.metadataSelector.instanceCallback(metadataSelector);
        }
    }

    /**
     * Sets data loader component
     * @param dataLoader - Created data loader that is used
     * @internal
     */
    public setDataLoaderComponent(dataLoader: DataLoader)
    {
        if(!dataLoader)
        {
            return;
        }

        this._pluginInstances[DATA_LOADER] = dataLoader;

        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.dataLoader && this.ɵgridOptions.plugins.dataLoader.options)
        {
            dataLoader.options = this.ɵgridOptions.plugins.dataLoader.options;
        }

        dataLoader.initOptions();
        
        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.dataLoader && this.ɵgridOptions.plugins.dataLoader.instanceCallback)
        {
            this.ɵgridOptions.plugins.dataLoader.instanceCallback(dataLoader);
        }
    }

    /**
     * Sets content renderer component
     * @param contentRenderer - Created content renderer that is rendered
     * @internal
     */
    public setContentRendererComponent(contentRenderer: ContentRenderer)
    {
        if(!contentRenderer)
        {
            return;
        }

        this._pluginInstances[CONTENT_RENDERER] = contentRenderer;

        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.contentRenderer && this.ɵgridOptions.plugins.contentRenderer.options)
        {
            contentRenderer.options = this.ɵgridOptions.plugins.contentRenderer.options;
        }

        contentRenderer.initOptions();
        
        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.contentRenderer && this.ɵgridOptions.plugins.contentRenderer.instanceCallback)
        {
            this.ɵgridOptions.plugins.contentRenderer.instanceCallback(contentRenderer);
        }
    }

    /**
     * Sets no data renderer component
     * @param noDataRenderer - Created no data renderer that is rendered
     * @internal
     */
    public setNoDataRendererComponent(noDataRenderer: NoDataRenderer)
    {
        if(!noDataRenderer)
        {
            return;
        }

        this._pluginInstances[NO_DATA_RENDERER] = noDataRenderer;

        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.noDataRenderer && this.ɵgridOptions.plugins.noDataRenderer.options)
        {
            noDataRenderer.options = this.ɵgridOptions.plugins.noDataRenderer.options;
        }

        noDataRenderer.initOptions();
        
        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.noDataRenderer && this.ɵgridOptions.plugins.noDataRenderer.instanceCallback)
        {
            this.ɵgridOptions.plugins.noDataRenderer.instanceCallback(noDataRenderer);
        }
    }

    /**
     * Sets row selector component
     * @param rowSelector - Created row selector that is rendered
     * @internal
     */
    public setRowSelectorComponent(rowSelector: RowSelector)
    {
        if(!rowSelector)
        {
            return;
        }

        this._pluginInstances[ROW_SELECTOR] = rowSelector;

        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.rowSelector && this.ɵgridOptions.plugins.rowSelector.options)
        {
            rowSelector.options = this.ɵgridOptions.plugins.rowSelector.options;
        }

        rowSelector.initOptions();
        
        if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.rowSelector && this.ɵgridOptions.plugins.rowSelector.instanceCallback)
        {
            this.ɵgridOptions.plugins.rowSelector.instanceCallback(rowSelector);
        }
    }

    //######################### public methods #########################

    /**
     * Initialize component, automatically called once if not blocked by options
     */
    public initialize()
    {
        this._pluginInstances[ROW_SELECTOR].initialize();
        this._pluginInstances[METADATA_SELECTOR].initialize();
        this._pluginInstances[GRID_INITIALIZER].initialize();
        this._pluginInstances[PAGING].initialize();
        this._pluginInstances[CONTENT_RENDERER].initialize();
        this._pluginInstances[NO_DATA_RENDERER].initialize();
        this._pluginInstances[DATA_LOADER].initialize();

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
                this.ɵgridOptions.plugins.paging.type = resolveForwardRef(this.ɵgridOptions.plugins.paging.type);

                if(this.ɵgridOptions.plugins.paging.instance &&
                   this.ɵgridOptions.plugins.paging.instance != this._pluginInstances[PAGING])
                {
                    this._pluginInstances[PAGING] = this.ɵgridOptions.plugins.paging.instance;
                    this.ɵgridOptions.plugins.paging.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[PAGING])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.paging && this.ɵgridOptions.plugins.paging.options)
                    {
                        this._pluginInstances[PAGING].options = this.ɵgridOptions.plugins.paging.options;
                    }

                    this._pluginInstances[PAGING].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.gridInitializer)
            {
                this.ɵgridOptions.plugins.gridInitializer.type = resolveForwardRef(this.ɵgridOptions.plugins.gridInitializer.type);

                if(this.ɵgridOptions.plugins.gridInitializer.instance &&
                   this.ɵgridOptions.plugins.gridInitializer.instance != this._pluginInstances[GRID_INITIALIZER])
                {
                    this._pluginInstances[GRID_INITIALIZER] = this.ɵgridOptions.plugins.gridInitializer.instance;
                    this.ɵgridOptions.plugins.gridInitializer.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[GRID_INITIALIZER])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.gridInitializer && this.ɵgridOptions.plugins.gridInitializer.options)
                    {
                        this._pluginInstances[GRID_INITIALIZER].options = this.ɵgridOptions.plugins.gridInitializer.options;
                    }

                    this._pluginInstances[GRID_INITIALIZER].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.dataLoader)
            {
                this.ɵgridOptions.plugins.dataLoader.type = resolveForwardRef(this.ɵgridOptions.plugins.dataLoader.type);

                if(this.ɵgridOptions.plugins.dataLoader.instance &&
                   this.ɵgridOptions.plugins.dataLoader.instance != this._pluginInstances[DATA_LOADER])
                {
                    this._pluginInstances[DATA_LOADER] = this.ɵgridOptions.plugins.dataLoader.instance;
                    this.ɵgridOptions.plugins.dataLoader.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[DATA_LOADER])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.dataLoader && this.ɵgridOptions.plugins.dataLoader.options)
                    {
                        this._pluginInstances[DATA_LOADER].options = this.ɵgridOptions.plugins.dataLoader.options;
                    }

                    this._pluginInstances[DATA_LOADER].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.contentRenderer)
            {
                this.ɵgridOptions.plugins.contentRenderer.type = resolveForwardRef(this.ɵgridOptions.plugins.contentRenderer.type);

                if(this.ɵgridOptions.plugins.contentRenderer.instance &&
                   this.ɵgridOptions.plugins.contentRenderer.instance != this._pluginInstances[CONTENT_RENDERER])
                {
                    this._pluginInstances[CONTENT_RENDERER] = this.ɵgridOptions.plugins.contentRenderer.instance;
                    this.ɵgridOptions.plugins.contentRenderer.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[CONTENT_RENDERER])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.contentRenderer && this.ɵgridOptions.plugins.contentRenderer.options)
                    {
                        this._pluginInstances[CONTENT_RENDERER].options = this.ɵgridOptions.plugins.contentRenderer.options;
                    }

                    this._pluginInstances[CONTENT_RENDERER].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.metadataSelector)
            {
                this.ɵgridOptions.plugins.metadataSelector.type = resolveForwardRef(this.ɵgridOptions.plugins.metadataSelector.type);

                if(this.ɵgridOptions.plugins.metadataSelector.instance &&
                   this.ɵgridOptions.plugins.metadataSelector.instance != this._pluginInstances[METADATA_SELECTOR])
                {
                    this._pluginInstances[METADATA_SELECTOR] = this.ɵgridOptions.plugins.metadataSelector.instance;
                    this.ɵgridOptions.plugins.metadataSelector.instance.gridPlugins = this._pluginInstances;
                    this.ɵgridOptions.plugins.metadataSelector.instance.metadataGatherer = this.metadataGatherer;
                }

                if(this._pluginInstances[METADATA_SELECTOR])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.metadataSelector && this.ɵgridOptions.plugins.metadataSelector.options)
                    {
                        this._pluginInstances[METADATA_SELECTOR].options = this.ɵgridOptions.plugins.metadataSelector.options;
                    }

                    this._pluginInstances[METADATA_SELECTOR].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.noDataRenderer)
            {
                this.ɵgridOptions.plugins.noDataRenderer.type = resolveForwardRef(this.ɵgridOptions.plugins.noDataRenderer.type);

                if(this.ɵgridOptions.plugins.noDataRenderer.instance &&
                   this.ɵgridOptions.plugins.noDataRenderer.instance != this._pluginInstances[NO_DATA_RENDERER])
                {
                    this._pluginInstances[NO_DATA_RENDERER] = this.ɵgridOptions.plugins.noDataRenderer.instance;
                    this.ɵgridOptions.plugins.noDataRenderer.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[NO_DATA_RENDERER])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.noDataRenderer && this.ɵgridOptions.plugins.noDataRenderer.options)
                    {
                        this._pluginInstances[NO_DATA_RENDERER].options = this.ɵgridOptions.plugins.noDataRenderer.options;
                    }

                    this._pluginInstances[NO_DATA_RENDERER].initOptions();
                }
            }

            if(this.ɵgridOptions.plugins.rowSelector)
            {
                this.ɵgridOptions.plugins.rowSelector.type = resolveForwardRef(this.ɵgridOptions.plugins.rowSelector.type);

                if(this.ɵgridOptions.plugins.rowSelector.instance &&
                   this.ɵgridOptions.plugins.rowSelector.instance != this._pluginInstances[ROW_SELECTOR])
                {
                    this._pluginInstances[ROW_SELECTOR] = this.ɵgridOptions.plugins.rowSelector.instance;
                    this.ɵgridOptions.plugins.rowSelector.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[ROW_SELECTOR])
                {
                    if(this.ɵgridOptions.plugins && this.ɵgridOptions.plugins.rowSelector && this.ɵgridOptions.plugins.rowSelector.options)
                    {
                        this._pluginInstances[ROW_SELECTOR].options = this.ɵgridOptions.plugins.rowSelector.options;
                    }

                    this._pluginInstances[ROW_SELECTOR].initOptions();
                }
            }
        }
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    /**
     * Gets instance of plugin by its id
     * @param pluginId - Id of plugin, use constants
     */
    public getPlugin<PluginType extends GridPlugin>(pluginId: string): PluginType
    {
        return this._pluginInstances[pluginId] as PluginType;
    }

    /**
     * Sets GridPluginInstances into GridPlugin
     * @param plugin - Grid plugin to be filled with grid GridPluginInstances
     */
    public setGridPluginInstances(plugin: GridPlugin)
    {
        plugin.gridPlugins = this._pluginInstances;
    }

    /**
     * Executes actions on grid
     * @param actions - Array of actions that are executed over grid
     */
    public execute(...actions: ((grid: GridSAComponent) => void)[])
    {
        if(!actions)
        {
            return;
        }

        actions.forEach(action => action(this));
    }

    /**
     * Executes function on grid and returns result
     * @param func - Function that is executed and its result is returned
     */
    public executeAndReturn<TResult>(func: GridFunction<TResult>): TResult
    {
        if(!func)
        {
            return null;
        }

        return func(this);
    }
}