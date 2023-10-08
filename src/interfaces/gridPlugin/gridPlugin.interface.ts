/**
 * Grid plugin interface
 */
export interface GridPlugin<TOptions = unknown>
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
    options: TOptions;

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