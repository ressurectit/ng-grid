import {Component, ChangeDetectionStrategy, Inject, Optional, Type, Input, OnInit, AfterViewInit, ContentChild, forwardRef, resolveForwardRef, ChangeDetectorRef, FactoryProvider} from "@angular/core";
import {Utils} from "@anglr/common";
import {Observable, BehaviorSubject} from 'rxjs';

import {GRID_PLUGIN_INSTANCES, GridPluginInstances, Grid, GridFunction} from "./grid.interface";
import {GridOptions, PagingPosition, PluginDescription, GRID_OPTIONS, PAGING_TYPE, DATA_LOADER_TYPE, CONTENT_RENDERER_TYPE, METADATA_SELECTOR_TYPE, GridPlugin, NO_DATA_RENDERER_TYPE, TEXTS_LOCATOR_TYPE, ROW_SELECTOR_TYPE} from "../../misc";
import {BasicPagingComponent, PAGING, Paging} from "../../plugins/paging";
import {MetadataGatherer, METADATA_GATHERER} from "../metadata";
import {DataLoader, DATA_LOADER, AsyncDataLoaderComponent} from "../../plugins/dataLoader";
import {ContentRenderer, CONTENT_RENDERER, TableContentRendererComponent} from "../../plugins/contentRenderer";
import {MetadataSelector, METADATA_SELECTOR, NoMetadataSelectorComponent} from "../../plugins/metadataSelector";
import {NoDataRenderer, SimpleNoDataRendererComponent, NO_DATA_RENDERER} from "../../plugins/noDataRenderer";
import {NoTextsLocatorComponent, TextsLocator, TEXTS_LOCATOR} from "../../plugins/textsLocator";
import {BasicRowSelectorComponent, RowSelector, ROW_SELECTOR} from "../../plugins/rowSelector";

/**
 * Default 'GridOptions'
 * @internal
 */
const defaultOptions: GridOptions =
{
    autoInitialize: true,
    pagingPosition: PagingPosition.Bottom,
    plugins:
    {
        paging: <PluginDescription<BasicPagingComponent>>
        {
            type: forwardRef(() => BasicPagingComponent)
        },
        metadataSelector: <PluginDescription<NoMetadataSelectorComponent<any>>>
        {
            type: forwardRef(() => NoMetadataSelectorComponent)
        },
        dataLoader: <PluginDescription<AsyncDataLoaderComponent<any, any>>>
        {
            type: forwardRef(() => AsyncDataLoaderComponent)
        },
        contentRenderer: <PluginDescription<TableContentRendererComponent<any, any, any>>>
        {
            type: forwardRef(() => TableContentRendererComponent)
        },
        noDataRenderer: <PluginDescription<SimpleNoDataRendererComponent>>
        {
            type: forwardRef(() => SimpleNoDataRendererComponent)
        },
        textsLocator: <PluginDescription<NoTextsLocatorComponent>>
        {
            type: forwardRef(() => NoTextsLocatorComponent)
        },
        rowSelector: <PluginDescription<BasicRowSelectorComponent<any, any, any>>>
        {
            type: forwardRef(() => BasicRowSelectorComponent)
        }
    }
};

/**
 * Grid plugin instances factory method
 * @internal
 */
export function gridPluginInstancesFactory()
{
    return {};
}

/**
 * Grid component used for rendering grid
 */
@Component(
{
    selector: 'ng-grid',
    templateUrl: 'grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:
    [
        <FactoryProvider>
        {
            provide: GRID_PLUGIN_INSTANCES,
            useFactory: gridPluginInstancesFactory
        }
    ]
})
export class GridComponent implements OnInit, AfterViewInit, Grid
{
    //######################### private fields #########################

    /**
     * Grid options
     */
    private _gridOptions: GridOptions;

    /**
     * Subject used for indication that grid was initialized
     */
    private _initializedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //######################### public properties - inputs #########################

    /**
     * Gets or sets grid options
     */
    @Input()
    public set gridOptions(options: GridOptions)
    {
        this._gridOptions = Utils.common.extend(true, this._gridOptions, options);
    }
    public get gridOptions(): GridOptions
    {
        return this._gridOptions;
    }

