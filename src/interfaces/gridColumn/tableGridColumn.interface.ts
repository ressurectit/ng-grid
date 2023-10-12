import {TemplateRef} from '@angular/core';

import {GridColumn} from './gridColumn.interface';
import {DataCellTemplateContext} from '../dataCellTemplateContext/dataCellTemplate.context';
import {CellTemplateContext} from '../cellTemplateContext/cellTemplate.context';

/**
 * Table grid column definition
 */
export interface TableGridColumn<TData = unknown> extends GridColumn
{
    /**
     * Name of property which is assigned to this column, can use . notation
     */
    readonly name: string|undefined|null;

    /**
     * Text that is displayed in tooltip over grid header
     */
    readonly headerTooltip: string|undefined|null;

    /**
     * Indication whether should be title visible in header
     */
    readonly titleVisible: boolean;

    /**
     * Width as style string, value is exactly same (require units)
     */
    readonly width: string|undefined|null;

    /**
     * Indication that this column can be used for ordering
     */
    readonly ordering: boolean|undefined|null;

    /**
     * Css class that is applied to column header
     */
    readonly headerClass: string|undefined|null;

    /**
     * Css class that is applied to each column cell
     */
    readonly cellClass: string|undefined|null;

    /**
     * Template that is used for rendering of cell header
     */
    readonly headerTemplate: TemplateRef<CellTemplateContext<TableGridColumn<TData>>>|undefined|null;

    /**
     * Template that is used for rendering of cell body
     */
    readonly bodyTemplate: TemplateRef<DataCellTemplateContext<TableGridColumn<TData>>>|undefined|null;
}