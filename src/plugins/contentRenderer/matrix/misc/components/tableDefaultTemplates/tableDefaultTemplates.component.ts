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
import {HeaderContainerTemplateSADirective} from '../../../../../../directives/headerContainerTemplate/headerContainerTemplate.directive';
import {FooterContainerTemplateSADirective} from '../../../../../../directives/footerContainerTemplate/footerContainerTemplate.directive';

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
        GridContainerTemplateSADirective,
        HeaderContainerTemplateSADirective,
        ContentContainerTemplateSADirective,
        FooterContainerTemplateSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDefaultTemplatesSAComponent extends BaseDefaultTemplatesSAComponent implements MatrixContentRendererDefautTemplates
{
}