import {Input, TemplateRef, Directive} from '@angular/core';

import {CellTemplateContext, MatrixGridColumn, GridCellContext, GridDataCellContext} from '../../interfaces';

/**
 * Directive for gathering information about matrix grid column
 */
@Directive(
{
    selector: '[matrixGridColumn]',
    standalone: true,
})
export class MatrixGridColumnSADirective<TData = unknown> implements MatrixGridColumn<TData>
{
    //######################### public properties - implementation of TableGridColumn #########################

    /**
     * @inheritdoc
     */
    @Input({required: true, alias: 'matrixGridColumn'})
    public id: string|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public title: string|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public ordering: boolean|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public visible: boolean = true;

    /**
     * @inheritdoc
     */
    @Input()
    public width: string|undefined|null;

    /**
     * @inheritdoc
     */
    public headerTemplate: TemplateRef<CellTemplateContext<GridCellContext<TData, MatrixGridColumn<TData>>>>|undefined|null;

    /**
     * @inheritdoc
     */
    public bodyTemplate: TemplateRef<CellTemplateContext<GridDataCellContext<TData, MatrixGridColumn<TData>>>>|undefined|null;

    /**
     * @inheritdoc
     */
    public footerTemplate: TemplateRef<CellTemplateContext<GridCellContext<TData, MatrixGridColumn<TData>>>>|undefined|null;
}