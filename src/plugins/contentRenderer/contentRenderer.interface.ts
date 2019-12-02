import {EventEmitter} from "@angular/core";
import {OrderByDirection} from "@jscrpt/common";

import {VisualPluginOptions, GridPlugin, PluginDescription} from "../../misc";
import {BasicTableColumn} from "../../components/metadata";

/**
 * Css classes for content renderer
 */
export interface CssClassesContentRenderer
{
    containerDiv?: string;
}

/**
 * Definition of plugins for ContentRenderer
 */
export interface ContentRendererPlugins
{
    /**
     * Plugin used for rendering of header
     */
    headerRenderer?: PluginDescription<HeaderContentRenderer<any, any>>;

    /**
     * Plugin used for rendering of body
     */
    bodyRenderer?: PluginDescription<BodyContentRenderer<any, any>>;
}

/**
 * Options for content renderer
 */
export interface ContentRendererOptions<TCssClasses extends CssClassesContentRenderer, TPlugins extends ContentRendererPlugins> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Object containing plugins for TableContentRenderer
     */
    plugins?: TPlugins;
}

/**
 * Renderer used for rendering (data) content
 */
export interface ContentRenderer<TOrdering> extends GridPlugin
{
    /**
     * Information about current ordering state
     */
    ordering: TOrdering;

    /**
     * Indication that ordering has changed
     */
    orderingChange: EventEmitter<void>;
}

/**
 * Options for 'BodyContentRenderer'
 */
export interface BodyContentRendererOptions<TCssClasses> extends VisualPluginOptions<TCssClasses>
{
}

/**
 * Definition of renderer for body for ContentRenderer
 */
export interface BodyContentRenderer<TData, TMetadata> extends GridPlugin
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
export interface HeaderContentRendererOptions<TCssClasses extends CssClassesHeaderContentRenderer> extends VisualPluginOptions<TCssClasses>
{
}

/**
 * Definition of renderer for header for ContentRenderer
 */
export interface HeaderContentRenderer<TOrdering, TMetadata> extends GridPlugin
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
     */
    resetMetadata(): void;
}

/**
 * Metadata for column extended with orderable information
 */
export interface BasicOrderableColumn<TData> extends BasicTableColumn<TData>
{
    orderingClass: string;
}

/**
 * Definition of simple ordering using one column
 */
export interface SimpleOrdering
{
    /**
     * Order by column name
     */
    orderBy?: string;

    /**
     * Order by column direction
     */
    orderByDirection: OrderByDirection;
}