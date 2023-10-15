import {MatrixGridColumn} from '../gridColumn';
import {GridDataRowContext} from '../gridDataRowContext/gridDataRowContext.interface';

/**
 * Context that is available in content renderer at cell level (content data cells only)
 */
export interface GridDataCellContext<TData = unknown, TColumnMetadata extends MatrixGridColumn<TData> = MatrixGridColumn<TData>> extends GridDataRowContext<TData, TColumnMetadata>
{
    /**
     * Metadata for current cell (column)
     */
    readonly metadata: TColumnMetadata;
}