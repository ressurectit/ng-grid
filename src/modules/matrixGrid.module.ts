import {NgModule} from '@angular/core';

import {ContentContainerSAComponent, ContentRowContainerSAComponent, FooterContainerSAComponent, FooterRowContainerSAComponent, GridContainerSAComponent, HeaderContainerSAComponent, HeaderRowContainerSAComponent, MatrixGridSAComponent} from '../components';
import {ContentCellTemplateSADirective, ContentContainerTemplateSADirective, ContentRowContainerTemplateSADirective, FooterCellTemplateSADirective, FooterContainerTemplateSADirective, FooterRowContainerTemplateSADirective, GridContainerTemplateSADirective, HeaderCellTemplateSADirective, HeaderContainerTemplateSADirective, HeaderRowContainerTemplateSADirective, MatrixGridColumnSADirective, OrderableSADirective} from '../directives';
import {CssGridTemplateColumnsSAPipe} from '../pipes';

/**
 * Module for matrix grid components and directives
 */
@NgModule(
{
    imports:
    [
        MatrixGridSAComponent,
        ContentContainerSAComponent,
        ContentRowContainerSAComponent,
        FooterContainerSAComponent,
        FooterRowContainerSAComponent,
        GridContainerSAComponent,
        HeaderContainerSAComponent,
        HeaderRowContainerSAComponent,
        ContentCellTemplateSADirective,
        ContentContainerTemplateSADirective,
        ContentRowContainerTemplateSADirective,
        FooterCellTemplateSADirective,
        FooterContainerTemplateSADirective,
        FooterRowContainerTemplateSADirective,
        GridContainerTemplateSADirective,
        HeaderCellTemplateSADirective,
        HeaderContainerTemplateSADirective,
        HeaderRowContainerTemplateSADirective,
        MatrixGridColumnSADirective,
        OrderableSADirective,
        CssGridTemplateColumnsSAPipe,
    ],
    exports:
    [
        MatrixGridSAComponent,
        ContentContainerSAComponent,
        ContentRowContainerSAComponent,
        FooterContainerSAComponent,
        FooterRowContainerSAComponent,
        GridContainerSAComponent,
        HeaderContainerSAComponent,
        HeaderRowContainerSAComponent,
        ContentCellTemplateSADirective,
        ContentContainerTemplateSADirective,
        ContentRowContainerTemplateSADirective,
        FooterCellTemplateSADirective,
        FooterContainerTemplateSADirective,
        FooterRowContainerTemplateSADirective,
        GridContainerTemplateSADirective,
        HeaderCellTemplateSADirective,
        HeaderContainerTemplateSADirective,
        HeaderRowContainerTemplateSADirective,
        MatrixGridColumnSADirective,
        OrderableSADirective,
        CssGridTemplateColumnsSAPipe,
    ],
})
export class MatrixGridModule
{
}