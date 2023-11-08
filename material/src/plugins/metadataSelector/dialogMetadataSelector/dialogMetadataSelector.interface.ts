import {Type} from '@angular/core';
import {GridMetadata, MetadataSelector, MetadataSelectorOptions, VisualPluginOptions} from '@anglr/grid';

/**
 * Css classes for dialog metadata selector
 */
export interface CssClassesDialogMetadataSelector<TCssClasses = unknown>
{
    /**
     * Class for show metadata button element
     */
    btnElement: string;

    /**
     * Class for show metadata button icon element
     */
    btnIconElement: string;

    /**
     * Css classes for component displayed as dialog
     */
    dialogComponentClasses: TCssClasses;
}

/**
 * Texts that are used within DialogMetadataSelector
 */
export interface DialogMetadataSelectorTexts<TTexts = unknown>
{
    /**
     * Text displayed for button that displayes metadata selector
     */
    btnShowSelection: string;

    /**
     * Object storing texts for dialog component
     */
    dialogComponentTexts: TTexts;
}

/**
 * Dialog metadata selector options
 */
export interface DialogMetadataSelectorOptions<TMetadata extends GridMetadata = GridMetadata,
                                               TCssClasses = unknown,
                                               TTexts = unknown> extends MetadataSelectorOptions, VisualPluginOptions<CssClassesDialogMetadataSelector<TCssClasses>>
{
    /**
     * Texts that are used within DialogMetadataSelector
     */
    texts: DialogMetadataSelectorTexts<TTexts>;

    /**
     * Indication whether is button for showing metadata selection visible
     */
    showButtonVisible: boolean;

    /**
     * Name of storage storing current metadata status
     */
    storageName: string|undefined|null;

    /**
     * Component that is used for handling metadata selection itself
     */
    dialogComponent: Type<DialogMetadataSelectorContentComponent<TMetadata, TCssClasses, TTexts>>;
}

/**
 * Public API for 'DialogMetadataSelector'
 */
export interface DialogMetadataSelector<TMetadata extends GridMetadata = GridMetadata> extends MetadataSelector<TMetadata, DialogMetadataSelectorOptions<TMetadata>>
{
}

/**
 * Data that are passed to component that handles metadata
 */
export interface DialogMetadataSelectorComponentData<TMetadata extends GridMetadata = GridMetadata,
                                                     TCssClasses = unknown,
                                                     TTexts = unknown>
{
    /**
     * Method that is used for setting metadata into component
     */
    metadata: TMetadata;

    /**
     * Css classes passed to dialog component
     */
    cssClasses: TCssClasses;

    /**
     * Texts passed to dialog component
     */
    texts: TTexts;

    /**
     * Method that is used for sending metadata out of component to metadata selector
     * @param metadata - Metadata that were changed in component passed back to selector
     */
    setMetadata(metadata: TMetadata): void;
}

/**
 * Component that is rendered within dialog
 */
export interface DialogMetadataSelectorContentComponent<TMetadata extends GridMetadata = GridMetadata,
                                                        TCssClasses = unknown,
                                                        TTexts = unknown>
{
    /**
     * Data that are used for communication with MetadataSelector
     */
    data: DialogMetadataSelectorComponentData<TMetadata, TCssClasses, TTexts>;
}