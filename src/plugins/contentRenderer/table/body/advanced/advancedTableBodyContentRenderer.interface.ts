import {TableBodyContentRendererOptions} from "../../tableContentRenderer.interface";

/**
 * Options for advanced table body content renderer
 */
export interface AdvancedTableBodyContentRendererOptions<TData> extends TableBodyContentRendererOptions<TData>
{
    /**
     * Callback allows handle click on the row
     */
    rowClick?: (rowData: TData, index: number) => void;
}