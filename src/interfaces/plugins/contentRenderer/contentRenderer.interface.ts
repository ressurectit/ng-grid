import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';
import {VisualPluginOptions} from '../../visualPluginOptions/visualPluginOptions.interface';

/**
 * Css classes for content renderer
 */
export interface CssClassesContentRenderer
{
}

/**
 * Options for content renderer
 */
export interface ContentRendererOptions<TCssClasses extends CssClassesContentRenderer = CssClassesContentRenderer> extends VisualPluginOptions<TCssClasses>
{
}

/**
 * Renderer used for rendering (data) content
 */
export interface ContentRenderer<TOptions extends ContentRendererOptions = ContentRendererOptions> extends GridPlugin<TOptions>
{
}
