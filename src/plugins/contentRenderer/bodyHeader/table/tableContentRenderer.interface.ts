import {ContentRenderer} from '../../../../interfaces';
import {HeaderContentRenderer, BodyContentRenderer, BodyContentRendererOptions, HeaderBodyContentRendererOptions, CssClassesHeaderContentRenderer, HeaderContentRendererOptions, CssClassesHeaderBodyContentRenderer} from '../bodyHeaderContentRenderer.interface';

/**
 * Css classes for table content renderer
 */
export interface CssClassesTableContentRenderer extends CssClassesHeaderBodyContentRenderer
{
    table: string;
}

/**
 * Options for table content renderer
 */
export interface TableContentRendererOptions extends HeaderBodyContentRendererOptions<CssClassesTableContentRenderer>
{
}

/**
 * Public API for TableContentRenderer
 */
export interface TableContentRenderer extends ContentRenderer
{
}

/**
 * Options for 'TableBodyContentRendererComponent'
 */
export interface TableBodyContentRendererOptions<TData = unknown, TCssClasses = unknown> extends BodyContentRendererOptions<TData, TCssClasses>
{
}

/**
 * Public API for TableBodyContentRenderer
 */
export interface TableBodyContentRenderer<TData = unknown, TMetadata = unknown> extends BodyContentRenderer<TData, TMetadata>
{
}

/**
 * Css classes for table header content renderer
 */
export interface CssClassesTableHeaderContentRenderer extends CssClassesHeaderContentRenderer
{
    thead: string;
    thDefault: string;
    spanContent: string;
}

/**
 * Options for 'TableHeaderContentRendererComponent'
 */
export interface TableHeaderContentRendererOptions extends HeaderContentRendererOptions<CssClassesTableHeaderContentRenderer>
{
}

/**
 * Public API for TableHeaderContentRenderer
 */
export interface TableHeaderContentRenderer<TMetadata = unknown> extends HeaderContentRenderer<TMetadata>
{
}