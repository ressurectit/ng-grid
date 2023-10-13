import {CssClassesContentRenderer, GridPlugin, PluginDescription, VisualPluginOptions} from '../../../interfaces';

/**
 * Definition of plugins for ContentRenderer
 */
export interface ContentRendererPlugins
{
    /**
     * Plugin used for rendering of header
     */
    headerRenderer: PluginDescription<HeaderContentRenderer>;

    /**
     * Plugin used for rendering of body
     */
    bodyRenderer: PluginDescription<BodyContentRenderer>;
}

/**
 * Options for content renderer
 */
export interface HeaderBodyContentRendererOptions<TCssClasses extends CssClassesContentRenderer = CssClassesContentRenderer> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Object containing plugins for TableContentRenderer
     */
    plugins: ContentRendererPlugins;
}

/**
 * Options for 'BodyContentRenderer'
 */
export interface BodyContentRendererOptions<TData = unknown, TCssClasses = unknown> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Callback allows handle click on the row
     */
    rowClick: ((rowData: TData, index: number) => void)|undefined|null;

    /**
     * Callback called for each row with data for row returning css class, that will be applied to row element
     */
    rowCssClass: ((rowData: TData) => string)|undefined|null;
}

/**
 * Definition of renderer for body for ContentRenderer
 */
export interface BodyContentRenderer<TData = unknown, TMetadata = unknown> extends GridPlugin<BodyContentRendererOptions<TData>>
{
    /**
     * Data that are rendered
     */
    data: TData[];

    /**
     * Metadata used for rendering
     */
    metadata: TMetadata|undefined|null;
}

/**
 * Css classes for header content renderer
 */
export interface CssClassesHeaderContentRenderer
{
}

/**
 * Options for 'HeaderContentRenderer'
 */
export interface HeaderContentRendererOptions<TCssClasses extends CssClassesHeaderContentRenderer = CssClassesHeaderContentRenderer> extends VisualPluginOptions<TCssClasses>
{
}

/**
 * Definition of renderer for header for ContentRenderer
 */
export interface HeaderContentRenderer<TMetadata = unknown> extends GridPlugin<HeaderContentRendererOptions>
{
    /**
     * Metadata used for rendering
     */
    metadata: TMetadata|undefined|null;
}
