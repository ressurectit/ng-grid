import {ContentRenderer, CssClassesContentRenderer} from '../../../../interfaces';
import {HeaderBodyContentRendererOptions, BodyContentRendererOptions, BodyContentRenderer, CssClassesHeaderContentRenderer, HeaderContentRendererOptions, HeaderContentRenderer} from '../bodyHeaderContentRenderer.interface';

/**
 * Css classes for css grid content renderer
 */
export interface CssClassesCssDivsContentRenderer extends CssClassesContentRenderer
{
}

/**
 * Options for css grid content renderer
 */
export interface CssDivsContentRendererOptions extends HeaderBodyContentRendererOptions<CssClassesCssDivsContentRenderer>
{
}

/**
 * Public API for CssDivsContentRenderer
 */
export interface CssDivsContentRenderer extends ContentRenderer
{
}

/**
 * Css classes for css grid body content renderer
 */
export interface CssClassesCssDivsBodyContentRenderer
{
    bodyDiv: string;
    rowDiv: string;
    cellDiv: string;
}

/**
 * Options for 'CssDivsBodyContentRendererComponent'
 */
export interface CssDivsBodyContentRendererOptions<TData = unknown> extends BodyContentRendererOptions<TData, CssClassesCssDivsBodyContentRenderer>
{
}

/**
 * Public API for CssDivsBodyContentRenderer
 */
export interface CssDivsBodyContentRenderer<TData = unknown, TMetadata = unknown> extends BodyContentRenderer<TData, TMetadata>
{
}

/**
 * Css classes for css grid header content renderer
 */
export interface CssClassesCssDivsHeaderContentRenderer extends CssClassesHeaderContentRenderer
{
    headerDiv: string;
    headerRowDiv: string;
    headerCellDiv: string;
    spanContent: string;
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
export interface CssDivsHeaderContentRenderer<TMetadata = unknown> extends HeaderContentRenderer<TMetadata>
{
}
