import {NgModule} from '@angular/core';

import {ContentContainerComponent, ContentRowContainerComponent, FooterContainerComponent, FooterRowContainerComponent, GridContainerComponent, HeaderContainerComponent, HeaderRowContainerComponent, MatrixGridComponent} from '../components';
import {ContentCellTemplateDirective, ContentContainerTemplateDirective, ContentRowContainerTemplateDirective, FooterCellTemplateDirective, FooterContainerTemplateDirective, FooterRowContainerTemplateDirective, GridContainerTemplateDirective, HeaderCellTemplateDirective, HeaderContainerTemplateDirective, HeaderRowContainerTemplateDirective, MatrixGridColumnDirective, OrderableDirective} from '../directives';
import {CssGridTemplateColumnsPipe} from '../pipes';

/**
 * Module for matrix grid components and directives
 */
@NgModule(
{
    imports:
    [
        MatrixGridComponent,
        ContentContainerComponent,
        ContentRowContainerComponent,
        FooterContainerComponent,
        FooterRowContainerComponent,
        GridContainerComponent,
        HeaderContainerComponent,
        HeaderRowContainerComponent,
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
        MatrixGridComponent,
        ContentContainerComponent,
        ContentRowContainerComponent,
        FooterContainerComponent,
        FooterRowContainerComponent,
        GridContainerComponent,
        HeaderContainerComponent,
        HeaderRowContainerComponent,
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