    //######################### public properties - outputs #########################

    /**
     * Occurs every time when grid is initialized or reinitialized
     */
    public get initialized(): Observable<boolean>
    {
        return this._initializedSubject.asObservable();
    }

    //######################### public properties - children #########################

    /**
     * Metadata gatherer instance
     * @internal
     */
    @ContentChild(METADATA_GATHERER)
    public metadataGatherer: MetadataGatherer<any>;

    //######################### constructors #########################
    constructor(private _changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) private _pluginInstances: GridPluginInstances,
                @Inject(GRID_OPTIONS) @Optional() options?: GridOptions,
                @Inject(PAGING_TYPE) @Optional() pagingType?: Type<Paging>,
                @Inject(DATA_LOADER_TYPE) @Optional() dataLoaderType?: Type<DataLoader<any>>,
                @Inject(CONTENT_RENDERER_TYPE) @Optional() contentRendererType?: Type<ContentRenderer<any>>,
                @Inject(METADATA_SELECTOR_TYPE) @Optional() metadataSelectorType?: Type<MetadataSelector<any>>,
                @Inject(NO_DATA_RENDERER_TYPE) @Optional() noDataRendererType?: Type<NoDataRenderer>,
                @Inject(TEXTS_LOCATOR_TYPE) @Optional() textsLocatorType?: Type<TextsLocator>,
                @Inject(ROW_SELECTOR_TYPE) @Optional() rowSelectorType?: Type<RowSelector<any, any, any>>)
    {
        let opts: GridOptions = Utils.common.extend({}, options);

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

        if(textsLocatorType)
        {
            if(!opts.plugins.textsLocator)
            {
                opts.plugins.textsLocator = {};
            }

            opts.plugins.textsLocator.type = textsLocatorType;
        }

        if(rowSelectorType)
        {
            if(!opts.plugins.rowSelector)
            {
                opts.plugins.rowSelector = {};
            }

            opts.plugins.rowSelector.type = rowSelectorType;
        }

        this._gridOptions = Utils.common.extend(true, {}, defaultOptions, opts);
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
        if(this._gridOptions.autoInitialize)
        {
            this.initialize();
        }
    }

    //######################### public methods - template bindings #########################

    /**
     * Sets paging component
     * @param {Paging} paging Created paging that is rendered
     * @internal
     */
    public setPagingComponent(paging: Paging)
    {
        if(!paging)
        {
            return;
        }

        this._pluginInstances[PAGING] = paging;

        if(this._gridOptions.plugins && this._gridOptions.plugins.paging && this._gridOptions.plugins.paging.options)
        {
            paging.options = this._gridOptions.plugins.paging.options;
        }

        paging.initOptions();
        
        if(this._gridOptions.plugins && this._gridOptions.plugins.paging && this._gridOptions.plugins.paging.instanceCallback)
        {
            this._gridOptions.plugins.paging.instanceCallback(paging);
        }
    }

    /**
     * Sets metadata selector component
     * @param {MetadataSelector<any>} metadataSelector Created metadata selector that is used
     * @internal
     */
    public setMetadataSelectorComponent(metadataSelector: MetadataSelector<any>)
    {
        if(!metadataSelector)
        {
            return;
        }

        this._pluginInstances[METADATA_SELECTOR] = metadataSelector;

        metadataSelector.metadataGatherer = this.metadataGatherer;

        if(this._gridOptions.plugins && this._gridOptions.plugins.metadataSelector && this._gridOptions.plugins.metadataSelector.options)
        {
            metadataSelector.options = this._gridOptions.plugins.metadataSelector.options;
        }

        metadataSelector.initOptions();
        
        if(this._gridOptions.plugins && this._gridOptions.plugins.metadataSelector && this._gridOptions.plugins.metadataSelector.instanceCallback)
        {
            this._gridOptions.plugins.metadataSelector.instanceCallback(metadataSelector);
        }
    }

    /**
     * Sets data loader component
     * @param {DataLoader} dataLoader Created data loader that is used
     * @internal
     */
    public setDataLoaderComponent(dataLoader: DataLoader<any>)
    {
        if(!dataLoader)
        {
            return;
        }

        this._pluginInstances[DATA_LOADER] = dataLoader;

        if(this._gridOptions.plugins && this._gridOptions.plugins.dataLoader && this._gridOptions.plugins.dataLoader.options)
        {
            dataLoader.options = this._gridOptions.plugins.dataLoader.options;
        }

        dataLoader.initOptions();
        
        if(this._gridOptions.plugins && this._gridOptions.plugins.dataLoader && this._gridOptions.plugins.dataLoader.instanceCallback)
        {
            this._gridOptions.plugins.dataLoader.instanceCallback(dataLoader);
        }
    }

    /**
     * Sets content renderer component
     * @param {ContentRenderer<any>} contentRenderer Created content renderer that is rendered
     * @internal
     */
    public setContentRendererComponent(contentRenderer: ContentRenderer<any>)
    {
        if(!contentRenderer)
        {
            return;
        }

        this._pluginInstances[CONTENT_RENDERER] = contentRenderer;

        if(this._gridOptions.plugins && this._gridOptions.plugins.contentRenderer && this._gridOptions.plugins.contentRenderer.options)
        {
            contentRenderer.options = this._gridOptions.plugins.contentRenderer.options;
        }

        contentRenderer.initOptions();
        
        if(this._gridOptions.plugins && this._gridOptions.plugins.contentRenderer && this._gridOptions.plugins.contentRenderer.instanceCallback)
        {
            this._gridOptions.plugins.contentRenderer.instanceCallback(contentRenderer);
        }
    }

    /**
     * Sets no data renderer component
     * @param {NoDataRenderer} noDataRenderer Created no data renderer that is rendered
     * @internal
     */
    public setNoDataRendererComponent(noDataRenderer: NoDataRenderer)
    {
        if(!noDataRenderer)
        {
            return;
        }

        this._pluginInstances[NO_DATA_RENDERER] = noDataRenderer;

        if(this._gridOptions.plugins && this._gridOptions.plugins.noDataRenderer && this._gridOptions.plugins.noDataRenderer.options)
        {
            noDataRenderer.options = this._gridOptions.plugins.noDataRenderer.options;
        }

        noDataRenderer.initOptions();
        
        if(this._gridOptions.plugins && this._gridOptions.plugins.noDataRenderer && this._gridOptions.plugins.noDataRenderer.instanceCallback)
        {
            this._gridOptions.plugins.noDataRenderer.instanceCallback(noDataRenderer);
        }
    }

    /**
     * Sets texts locator component
     * @param {TextsLocator} textsLocator Created texts locator that is rendered
     * @internal
     */
    public setTextsLocatorComponent(textsLocator: TextsLocator)
    {
        if(!textsLocator)
        {
            return;
        }

        this._pluginInstances[TEXTS_LOCATOR] = textsLocator;

        if(this._gridOptions.plugins && this._gridOptions.plugins.textsLocator && this._gridOptions.plugins.textsLocator.options)
        {
            textsLocator.options = this._gridOptions.plugins.textsLocator.options;
        }

        textsLocator.initOptions();
        
        if(this._gridOptions.plugins && this._gridOptions.plugins.textsLocator && this._gridOptions.plugins.textsLocator.instanceCallback)
        {
            this._gridOptions.plugins.textsLocator.instanceCallback(textsLocator);
        }
    }

    /**
     * Sets row selector component
     * @param {RowSelector<any, any, any>} rowSelector Created row selector that is rendered
     * @internal
     */
    public setRowSelectorComponent(rowSelector: RowSelector<any, any, any>)
    {
        if(!rowSelector)
        {
            return;
        }

        this._pluginInstances[ROW_SELECTOR] = rowSelector;

        if(this._gridOptions.plugins && this._gridOptions.plugins.rowSelector && this._gridOptions.plugins.rowSelector.options)
        {
            rowSelector.options = this._gridOptions.plugins.rowSelector.options;
        }

        rowSelector.initOptions();
        
        if(this._gridOptions.plugins && this._gridOptions.plugins.rowSelector && this._gridOptions.plugins.rowSelector.instanceCallback)
        {
            this._gridOptions.plugins.rowSelector.instanceCallback(rowSelector);
        }
    }

    //######################### public methods #########################

    /**
     * Initialize component, automatically called once if not blocked by options
     */
    public initialize()
    {
        this._pluginInstances[TEXTS_LOCATOR].initialize();
        this._pluginInstances[ROW_SELECTOR].initialize();
        this._pluginInstances[METADATA_SELECTOR].initialize();
        this._pluginInstances[PAGING].initialize();
        this._pluginInstances[CONTENT_RENDERER].initialize();
        this._pluginInstances[NO_DATA_RENDERER].initialize();
        this._pluginInstances[DATA_LOADER].initialize();

        this._initializedSubject.next(true);
    }

    /**
     * Initialize options, automaticaly called during init phase, but can be used to reinitialize GridOptions
     */
    public initOptions()
    {
        if(this._gridOptions.plugins)
        {
            if(this._gridOptions.plugins.paging)
            {
                this._gridOptions.plugins.paging.type = resolveForwardRef(this._gridOptions.plugins.paging.type);

                if(this._gridOptions.plugins.paging.instance &&
                   this._gridOptions.plugins.paging.instance != this._pluginInstances[PAGING])
                {
                    this._pluginInstances[PAGING] = this._gridOptions.plugins.paging.instance;
                    this._gridOptions.plugins.paging.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[PAGING])
                {
                    if(this._gridOptions.plugins && this._gridOptions.plugins.paging && this._gridOptions.plugins.paging.options)
                    {
                        this._pluginInstances[PAGING].options = this._gridOptions.plugins.paging.options;
                    }

                    this._pluginInstances[PAGING].initOptions();
                }
            }

            if(this._gridOptions.plugins.dataLoader)
            {
                this._gridOptions.plugins.dataLoader.type = resolveForwardRef(this._gridOptions.plugins.dataLoader.type);

                if(this._gridOptions.plugins.dataLoader.instance &&
                   this._gridOptions.plugins.dataLoader.instance != this._pluginInstances[DATA_LOADER])
                {
                    this._pluginInstances[DATA_LOADER] = this._gridOptions.plugins.dataLoader.instance;
                    this._gridOptions.plugins.dataLoader.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[DATA_LOADER])
                {
                    if(this._gridOptions.plugins && this._gridOptions.plugins.dataLoader && this._gridOptions.plugins.dataLoader.options)
                    {
                        this._pluginInstances[DATA_LOADER].options = this._gridOptions.plugins.dataLoader.options;
                    }

                    this._pluginInstances[DATA_LOADER].initOptions();
                }
            }

            if(this._gridOptions.plugins.contentRenderer)
            {
                this._gridOptions.plugins.contentRenderer.type = resolveForwardRef(this._gridOptions.plugins.contentRenderer.type);

                if(this._gridOptions.plugins.contentRenderer.instance &&
                   this._gridOptions.plugins.contentRenderer.instance != this._pluginInstances[CONTENT_RENDERER])
                {
                    this._pluginInstances[CONTENT_RENDERER] = this._gridOptions.plugins.contentRenderer.instance;
                    this._gridOptions.plugins.contentRenderer.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[CONTENT_RENDERER])
                {
                    if(this._gridOptions.plugins && this._gridOptions.plugins.contentRenderer && this._gridOptions.plugins.contentRenderer.options)
                    {
                        this._pluginInstances[CONTENT_RENDERER].options = this._gridOptions.plugins.contentRenderer.options;
                    }

                    this._pluginInstances[CONTENT_RENDERER].initOptions();
                }
            }

            if(this._gridOptions.plugins.metadataSelector)
            {
                this._gridOptions.plugins.metadataSelector.type = resolveForwardRef(this._gridOptions.plugins.metadataSelector.type);

                if(this._gridOptions.plugins.metadataSelector.instance &&
                   this._gridOptions.plugins.metadataSelector.instance != this._pluginInstances[METADATA_SELECTOR])
                {
                    this._pluginInstances[METADATA_SELECTOR] = this._gridOptions.plugins.metadataSelector.instance;
                    this._gridOptions.plugins.metadataSelector.instance.gridPlugins = this._pluginInstances;
                    this._gridOptions.plugins.metadataSelector.instance.metadataGatherer = this.metadataGatherer;
                }

                if(this._pluginInstances[METADATA_SELECTOR])
                {
                    if(this._gridOptions.plugins && this._gridOptions.plugins.metadataSelector && this._gridOptions.plugins.metadataSelector.options)
                    {
                        this._pluginInstances[METADATA_SELECTOR].options = this._gridOptions.plugins.metadataSelector.options;
                    }

                    this._pluginInstances[METADATA_SELECTOR].initOptions();
                }
            }

            if(this._gridOptions.plugins.noDataRenderer)
            {
                this._gridOptions.plugins.noDataRenderer.type = resolveForwardRef(this._gridOptions.plugins.noDataRenderer.type);

                if(this._gridOptions.plugins.noDataRenderer.instance &&
                   this._gridOptions.plugins.noDataRenderer.instance != this._pluginInstances[NO_DATA_RENDERER])
                {
                    this._pluginInstances[NO_DATA_RENDERER] = this._gridOptions.plugins.noDataRenderer.instance;
                    this._gridOptions.plugins.noDataRenderer.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[NO_DATA_RENDERER])
                {
                    if(this._gridOptions.plugins && this._gridOptions.plugins.noDataRenderer && this._gridOptions.plugins.noDataRenderer.options)
                    {
                        this._pluginInstances[NO_DATA_RENDERER].options = this._gridOptions.plugins.noDataRenderer.options;
                    }

                    this._pluginInstances[NO_DATA_RENDERER].initOptions();
                }
            }

            if(this._gridOptions.plugins.textsLocator)
            {
                this._gridOptions.plugins.textsLocator.type = resolveForwardRef(this._gridOptions.plugins.textsLocator.type);

                if(this._gridOptions.plugins.textsLocator.instance &&
                   this._gridOptions.plugins.textsLocator.instance != this._pluginInstances[TEXTS_LOCATOR])
                {
                    this._pluginInstances[TEXTS_LOCATOR] = this._gridOptions.plugins.textsLocator.instance;
                    this._gridOptions.plugins.textsLocator.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[TEXTS_LOCATOR])
                {
                    if(this._gridOptions.plugins && this._gridOptions.plugins.textsLocator && this._gridOptions.plugins.textsLocator.options)
                    {
                        this._pluginInstances[TEXTS_LOCATOR].options = this._gridOptions.plugins.textsLocator.options;
                    }

                    this._pluginInstances[TEXTS_LOCATOR].initOptions();
                }
            }

            if(this._gridOptions.plugins.rowSelector)
            {
                this._gridOptions.plugins.rowSelector.type = resolveForwardRef(this._gridOptions.plugins.rowSelector.type);

                if(this._gridOptions.plugins.rowSelector.instance &&
                   this._gridOptions.plugins.rowSelector.instance != this._pluginInstances[ROW_SELECTOR])
                {
                    this._pluginInstances[ROW_SELECTOR] = this._gridOptions.plugins.rowSelector.instance;
                    this._gridOptions.plugins.rowSelector.instance.gridPlugins = this._pluginInstances;
                }

                if(this._pluginInstances[ROW_SELECTOR])
                {
                    if(this._gridOptions.plugins && this._gridOptions.plugins.rowSelector && this._gridOptions.plugins.rowSelector.options)
                    {
                        this._pluginInstances[ROW_SELECTOR].options = this._gridOptions.plugins.rowSelector.options;
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
     * @param {string} pluginId Id of plugin, use constants
     */
    public getPlugin<PluginType extends GridPlugin>(pluginId: string): PluginType
    {
        return this._pluginInstances[pluginId] as PluginType;
    }

    /**
     * Sets GridPluginInstances into GridPlugin
     * @param {GridPlugin} plugin Grid plugin to be filled with grid GridPluginInstances
     */
    public setGridPluginInstances(plugin: GridPlugin)
    {
        plugin.gridPlugins = this._pluginInstances;
    }

    /**
     * Executes actions on grid
     * @param actions Array of actions that are executed over grid
     */
    public execute(...actions: ((grid: GridComponent) => void)[])
    {
        if(!actions)
        {
            return;
        }

        actions.forEach(action => action(this));
    }

    /**
     * Executes function on grid and returns result
     * @param func Function that is executed and its result is returned
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