import {Observable} from 'rxjs';

/**
 * Base grid metadata interface
 */
export interface GridMetadata
{
}

/**
 * Gatherer used for gathering metadata for grid
 */
export interface MetadataGatherer<TMetadata extends GridMetadata = GridMetadata>
{
    /**
     * Information that metadata for grid has changed
     */
    readonly metadataChange: Observable<void>;

    /**
     * Gets current metadata for grid
     */
    getMetadata(): TMetadata;
}