import {CssClassesMatrixContentRenderer} from '../../plugins/contentRenderer/matrix/matrixContentRenderer.interface';
import {Grid} from '../grid/grid.interface';
import {MatrixGridColumn} from '../gridColumn';
import {GridPluginInstances} from '../gridPluginInstances/gridPluginInstances.interface';

/**
 * Context that is available in content renderer top levels, outside of data scope
 */
export interface GridContext<TData = unknown, TColumnMetadata extends MatrixGridColumn<TData> = MatrixGridColumn<TData>>
{
    /**
     * Instance of grid itself
     */
    readonly grid: Grid;

    /**
     * Instance of grid plugins
     */
    readonly plugins: GridPluginInstances;

    /**
     * All data that are currently rendered
     */
    readonly data: TData[];

    /**
     * All currently rendered columns metadata
     */
    readonly columns: TColumnMetadata[];

    /**
     * All currently available columns metadata for current grid container
     */
    readonly gridColumns: TColumnMetadata[];

    /**
     * Css classes used for rendering content
     */
    readonly contentCssClasses: CssClassesMatrixContentRenderer;
}