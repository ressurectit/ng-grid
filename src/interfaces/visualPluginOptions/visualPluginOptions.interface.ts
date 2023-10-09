import {PluginOptions} from '../pluginOptions/pluginOptions.interface';

/**
 * Base options for every visual plugin (component)
 */
export interface VisualPluginOptions<TCssClasses = unknown> extends PluginOptions
{
    /**
     * Css classes applied to visual plugin (component), possible to override only part of classes
     */
    cssClasses: TCssClasses;
}