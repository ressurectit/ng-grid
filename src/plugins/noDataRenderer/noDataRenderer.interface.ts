import {TemplateRef} from "@angular/core";
import {NgIfContext} from '@angular/common';

import {VisualPluginOptions, GridPlugin} from "../../misc";

/**
 * Texts that are used within NoDataRenderer
 */
export interface NoDataRendererTexts
{
    /**
     * Text that should be displayed when there is no data available
     */
    noData?: string;

    /**
     * Text that should be displayed when there is no data and data are loaded
     */
    loading?: string;

    /**
     * Text that should be displayed when data were not loaded yet, before first obtaining of data
     */
    notLoaded?: string;
}

/**
 * Base no data renderer options
 */
export interface NoDataRendererOptions<TCssClasses = any> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Texts that are used within NoDataRenderer
     */
    texts?: NoDataRendererTexts;

    /**
     * Custom template for no data
     */
    template?: TemplateRef<NgIfContext<boolean>>;
}

/**
 * public API for no data renderer
 */
export interface NoDataRenderer extends GridPlugin
{
}