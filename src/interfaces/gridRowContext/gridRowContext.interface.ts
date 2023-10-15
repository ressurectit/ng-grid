import {MatrixGridColumn} from '../gridColumn';
import {GridContext} from '../gridContext/gridContext.interface';

/**
 * Context that is available in content renderer at row level (any type of row)
 */
export interface GridRowContext<TData = unknown, TColumnMetadata extends MatrixGridColumn<TData> = MatrixGridColumn<TData>> extends GridContext<TData, TColumnMetadata>
{
    /**
     * Index of rendered low in current page
     */
    readonly index: number;
}