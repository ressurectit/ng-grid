import {ContentRenderer, HeaderContentRenderer, BodyContentRenderer, BodyContentRendererOptions, ContentRendererOptions, ContentRendererPlugins, CssClassesHeaderContentRenderer, HeaderContentRendererOptions, CssClassesContentRenderer} from '../contentRenderer.interface';

/**
 * Css classes for table content renderer
 */
export interface CssClassesTableContentRenderer extends CssClassesContentRenderer
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
 * Public API for TableContentRenderer
 */
export interface TableContentRenderer<TOrdering = any> extends ContentRenderer<TOrdering>
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
export interface TableBodyContentRenderer<TData = any, TMetadata = any> extends BodyContentRenderer<TData, TMetadata>
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
 * Options for 'TableHeaderContentRendererComponent'
 */
export interface TableHeaderContentRendererOptions extends HeaderContentRendererOptions<CssClassesTableHeaderContentRenderer>
{
}

/**
 * Public API for TableHeaderContentRenderer
 */
export interface TableHeaderContentRenderer<TOrdering = any, TMetadata = any> extends HeaderContentRenderer<TOrdering, TMetadata>
{
}