import {BodyContentRendererOptions, ContentRendererPlugins, HeaderContentRendererOptions, ContentRendererOptions, CssClassesHeaderContentRenderer} from "../contentRenderer.interface";

/**
 * Css classes for css divs content renderer
 */
export interface CssClassesCssDivsContentRenderer
{
}

/**
 * Options for css divs content renderer
 */
export interface CssDivsContentRendererOptions extends ContentRendererOptions<CssClassesCssDivsContentRenderer, ContentRendererPlugins>
{
}

/**
 * Css classes for css divs body content renderer
 */
export interface CssClassesCssDivsBodyContentRenderer
{
    bodyDiv?: string;
    rowDiv?: string;
    cellDiv?: string;
}

/**
 * Options for 'CssDivsBodyContentRendererComponent'
 */
export interface CssDivsBodyContentRendererOptions<TData> extends BodyContentRendererOptions<CssClassesCssDivsBodyContentRenderer, TData>
{
}

/**
 * Css classes for css divs header content renderer
 */
export interface CssClassesCssDivsHeaderContentRenderer extends CssClassesHeaderContentRenderer
{
    headerDiv?: string;
    headerRowDiv?: string;
    headerCellDiv?: string;
    headerCellOrderableDiv?: string;
    spanContent?: string;
    spanOrdering?: string;
}

/**
 * Options for 'CssDivsHeaderContentRendererOptions'
 */
export interface CssDivsHeaderContentRendererOptions extends HeaderContentRendererOptions<CssClassesCssDivsHeaderContentRenderer>
{
}