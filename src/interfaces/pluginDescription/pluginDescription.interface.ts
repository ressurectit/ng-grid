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