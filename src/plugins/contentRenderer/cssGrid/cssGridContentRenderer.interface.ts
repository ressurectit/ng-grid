import {ContentRendererOptions, ContentRendererPlugins, ContentRenderer, BodyContentRendererOptions, BodyContentRenderer, CssClassesHeaderContentRenderer, HeaderContentRendererOptions, HeaderContentRenderer, CssClassesContentRenderer} from "../contentRenderer.interface";

/**
 * Css classes for css grid content renderer
 */
export interface CssClassesCssGridContentRenderer extends CssClassesContentRenderer
{
    gridDiv?: string
}

/**
 * Options for css grid content renderer
 */
export interface CssGridContentRendererOptions extends ContentRendererOptions<CssClassesCssGridContentRenderer, ContentRendererPlugins>
{
}

/**
 * Public API for CssGridContentRenderer
 */
export interface CssGridContentRenderer<TOrdering> extends ContentRenderer<TOrdering>
{
}

/**
 * Css classes for css grid body content renderer
 */
export interface CssClassesCssGridBodyContentRenderer
{
    bodyDiv?: string;
    rowDiv?: string;
    cellDiv?: string;
}

/**
 * Options for 'CssGridBodyContentRendererComponent'
 */
export interface CssGridBodyContentRendererOptions extends BodyContentRendererOptions<CssClassesCssGridBodyContentRenderer>
{
}

/**
 * Public API for CssGridBodyContentRenderer
 */
export interface CssGridBodyContentRenderer<TData, TMetadata> extends BodyContentRenderer<TData, TMetadata>
{
}

/**
 * Css classes for css grid header content renderer
 */
export interface CssClassesCssGridHeaderContentRenderer extends CssClassesHeaderContentRenderer
{
    headerDiv?: string;
    headerRowDiv?: string;
    headerCellDiv?: string;
    headerCellOrderableDiv?: string;
    spanContent?: string;
    spanOrdering?: string;
}

/**
 * Options for 'CssGridHeaderContentRendererOptions'
 */
export interface CssGridHeaderContentRendererOptions extends HeaderContentRendererOptions<CssClassesCssGridHeaderContentRenderer>
{
}

/**
 * Public API for CssGridHeaderContentRenderer
 */
export interface CssGridHeaderContentRenderer<TOrdering, TMetadata> extends HeaderContentRenderer<TOrdering, TMetadata>
{
}
