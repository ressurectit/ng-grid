import {EmbeddedViewRef, ViewContainerRef} from '@angular/core';

import {GridContext} from '../gridContext/gridContext.interface';
import {GridRowContext} from '../gridRowContext/gridRowContext.interface';
import {GridDataRowContext} from '../gridDataRowContext/gridDataRowContext.interface';

/**
 * Type that contains view container for dynamic rendering of its content
 */
export interface RenderableContent
{
    /**
     * View container that is used for rendering its content
     */
    readonly viewContainer: ViewContainerRef;
}

/**
 * Type describing inner structure item
 */
export interface InnerStructureItem<TContext>
{
    /**
     * Component that contains renderable content
     */
    renderableContent: RenderableContent|undefined|null;

    /**
     * Reference to rendered view template
     */
    view: EmbeddedViewRef<TContext>|undefined|null;
}

/**
 * Object used for sharing content renderers inner structure (components composing rendered content)
 */
export interface ContentRendererInnerStructure
{
    /**
     * Inner structure item representing grid container
     */
    gridContainer: InnerStructureItem<GridContext>;

    /**
     * Inner structure item representing
     */
    headerContainer: InnerStructureItem<GridContext>;

    /**
     * Inner structure item representing
     */
    contentContainer: InnerStructureItem<GridContext>;

    /**
     * Inner structure item representing
     */
    footerContainer: InnerStructureItem<GridContext>;

    /**
     * Inner structure item representing
     */
    headerRowContainer: InnerStructureItem<GridRowContext>[];

    /**
     * Inner structure item representing
     */
    contentRowContainer: InnerStructureItem<GridDataRowContext>[];

    /**
     * Inner structure item representing
     */
    footerRowContainer: InnerStructureItem<GridRowContext>[];
}