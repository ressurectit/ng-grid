import {TemplateRef} from '@angular/core';

import {GridColumn} from './gridColumn.interface';
import {CellTemplateContext} from '../cellTemplateContext/cellTemplate.context';
import {GridCellContext} from '../gridCellContext/gridCellContext.interface';
import {GridDataCellContext} from '../gridDataCellContext/gridDataCellContext.interface';

/**
 * Matrix grid column definition
 */
export interface MatrixGridColumn<TData = unknown> extends GridColumn
{
    /**
     * Width as style string including units, not used in renderer, but can be used by user later for automation
     */
    readonly width: string|undefined|null;

    /**
     * Indication that this column can be used for ordering
     */
    readonly ordering: boolean|undefined|null;

    /**
     * Template that is used for rendering of cell in header row
     */
    readonly headerTemplate: TemplateRef<CellTemplateContext<GridCellContext<TData, MatrixGridColumn<TData>>>>|undefined|null;

    /**
     * Template that is used for rendering of cell in content (body) row
     */
    readonly bodyTemplate: TemplateRef<CellTemplateContext<GridDataCellContext<TData, MatrixGridColumn<TData>>>>|undefined|null;

    /**
     * Template that is used for rendering of cell in footer row
     */
    readonly footerTemplate: TemplateRef<CellTemplateContext<GridCellContext<TData, MatrixGridColumn<TData>>>>|undefined|null;
}