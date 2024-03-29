/**
 * Css classes for vertical drag n drop selection
 */
export interface CssClassesVerticalDragNDropSelection
{
    /**
     * Class for element displaying title of dialog
     */
    titleElement: string;

    /**
     * Class for icon element displaying reset metadata
     */
    resetMetadataIconElement: string;

    /**
     * Class for container holding all columns for selection
     */
    columnsContainer: string;

    /**
     * Class for element displaying column
     */
    columnElement: string;

    /**
     * Class for element displaying drag indicator
     */
    dragIndicationElement: string;
}

/**
 * Texts that are used within VerticalDragNDropSelection
 */
export interface VerticalDragNDropSelectionTexts
{
    /**
     * Text that is displayed for selection dialog title
     */
    selectionTitle: string;
}

/**
 * Options for vertical drag n drop selection
 */
export interface VerticalDragNDropSelectionOptions
{
    /**
     * Indication whether is drag disabled
     */
    dragDisabled: boolean;
}