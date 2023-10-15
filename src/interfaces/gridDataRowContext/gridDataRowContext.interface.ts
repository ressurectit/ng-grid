import {MatrixGridColumn} from '../gridColumn';
import {GridRowContext} from '../gridRowContext/gridRowContext.interface';

/**
 * Context that is available in content renderer at row level (content data rows only)
 */
export interface GridDataRowContext<TData = unknown, TColumnMetadata extends MatrixGridColumn<TData> = MatrixGridColumn<TData>> extends GridRowContext<TData, TColumnMetadata>
{
    /**
     * Instance of datum for current row
     */
    readonly datum: TData;

    /**
     * Starting index of currently displayed items
     */
    readonly startingIndex: number;

    /**
     * Row index of displayed item
     */
    readonly rowIndex: number;

    /**
     * Indication whether is row item selected
     */
    readonly isSelected: boolean;
}