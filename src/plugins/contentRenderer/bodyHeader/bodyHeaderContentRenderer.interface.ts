import {EventEmitter} from '@angular/core';

import {CssClassesContentRenderer, GridPlugin, PluginDescription, TableGridColumn, VisualPluginOptions} from '../../../interfaces';

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
export interface HeaderBodyContentRendererOptions<TCssClasses extends CssClassesContentRenderer = CssClassesContentRenderer, TPlugins extends ContentRendererPlugins = ContentRendererPlugins> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Object containing plugins for TableContentRenderer
     */
    plugins: TPlugins;
}

/**
 * Options for 'BodyContentRenderer'
 */
export interface BodyContentRendererOptions<TCssClasses = unknown> extends VisualPluginOptions<TCssClasses>
{
}

/**
 * Definition of renderer for body for ContentRenderer
 */
export interface BodyContentRenderer<TData = unknown, TMetadata = unknown> extends GridPlugin
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
    spanOrderingDirection:
    {
        none: string;
        asc: string;
        desc: string;
    }
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
export interface HeaderContentRenderer<TOrdering = unknown, TMetadata = unknown> extends GridPlugin
{
    /**
     * Metadata used for rendering
     */
    metadata: TMetadata|undefined|null;

    /**
     * Current ordering state
     */
    ordering: TOrdering|undefined|null;

    /**
     * Occurs when ordering has changed
     */
    orderingChange: EventEmitter<void>;

    /**
     * Resets metadata to defaults
     * @param force - Indication whether forcibly reset ordering, otherwise it is reset only if column is not present in displayed metadata
     */
    resetMetadata(force?: boolean): void;
}

/**
 * Metadata for column extended with orderable information
 */
export interface BasicOrderableColumn<TData = unknown> extends TableGridColumn<TData>
{
    orderingClass: string;
}
