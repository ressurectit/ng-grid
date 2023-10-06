import {GridColumn, GridMetadata} from '../../interfaces';

/**
 * Table grid metadata, contains columns
 */
export interface TableGridMetadata<TColumn extends GridColumn = GridColumn> extends GridMetadata
{
    /**
     * Array of columns gathered
     */
    columns: TColumn[];
}