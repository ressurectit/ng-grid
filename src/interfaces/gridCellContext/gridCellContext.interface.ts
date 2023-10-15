import {MatrixGridColumn} from '../gridColumn';
import {GridRowContext} from '../gridRowContext/gridRowContext.interface';

/**
 * Context that is available in content renderer at cell level (any type of cell)
 */
export interface GridCellContext<TData = unknown, TColumnMetadata extends MatrixGridColumn<TData> = MatrixGridColumn<TData>> extends GridRowContext<TData, TColumnMetadata>
{
    /**
     * Metadata for current cell (column)
     */
    readonly metadata: TColumnMetadata;
}