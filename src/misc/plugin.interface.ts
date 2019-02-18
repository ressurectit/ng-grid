import {Type, ElementRef} from "@angular/core";

import {Paging} from "../plugins/paging";
import {DataLoader} from "../plugins/dataLoader";
import {ContentRenderer} from "../plugins/contentRenderer";
import {MetadataSelector} from "../plugins/metadataSelector";
import {GridPluginInstances} from "../components/grid";
import {NoDataRenderer} from "../plugins/noDataRenderer";
import {TextsLocator} from "../plugins/textsLocator";
import {RowSelector} from "../plugins/rowSelector";
import {PagingInitializer} from "../plugins/pagingInitializer";

/**
 * Grid plugin interface
 */
export interface GridPlugin
{
    /**
     * Grid plugin instances available for this plugin
     */
    gridPlugins: GridPluginInstances;

    /**
     * Element that represents plugin
     */
    pluginElement: ElementRef;

    /**
     * Options for grid plugin
     */
    options: any;

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    initialize();

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    initOptions();

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}

/**
 * Grid plugin generic interface
 */
export interface GridPluginGeneric<TOptions> extends GridPlugin
{
    options: TOptions;
}

/**
 * All available types of plugins for grid
 */
export class GridPluginTypes
{
    /**
     * Loader that is used for obtaining data that will be displayed
     */
    dataLoader?: PluginDescription<DataLoader<any>>;

    /**
     * Paging component used for applying paging to data
     */
    paging?: PluginDescription<Paging>;

    /**
     * Paging initializer component used for obtaining initial paging data
     */
    pagingInitializer?: PluginDescription<PagingInitializer>;

    /**
     * Metadata selector used for gathering and manipulation with metadata
     */
    metadataSelector?: PluginDescription<MetadataSelector<any>>;

    /**
     * Renderer that renders obtained data
     */
    contentRenderer?: PluginDescription<ContentRenderer<any>>;

    /**
     * Renderer used for rendering information that there are no data currently
     */
    noDataRenderer?: PluginDescription<NoDataRenderer>;

    /**
     * Locator for texts that are used in plugins
     */
    textsLocator?: PluginDescription<TextsLocator>;

    /**
     * Row selector used for handling row selection
     */
    rowSelector?: PluginDescription<RowSelector<any, any, any>>;
}

/**
 * Base options for every plugin
 */
export interface PluginOptions
{
}

/**
 * Base options for every visual plugin (component)
 */
export interface VisualPluginOptions<TCssClasses> extends PluginOptions
{
    /**
     * Css classes applied to visual plugin (component), possible to override only part of classes
     */
    cssClasses?: TCssClasses;
}

/**
 * Defines interface, that describes minimal set of parameters for specifying plugin for grid
 */
export interface PluginDescription<PluginType>
{
    /**
     * Type of plugin that will be dynamically instantiated
     */
    type?: Type<PluginType>|null;

    /**
     * Options that will be passed to dynamically instantiated plugin
     */
    options?: PluginOptions;

    /**
     * Optional callback used for obtaining dynamic instance of plugin (allows direct communication with plugin)
     */
    instanceCallback?: (instance: PluginType|null) => void;

    /**
     * If specified, allows to pass existing instance of plugin to grid, overriding dynamic creation, if it is visual plugin must be rendered outside of grid
     */
    instance?: PluginType;
}