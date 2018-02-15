import {EventEmitter} from "@angular/core";

/**
 * Basic grid column definition
 */
export interface GridColumn
{
    /**
     * Unique identifier of column
     */
    id?: string;

    /**
     * Title of column that is displayed in grid header
     */
    title?: string;

    /**
     * Indication that this column is visible in grid
     */
    visible?: boolean;
}

/**
 * Token for getting component that is used as metadata gatherer
 */
export class METADATA_GATHERER
{
}

/**
 * Gatherer used for gathering metadata for grid
 */
export interface MetadataGatherer<TMetadata>
{
    /**
     * Information that metadata for grid has changed
     */
    metadataChange: EventEmitter<void>;

    /**
     * Gets current metadata for grid
     */
    getMetadata(): TMetadata;
}