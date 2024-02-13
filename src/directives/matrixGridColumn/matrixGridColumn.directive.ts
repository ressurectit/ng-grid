import {Input, TemplateRef, Directive, ContentChild, inject} from '@angular/core';

import {MatrixGridColumn, GridCellContext, GridDataCellContext} from '../../interfaces';
import {HeaderCellTemplateSADirective} from '../headerCellTemplate/headerCellTemplate.directive';
import {FooterCellTemplateSADirective} from '../footerCellTemplate/footerCellTemplate.directive';
import {ContentCellTemplateSADirective} from '../contentCellTemplate/contentCellTemplate.directive';
import {DEFAULT_MATRIX_COLUMN_WIDTH} from '../../misc/tokens';

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
    public visible: boolean = true;

    /**
     * @inheritdoc
     */
    @Input()
    public width: string|undefined|null = inject(DEFAULT_MATRIX_COLUMN_WIDTH);

    /**
     * @inheritdoc
     */
    @ContentChild(HeaderCellTemplateSADirective, {static: true, read: TemplateRef})
    public headerTemplate: TemplateRef<GridCellContext<TData, MatrixGridColumn<TData>>>|undefined|null;

    /**
     * @inheritdoc
     */
    @ContentChild(ContentCellTemplateSADirective, {static: true, read: TemplateRef})
    public bodyTemplate: TemplateRef<GridDataCellContext<TData, MatrixGridColumn<TData>>>|undefined|null;

    /**
     * @inheritdoc
     */
    @ContentChild(FooterCellTemplateSADirective, {static: true, read: TemplateRef})
    public footerTemplate: TemplateRef<GridCellContext<TData, MatrixGridColumn<TData>>>|undefined|null;
}