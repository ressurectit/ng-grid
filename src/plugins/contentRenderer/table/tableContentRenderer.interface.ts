import {BodyContentRendererOptions, ContentRendererOptions, ContentRendererPlugins, CssClassesHeaderContentRenderer, HeaderContentRendererOptions} from "../contentRenderer.interface";

/**
 * Css classes for table content renderer
 */
export interface CssClassesTableContentRenderer
{
    table?: string;
}

/**
 * Options for table content renderer
 */
export interface TableContentRendererOptions extends ContentRendererOptions<CssClassesTableContentRenderer, ContentRendererPlugins>
{
}

/**
 * Options for 'TableBodyContentRendererComponent'
 */
export interface TableBodyContentRendererOptions<TData> extends BodyContentRendererOptions<any, TData>
{
}

/**
 * Css classes for table header content renderer
 */
export interface CssClassesTableHeaderContentRenderer extends CssClassesHeaderContentRenderer
{
    thead?: string;
    thDefault?: string;
    thOrderable?: string;
    spanContent?: string;
    spanOrdering?: string;
}

/**
 * Options for 'TableHeaderContentRendererOptions'
 */
export interface TableHeaderContentRendererOptions extends HeaderContentRendererOptions<CssClassesTableHeaderContentRenderer>
{
}