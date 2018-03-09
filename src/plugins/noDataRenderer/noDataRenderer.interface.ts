import {InjectionToken, TemplateRef} from "@angular/core";

import {VisualPluginOptions, GridPlugin} from "../../misc";

/**
 * Token for injecting options for no data renderer
 */
export const NO_DATA_RENDERER_OPTIONS: InjectionToken<NoDataRendererOptions<any>> = new InjectionToken<NoDataRendererOptions<any>>('NO_DATA_RENDERER_OPTIONS');

/**
 * Constant used for accessing no data renderer in grid
 */
export const NO_DATA_RENDERER = "NO_DATA_RENDERER";

/**
 * Base no data renderer options
 */
export interface NoDataRendererOptions<TCssClasses> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Text displayed if no data were obtained
     */
    text?: string;

    /**
     * Custom template for no data
     */
    template?: TemplateRef<void>;
}

/**
 * public API for no data renderer
 */
export interface NoDataRenderer extends GridPlugin
{
}