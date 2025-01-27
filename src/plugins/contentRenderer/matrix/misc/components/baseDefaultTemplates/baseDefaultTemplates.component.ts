import {TemplateRef, ViewChild, Directive} from '@angular/core';

import {MatrixContentRendererDefautTemplates} from '../../../matrixContentRenderer.interface';
import {GridContext, GridDataRowContext, GridRowContext} from '../../../../../../interfaces';
import {GridContainerTemplateDirective} from '../../../../../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import {ContentContainerTemplateDirective} from '../../../../../../directives/contentContainerTemplate/contentContainerTemplate.directive';
import {HeaderContainerTemplateDirective} from '../../../../../../directives/headerContainerTemplate/headerContainerTemplate.directive';
import {FooterContainerTemplateDirective} from '../../../../../../directives/footerContainerTemplate/footerContainerTemplate.directive';
import {HeaderRowContainerTemplateDirective} from '../../../../../../directives/headerRowContainerTemplate/headerRowContainerTemplate.directive';
import {ContentRowContainerTemplateDirective} from '../../../../../../directives/contentRowContainerTemplate/contentRowContainerTemplate.directive';
import {FooterRowContainerTemplateDirective} from '../../../../../../directives/footerRowContainerTemplate/footerRowContainerTemplate.directive';

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
    @ViewChild(GridContainerTemplateDirective, {static: true, read: TemplateRef})
    public gridContainer!: TemplateRef<GridContext>;

    /**
     * @inheritdoc
     */
    @ViewChild(HeaderContainerTemplateDirective, {static: true, read: TemplateRef})
    public headerContainer!: TemplateRef<GridContext>; 

    /**
     * @inheritdoc
     */
    @ViewChild(ContentContainerTemplateDirective, {static: true, read: TemplateRef})
    public contentContainer!: TemplateRef<GridContext>;

    /**
     * @inheritdoc
     */
    @ViewChild(FooterContainerTemplateDirective, {static: true, read: TemplateRef})
    public footerContainer!: TemplateRef<GridContext>;

    /**
     * @inheritdoc
     */
    @ViewChild(HeaderRowContainerTemplateDirective, {static: true, read: TemplateRef})
    public headerRowContainer!: TemplateRef<GridRowContext>;

    /**
     * @inheritdoc
     */
    @ViewChild(ContentRowContainerTemplateDirective, {static: true, read: TemplateRef})
    public contentRowContainer!: TemplateRef<GridDataRowContext>;

    /**
     * @inheritdoc
     */
    @ViewChild(FooterRowContainerTemplateDirective, {static: true, read: TemplateRef})
    public footerRowContainer!: TemplateRef<GridRowContext>;
}