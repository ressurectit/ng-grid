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
 * Base interface for metadata
 */
export interface GatheredMetadata
{
}

/**
 * Gatherer used for gathering metadata for grid
 *
 * If you need to use your own metadata gatherer you need to implement this interface and `Component` that
 * implements this interface must provide itself as `METADATA_GATHERER` see example below:
 *
 * ``` typescript
 * (at)Component(
 * {
 *     selector: 'ng-grid > your-table-metadata',
 *     template: '',
 *     changeDetection: ChangeDetectionStrategy.OnPush,
 *     providers:
 *     [
 *         <ExistingProvider>
 *         {
 *             provide: METADATA_GATHERER,
 *             useExisting: forwardRef(() => YourTableMetadataGathererComponent)
 *         }
 *     ]
 * })
 * export class YourTableMetadataGathererComponent implements MetadataGatherer<YourMetadataType>
 * {
 *     public metadataChange: EventEmitter<void> = new EventEmitter<void>();
 * 
 *     getMetadata(): YourMetadataType
 *     {
 *         return null;//TODO - implement obtaining metadata
 *     }
 * 
 *     //TODO - do what you need to obtain metadata
 * }
 * ```
 */
export interface MetadataGatherer<TMetadata extends GatheredMetadata>
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