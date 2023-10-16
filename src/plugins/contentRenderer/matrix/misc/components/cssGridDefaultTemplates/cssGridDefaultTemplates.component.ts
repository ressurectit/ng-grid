import {Component, ChangeDetectionStrategy} from '@angular/core';

import {MatrixContentRendererDefautTemplates} from '../../../matrixContentRenderer.interface';
import {GridContainerSAComponent} from '../../../../../../components/gridContainer/gridContainer.component';
import {ContentContainerSAComponent} from '../../../../../../components/contentContainer/contentContainer.component';
import {GridContainerTemplateSADirective} from '../../../../../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import {ContentContainerTemplateSADirective} from '../../../../../../directives/contentContainerTemplate/contentContainerTemplate.directive';
import {BaseDefaultTemplatesSAComponent} from '../baseDefaultTemplates/baseDefaultTemplates.component';

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
        GridContainerSAComponent,
        ContentContainerSAComponent,
        GridContainerTemplateSADirective,
        ContentContainerTemplateSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGridDefaultTemplatesSAComponent extends BaseDefaultTemplatesSAComponent implements MatrixContentRendererDefautTemplates
{
}