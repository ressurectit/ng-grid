import {MetadataSelector, MetadataSelectorOptions} from "../metadataSelector.interface";

/**
 * No metadata selector options
 */
export interface NoMetadataSelectorOptions extends MetadataSelectorOptions
{
}

/**
 * Public API for 'NoMetadataSelectorComponent'
 */
export interface NoMetadataSelector<TMetadata> extends MetadataSelector<TMetadata>
{
}