import {EventEmitter} from '@angular/core';
import {OrderByDirection} from '@jscrpt/common';

import {PluginDescription} from '../../interfaces';

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
export interface HeaderBodyContentRendererOptions<TCssClasses extends CssClassesContentRenderer = any, TPlugins extends ContentRendererPlugins = any> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Object containing plugins for TableContentRenderer
     */
    plugins?: TPlugins;
}

/**
 * Options for 'BodyContentRenderer'
 */
export interface BodyContentRendererOptions<TCssClasses = any> extends VisualPluginOptions<TCssClasses>
{
}

/**
 * Definition of renderer for body for ContentRenderer
 */
export interface BodyContentRenderer<TData = any, TMetadata = any> extends GridPlugin
{
    /**
     * Data that are rendered
     */
    data: TData[];

    /**
     * Metadata used for rendering
     */
    metadata: TMetadata;
}

/**
 * Css classes for header content renderer
 */
export interface CssClassesHeaderContentRenderer
{
    spanOrderingDirection?:
    {
        none?: string;
        asc?: string;
        desc?: string;
    }
}

/**
 * Options for 'HeaderContentRenderer'
 */
export interface HeaderContentRendererOptions<TCssClasses extends CssClassesHeaderContentRenderer = any> extends VisualPluginOptions<TCssClasses>
{
}

/**
 * Definition of renderer for header for ContentRenderer
 */
export interface HeaderContentRenderer<TOrdering = any, TMetadata = any> extends GridPlugin
{
    /**
     * Metadata used for rendering
     */
    metadata: TMetadata;

    /**
     * Current ordering state
     */
    ordering: TOrdering;

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
export interface BasicOrderableColumn<TData = any> extends BasicGridColumn<TData>
{
    orderingClass: string;
}

