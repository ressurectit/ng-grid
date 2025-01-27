import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatrixContentRendererDefautTemplates} from '../../../matrixContentRenderer.interface';
import {GridContainerSAComponent} from '../../../../../../components/gridContainer/gridContainer.component';
import {ContentContainerSAComponent} from '../../../../../../components/contentContainer/contentContainer.component';
import {GridContainerTemplateSADirective} from '../../../../../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import {ContentContainerTemplateSADirective} from '../../../../../../directives/contentContainerTemplate/contentContainerTemplate.directive';
import {BaseDefaultTemplatesSAComponent} from '../baseDefaultTemplates/baseDefaultTemplates.component';
import {HeaderContainerSAComponent} from '../../../../../../components/headerContainer/headerContainer.component';
import {FooterContainerSAComponent} from '../../../../../../components/footerContainer/footerContainer.component';
import {FooterContainerTemplateSADirective} from '../../../../../../directives/footerContainerTemplate/footerContainerTemplate.directive';
import {HeaderContainerTemplateSADirective} from '../../../../../../directives/headerContainerTemplate/headerContainerTemplate.directive';
import {HeaderRowContainerSAComponent} from '../../../../../../components/headerRowContainer/headerRowContainer.component';
import {ContentRowContainerSAComponent} from '../../../../../../components/contentRowContainer/contentRowContainer.component';
import {FooterRowContainerSAComponent} from '../../../../../../components/footerRowContainer/footerRowContainer.component';
import {HeaderRowContainerTemplateSADirective} from '../../../../../../directives/headerRowContainerTemplate/headerRowContainerTemplate.directive';
import {ContentRowContainerTemplateSADirective} from '../../../../../../directives/contentRowContainerTemplate/contentRowContainerTemplate.directive';
import {FooterRowContainerTemplateSADirective} from '../../../../../../directives/footerRowContainerTemplate/footerRowContainerTemplate.directive';
import {CssGridTemplateColumnsPipe} from '../../../../../../pipes/cssGridTemplateColumns/cssGridTemplateColumns.pipe';

/**
 * Component that stores default templates for css grid content renderig
 */
@Component(
{
    selector: 'css-grid-defaults',
    templateUrl: 'cssGridDefaultTemplates.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        GridContainerSAComponent,
        HeaderContainerSAComponent,
        ContentContainerSAComponent,
        FooterContainerSAComponent,
        HeaderRowContainerSAComponent,
        ContentRowContainerSAComponent,
        FooterRowContainerSAComponent,
        GridContainerTemplateSADirective,
        HeaderContainerTemplateSADirective,
        ContentContainerTemplateSADirective,
        FooterContainerTemplateSADirective,
        HeaderRowContainerTemplateSADirective,
        ContentRowContainerTemplateSADirective,
        FooterRowContainerTemplateSADirective,
        CssGridTemplateColumnsPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGridDefaultTemplatesSAComponent extends BaseDefaultTemplatesSAComponent implements MatrixContentRendererDefautTemplates
{
}