import {ContentRendererOptions, ContentRendererPlugins, ContentRenderer, BodyContentRendererOptions, BodyContentRenderer, CssClassesHeaderContentRenderer, HeaderContentRendererOptions, HeaderContentRenderer, CssClassesContentRenderer} from '../contentRenderer.interface';

/**
 * Css classes for css grid content renderer
 */
export interface CssClassesCssDivsContentRenderer extends CssClassesContentRenderer
{
}

/**
 * Options for css grid content renderer
 */
export interface CssDivsContentRendererOptions extends ContentRendererOptions<CssClassesCssDivsContentRenderer, ContentRendererPlugins>
{
}

/**
 * Public API for CssDivsContentRenderer
 */
export interface CssDivsContentRenderer<TOrdering = any> extends ContentRenderer<TOrdering>
{
}

/**
 * Css classes for css grid body content renderer
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
export interface CssDivsBodyContentRendererOptions extends BodyContentRendererOptions<CssClassesCssDivsBodyContentRenderer>
{
}

/**
 * Public API for CssDivsBodyContentRenderer
 */
export interface CssDivsBodyContentRenderer<TData = any, TMetadata = any> extends BodyContentRenderer<TData, TMetadata>
{
}

/**
 * Css classes for css grid header content renderer
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

/**
 * Public API for CssDivsHeaderContentRenderer
 */
export interface CssDivsHeaderContentRenderer<TOrdering = any, TMetadata = any> extends HeaderContentRenderer<TOrdering, TMetadata>
{
}
