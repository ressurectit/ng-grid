import {TemplateRef} from "@angular/core";

import {VisualPluginOptions, GridPlugin} from "../../misc";

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
     * Text displayed when plugin was not initialized
     */
    initText?: string;

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