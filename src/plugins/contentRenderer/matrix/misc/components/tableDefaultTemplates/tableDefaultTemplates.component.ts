import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatrixContentRendererDefautTemplates} from '../../../matrixContentRenderer.interface';
import {GridContainerSAComponent} from '../../../../../../components/gridContainer/gridContainer.component';
import {ContentContainerSAComponent} from '../../../../../../components/contentContainer/contentContainer.component';
import {GridContainerTemplateDirective} from '../../../../../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import {ContentContainerTemplateDirective} from '../../../../../../directives/contentContainerTemplate/contentContainerTemplate.directive';
import {BaseDefaultTemplatesSAComponent} from '../baseDefaultTemplates/baseDefaultTemplates.component';
import {HeaderContainerSAComponent} from '../../../../../../components/headerContainer/headerContainer.component';
import {FooterContainerSAComponent} from '../../../../../../components/footerContainer/footerContainer.component';
import {HeaderContainerTemplateDirective} from '../../../../../../directives/headerContainerTemplate/headerContainerTemplate.directive';
import {FooterContainerTemplateDirective} from '../../../../../../directives/footerContainerTemplate/footerContainerTemplate.directive';
import {HeaderRowContainerSAComponent} from '../../../../../../components/headerRowContainer/headerRowContainer.component';
import {ContentRowContainerSAComponent} from '../../../../../../components/contentRowContainer/contentRowContainer.component';
import {FooterRowContainerSAComponent} from '../../../../../../components/footerRowContainer/footerRowContainer.component';
import {HeaderRowContainerTemplateDirective} from '../../../../../../directives/headerRowContainerTemplate/headerRowContainerTemplate.directive';
import {ContentRowContainerTemplateDirective} from '../../../../../../directives/contentRowContainerTemplate/contentRowContainerTemplate.directive';
import {FooterRowContainerTemplateDirective} from '../../../../../../directives/footerRowContainerTemplate/footerRowContainerTemplate.directive';

/**
 * Component that stores default templates for table content renderig
 */
@Component(
{
    selector: 'table-defaults',
    templateUrl: 'tableDefaultTemplates.component.html',
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
        GridContainerTemplateDirective,
        HeaderContainerTemplateDirective,
        ContentContainerTemplateDirective,
        FooterContainerTemplateDirective,
        HeaderRowContainerTemplateDirective,
        ContentRowContainerTemplateDirective,
        FooterRowContainerTemplateDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDefaultTemplatesSAComponent extends BaseDefaultTemplatesSAComponent implements MatrixContentRendererDefautTemplates
{
}