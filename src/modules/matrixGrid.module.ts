import {NgModule} from '@angular/core';

import {ContentContainerSAComponent, ContentRowContainerSAComponent, FooterContainerSAComponent, FooterRowContainerSAComponent, GridContainerSAComponent, HeaderContainerSAComponent, HeaderRowContainerSAComponent, MatrixGridSAComponent} from '../components';
import {ContentCellTemplateDirective, ContentContainerTemplateDirective, ContentRowContainerTemplateDirective, FooterCellTemplateDirective, FooterContainerTemplateDirective, FooterRowContainerTemplateDirective, GridContainerTemplateDirective, HeaderCellTemplateDirective, HeaderContainerTemplateDirective, HeaderRowContainerTemplateDirective, MatrixGridColumnDirective, OrderableDirective} from '../directives';
import {CssGridTemplateColumnsPipe} from '../pipes';

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
        ContentCellTemplateDirective,
        ContentContainerTemplateDirective,
        ContentRowContainerTemplateDirective,
        FooterCellTemplateDirective,
        FooterContainerTemplateDirective,
        FooterRowContainerTemplateDirective,
        GridContainerTemplateDirective,
        HeaderCellTemplateDirective,
        HeaderContainerTemplateDirective,
        HeaderRowContainerTemplateDirective,
        MatrixGridColumnDirective,
        OrderableDirective,
        CssGridTemplateColumnsPipe,
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
        ContentCellTemplateDirective,
        ContentContainerTemplateDirective,
        ContentRowContainerTemplateDirective,
        FooterCellTemplateDirective,
        FooterContainerTemplateDirective,
        FooterRowContainerTemplateDirective,
        GridContainerTemplateDirective,
        HeaderCellTemplateDirective,
        HeaderContainerTemplateDirective,
        HeaderRowContainerTemplateDirective,
        MatrixGridColumnDirective,
        OrderableDirective,
        CssGridTemplateColumnsPipe,
    ],
})
export class MatrixGridModule
{
}