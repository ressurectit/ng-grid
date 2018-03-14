import {TableBodyContentRendererOptions} from "../../tableContentRenderer.interface";
import {BodyContentRenderer} from '../../../contentRenderer.interface';

/**
 * Options for advanced table body content renderer
 */
export interface AdvancedTableBodyContentRendererOptions<TData> extends TableBodyContentRendererOptions
{
    /**
     * Callback allows handle click on the row
     */
    rowClick?: (rowData: TData, index: number) => void;

    /**
     * Callback called for each row with data for row returning css class, that will be applied to row element
     */
    rowCssClass?: (rowData: TData) => string;
}

/**
 * Public API for AdvancedTableBodyContentRenderer
 */
export interface AdvancedTableBodyContentRenderer<TData, TMetadata> extends BodyContentRenderer<TData, TMetadata>
{
}