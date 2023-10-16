import {TemplateRef, ViewChild, Directive} from '@angular/core';

import {MatrixContentRendererDefautTemplates} from '../../../matrixContentRenderer.interface';
import {GridContext, GridDataRowContext, GridRowContext} from '../../../../../../interfaces';
import {GridContainerTemplateSADirective} from '../../../../../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import {ContentContainerTemplateSADirective} from '../../../../../../directives/contentContainerTemplate/contentContainerTemplate.directive';
import {HeaderContainerTemplateSADirective} from '../../../../../../directives/headerContainerTemplate/headerContainerTemplate.directive';
import {FooterContainerTemplateSADirective} from '../../../../../../directives/footerContainerTemplate/footerContainerTemplate.directive';

/**
 * Base component that stores default templates for content renderig
 */
@Directive()
export abstract class BaseDefaultTemplatesSAComponent implements MatrixContentRendererDefautTemplates
{
    //######################### public properties - implementation of MatrixContentRendererDefautTemplates #########################

    /**
     * @inheritdoc
     */
    @ViewChild(GridContainerTemplateSADirective, {static: true, read: TemplateRef})
    public gridContainer!: TemplateRef<GridContext>;

    /**
     * @inheritdoc
     */
    @ViewChild(HeaderContainerTemplateSADirective, {static: true, read: TemplateRef})
    public headerContainer!: TemplateRef<GridContext>; 

    /**
     * @inheritdoc
     */
    @ViewChild(ContentContainerTemplateSADirective, {static: true, read: TemplateRef})
    public contentContainer!: TemplateRef<GridContext>;

    /**
     * @inheritdoc
     */
    @ViewChild(FooterContainerTemplateSADirective, {static: true, read: TemplateRef})
    public footerContainer!: TemplateRef<GridContext>;

    /**
     * @inheritdoc
     */
    public headerRowContainer!: TemplateRef<GridRowContext>[];

    /**
     * @inheritdoc
     */
    public contentRowContainer!: TemplateRef<GridDataRowContext>[];

    /**
     * @inheritdoc
     */
    public footerRowContainer!: TemplateRef<GridRowContext>[];
}