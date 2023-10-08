/**
 * Interface describing object storing all existing plugin instances for grid
 */
export interface GridPluginInstances
{
    [pluginName: string]: GridPlugin;
}