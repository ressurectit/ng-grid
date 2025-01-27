import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatrixContentRendererDefautTemplates} from '../../../matrixContentRenderer.interface';
import {GridContainerComponent} from '../../../../../../components/gridContainer/gridContainer.component';
import {ContentContainerComponent} from '../../../../../../components/contentContainer/contentContainer.component';
import {GridContainerTemplateDirective} from '../../../../../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import {ContentContainerTemplateDirective} from '../../../../../../directives/contentContainerTemplate/contentContainerTemplate.directive';
import {BaseDefaultTemplatesComponent} from '../baseDefaultTemplates/baseDefaultTemplates.component';
import {HeaderContainerComponent} from '../../../../../../components/headerContainer/headerContainer.component';
import {FooterContainerComponent} from '../../../../../../components/footerContainer/footerContainer.component';
import {FooterContainerTemplateDirective} from '../../../../../../directives/footerContainerTemplate/footerContainerTemplate.directive';
import {HeaderContainerTemplateDirective} from '../../../../../../directives/headerContainerTemplate/headerContainerTemplate.directive';
import {HeaderRowContainerComponent} from '../../../../../../components/headerRowContainer/headerRowContainer.component';
import {ContentRowContainerComponent} from '../../../../../../components/contentRowContainer/contentRowContainer.component';
import {FooterRowContainerComponent} from '../../../../../../components/footerRowContainer/footerRowContainer.component';
import {HeaderRowContainerTemplateDirective} from '../../../../../../directives/headerRowContainerTemplate/headerRowContainerTemplate.directive';
import {ContentRowContainerTemplateDirective} from '../../../../../../directives/contentRowContainerTemplate/contentRowContainerTemplate.directive';
import {FooterRowContainerTemplateDirective} from '../../../../../../directives/footerRowContainerTemplate/footerRowContainerTemplate.directive';
import {CssGridTemplateColumnsPipe} from '../../../../../../pipes/cssGridTemplateColumns/cssGridTemplateColumns.pipe';

/**
 * Component that stores default templates for css grid content renderig
 */
@Component(
{
    selector: 'css-grid-defaults',
    templateUrl: 'cssGridDefaultTemplates.component.html',
    imports:
    [
        CommonModule,
        GridContainerComponent,
        HeaderContainerComponent,
        ContentContainerComponent,
        FooterContainerComponent,
        HeaderRowContainerComponent,
        ContentRowContainerComponent,
        FooterRowContainerComponent,
        GridContainerTemplateDirective,
        HeaderContainerTemplateDirective,
        ContentContainerTemplateDirective,
        FooterContainerTemplateDirective,
        HeaderRowContainerTemplateDirective,
        ContentRowContainerTemplateDirective,
        FooterRowContainerTemplateDirective,
        CssGridTemplateColumnsPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGridDefaultTemplatesComponent extends BaseDefaultTemplatesComponent implements MatrixContentRendererDefautTemplates
{
}