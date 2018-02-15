import {TemplateRef} from "@angular/core";

import {BasicTableColumnContext} from "./basicTableColumn.context";
import {GridColumn} from "../metadata.interface";

/**
 * Basic table column definition
 */
export interface BasicTableColumn<TData> extends GridColumn
{
    /**
     * Name of property which is assigned to this column
     */
    name: string;

    /**
     * Text that is displayed in tooltip over grid header
     */
    headerTooltip: string;

    /**
     * Indication whether should be title visible in header
     */
    titleVisible: boolean;

    /**
     * Width as style string, value is exactly same (require units)
     */
    width: string;

    /**
     * Indication that this column can be used for ordering
     */
    ordering: boolean;

    /**
     * Css class that is applied to column header
     */
    headerClass: string;

    /**
     * Css class that is applied to each column cell
     */
    cellClass: string;

    /**
     * Template that is used for rendering of cell header
     */
    headerTemplate: TemplateRef<BasicTableColumnContext<TData>>;

    /**
     * Template that is used for rendering of cell body
     */
    bodyTemplate: TemplateRef<BasicTableColumnContext<TData>>;

    /**
     * Gets basic table column context
     */
    getColumnContext(data: TData, column: BasicTableColumn<TData>, index: number, startingIndex: number): BasicTableColumnContext<TData>;
}