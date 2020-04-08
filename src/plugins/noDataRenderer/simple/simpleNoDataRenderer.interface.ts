import {NoDataRenderer, NoDataRendererOptions} from "../noDataRenderer.interface";

/**
 * Css classes for simple no data renderer
 */
export interface CssClassesSimpleNoDataRenderer
{
    wrapperDiv?: string;
    textSpan?: string;
}

/**
 * Base simple no data renderer options
 */
export interface SimpleNoDataRendererOptions<TCssClasses = any> extends NoDataRendererOptions<TCssClasses>
{
}

/**
 * public API for simple no data renderer
 */
export interface SimpleNoDataRenderer extends NoDataRenderer
{
}