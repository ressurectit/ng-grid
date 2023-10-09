import {Func1} from '@jscrpt/common';

import {GridColumn, GridMetadata, MetadataSelector, MetadataSelectorOptions, VisualPluginOptions} from '../../../interfaces';

//TODO - resize columns
//     - compute height of advanced metadata selector

/**
 * Css classes for advanced metadata selector
 */
export interface CssClassesAdvancedMetadataSelector
{
    button:
    {
        topContainerDiv: string;
        containerDiv: string;
        selectionButton: string;
        selectionIconSpan: string;
    },
    selectionDiv:
    {
        containerDiv: string;
        closeContainerDiv: string;
        closeButton: string;
        closeIconSpan: string;
        dropDiv: string;
        dropDraggingClass: string;
        dropDraggingOverClass: string;
        dropSplitSpanDiv: string;
        dropSplitSpanDraggingDiv: string;
        droppedColumnDiv: string;
        droppedColumnTitleDiv: string;
        droppedColumnRemoveDiv: string;
        droppedColumnRemoveButton: string;
        droppedColumnRemoveIconSpan: string;
        draggbleContainerDiv: string;
        draggableColumnDiv: string;
        draggableColumnSpan: string;
        draggableColumnIconSpan: string;
    }
}

/**
 * Texts that are used within AdvancedMetadataSelector
 */
export interface AdvancedMetadataSelectorTexts
{
    /**
     * Text for button 'open selection'
     */
    btnOpenSelection: string;

    /**
     * Text for 'available columns'
     */
    titleAvailableColumns: string;
}

/**
 * Advanced metadata selector options
 */
export interface AdvancedMetadataSelectorOptions extends MetadataSelectorOptions, VisualPluginOptions<CssClassesAdvancedMetadataSelector>
{
    /**
     * Texts that are used within AdvancedMetadataSelector
     */
    texts: AdvancedMetadataSelectorTexts;

    /**
     * Method that traverse through html and finds html elements that represents header columns
     */
    headerColumnGetter: Func1<number[], HTMLElement>|null;

    /**
     * Name of storage storing current metadata status
     */
    storageName: string;
}

/**
 * Public API for 'AdvancedMetadataSelector'
 */
export interface AdvancedMetadataSelector<TMetadata extends GridMetadata = GridMetadata> extends MetadataSelector<TMetadata>
{
}

/**
 * Advanced grid column definition
 */
export interface AdvancedGridColumn extends GridColumn
{
    /**
     * Real rendered width of column
     */
    realWidth: number;
}