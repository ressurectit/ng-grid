import {EventEmitter, InjectionToken} from "@angular/core";
import {OrderByDirection} from "@anglr/common";

import {VisualPluginOptions, GridPlugin, PluginDescription} from "../../misc";
import {BasicTableColumn} from "../../components/metadata";

/**
 * Token for injecting options for content renderer
 */
export const CONTENT_RENDERER_OPTIONS: InjectionToken<ContentRendererOptions<any, any>> = new InjectionToken<ContentRendererOptions<any, any>>('CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content renderer in grid
 */
export const CONTENT_RENDERER = "CONTENT_RENDERER";

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
export interface ContentRendererOptions<TCssClasses, TPlugins extends ContentRendererPlugins> extends VisualPluginOptions<TCssClasses>
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
 * Token for injecting options for content body renderer
 */
export const BODY_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions<any>> = new InjectionToken<VisualPluginOptions<any>>('BODY_CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content body renderer in grid
 */
export const BODY_CONTENT_RENDERER = "BODY_CONTENT_RENDERER";

/**
 * Options for 'BodyContentRenderer'
 */
export interface BodyContentRendererOptions<TCssClasses, TData> extends VisualPluginOptions<TCssClasses>
{
    /**
     * Callback called for each row with data for row returning css class, that will be applied to row element
     */
    rowCssClass?: (rowData: TData) => string;
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
 * Token for injecting options for content header renderer
 */
export const HEADER_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions<any>> = new InjectionToken<VisualPluginOptions<any>>('HEADER_CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content header renderer in grid
 */
export const HEADER_CONTENT_RENDERER = "HEADER_CONTENT_RENDERER";

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