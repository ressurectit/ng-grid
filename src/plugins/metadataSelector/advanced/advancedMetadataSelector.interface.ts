import {MetadataSelector, MetadataSelectorOptions} from "../metadataSelector.interface";
import {VisualPluginOptions} from "../../../misc";
import {GridColumn} from "../../../components/metadata";

//TODO - resize columns
//     - compute height of advanced metadata selector

/**
 * Css classes for advanced metadata selector
 */
export interface CssClassesAdvancedMetadataSelector
{
    button?:
    {
        topContainerDiv?: string;
        containerDiv?: string;
        selectionButton?: string;
        selectionIconSpan?: string;
    },
    selectionDiv?:
    {
        containerDiv?: string;
        closeContainerDiv?: string;
        closeButton?: string;
        closeIconSpan?: string;
        dropDiv?: string;
        dropDraggingClass?: string;
        dropDraggingOverClass?: string;
        dropSplitSpanDiv?: string;
        dropSplitSpanDraggingDiv?: string;
        droppedColumnDiv?: string;
        droppedColumnTitleDiv?: string;
        droppedColumnRemoveDiv?: string;
        droppedColumnRemoveButton?: string;
        droppedColumnRemoveIconSpan?: string;
        draggbleContainerDiv?: string;
        draggableColumnDiv?: string;
        draggableColumnSpan?: string;
        draggableColumnIconSpan?: string;
    }
}

/**
 * Texts that are used within AdvancedMetadataSelector
 */
export interface AdvancedMetadataSelectorTexts
{
    btnOpenSelection?: string;
    titleAvailableColumns?: string;
}

/**
 * Advanced metadata selector options
 */
export interface AdvancedMetadataSelectorOptions extends MetadataSelectorOptions, VisualPluginOptions<CssClassesAdvancedMetadataSelector>
{
    /**
     * Texts that are used withing AdvancedMetadataSelector
     */
    texts?: AdvancedMetadataSelectorTexts;

    /**
     * Method that traverse through html and finds html elements that represents header columns
     */
    headerColumnGetter?: (header: HTMLElement) => number[];

    /**
     * Name of cookie storing current metadata status
     */
    cookieName?: string;
}

/**
 * Public API for 'AdvancedMetadataSelector'
 */
export interface AdvancedMetadataSelector<TMetadata> extends MetadataSelector<TMetadata>
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
    realWidth?: number;
}