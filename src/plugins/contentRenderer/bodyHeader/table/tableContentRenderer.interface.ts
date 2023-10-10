import {ContentRenderer, CssClassesContentRenderer} from '../../../../interfaces';
import {HeaderContentRenderer, BodyContentRenderer, BodyContentRendererOptions, HeaderBodyContentRendererOptions, ContentRendererPlugins, CssClassesHeaderContentRenderer, HeaderContentRendererOptions} from '../bodyHeaderContentRenderer.interface';

/**
 * Css classes for table content renderer
 */
export interface CssClassesTableContentRenderer extends CssClassesContentRenderer
{
    table: string;
}

/**
 * Options for table content renderer
 */
export interface TableContentRendererOptions extends HeaderBodyContentRendererOptions<CssClassesTableContentRenderer, ContentRendererPlugins>
{
}

/**
 * Public API for TableContentRenderer
 */
export interface TableContentRenderer<TOrdering = unknown> extends ContentRenderer<TOrdering>
{
}

/**
 * Options for 'TableBodyContentRendererComponent'
 */
export interface TableBodyContentRendererOptions extends BodyContentRendererOptions
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
    thOrderable: string;
    spanContent: string;
    spanOrdering: string;
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
export interface TableHeaderContentRenderer<TOrdering = unknown, TMetadata = unknown> extends HeaderContentRenderer<TOrdering, TMetadata>
{
}