import {TemplateRef} from '@angular/core';

import {GridColumn} from './gridColumn.interface';
import {TableGridColumnTemplateContext} from './tableGridColumnTemplate.context';

/**
 * Table grid column definition
 */
export interface TableGridColumn<TData = unknown> extends GridColumn
{
    /**
     * Name of property which is assigned to this column, can use . notation
     */
    name: string|undefined|null;

    /**
     * Text that is displayed in tooltip over grid header
     */
    headerTooltip: string|undefined|null;

    /**
     * Indication whether should be title visible in header
     */
    titleVisible: boolean|undefined|null;

    /**
     * Width as style string, value is exactly same (require units)
     */
    width: string|undefined|null;

    /**
     * Indication that this column can be used for ordering
     */
    ordering: boolean|undefined|null;

    /**
     * Css class that is applied to column header
     */
    headerClass: string|undefined|null;

    /**
     * Css class that is applied to each column cell
     */
    cellClass: string|undefined|null;

    /**
     * Template that is used for rendering of cell header
     */
    headerTemplate: TemplateRef<TableGridColumnTemplateContext<TData>>|undefined|null;

    /**
     * Template that is used for rendering of cell body
     */
    bodyTemplate: TemplateRef<TableGridColumnTemplateContext<TData>>|undefined|null;
}