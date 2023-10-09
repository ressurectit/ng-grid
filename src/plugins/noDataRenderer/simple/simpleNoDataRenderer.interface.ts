import {NoDataRenderer, NoDataRendererOptions} from '../../../interfaces';

/**
 * Css classes for simple no data renderer
 */
export interface CssClassesSimpleNoDataRenderer
{
    wrapperDiv: string;
    textSpan: string;
}

/**
 * Base simple no data renderer options
 */
export interface SimpleNoDataRendererOptions extends NoDataRendererOptions<CssClassesSimpleNoDataRenderer>
{
}

/**
 * Public API for simple no data renderer
 */
export interface SimpleNoDataRenderer extends NoDataRenderer
{
}