import {GridMetadata, MetadataSelector, MetadataSelectorOptions} from '../../../interfaces';

/**
 * No metadata selector options
 */
export interface NoMetadataSelectorOptions extends MetadataSelectorOptions
{
}

/**
 * Public API for 'NoMetadataSelectorComponent'
 */
export interface NoMetadataSelector<TMetadata extends GridMetadata = GridMetadata> extends MetadataSelector<TMetadata>
{
}