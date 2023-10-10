import {Observable} from 'rxjs';

import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';
import {VisualPluginOptions} from '../../visualPluginOptions/visualPluginOptions.interface';

/**
 * Css classes for content renderer
 */
export interface CssClassesContentRenderer
{
    containerDiv: string;
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
export interface ContentRenderer<TOrdering = unknown> extends GridPlugin
{
    /**
     * Information about current ordering state
     */
    ordering: TOrdering|undefined|null;

    /**
     * Indication that ordering has changed
     */
    readonly orderingChange: Observable<void>;
}