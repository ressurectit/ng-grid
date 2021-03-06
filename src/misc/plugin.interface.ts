import {Type, ElementRef} from "@angular/core";

import {GridPluginInstances} from "../components/grid";

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
export interface GridPluginGeneric<TOptions = any> extends GridPlugin
{
    options: TOptions;
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
export interface VisualPluginOptions<TCssClasses = any> extends PluginOptions
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