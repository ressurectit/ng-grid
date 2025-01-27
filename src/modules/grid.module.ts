import {NgModule} from '@angular/core';

import {GridSAComponent, TableGridColumnSAComponent, TableGridMetadataGathererSAComponent} from '../components';
import {TableGridBodyCellTemplateDirective, TableGridHeaderCellTemplateDirective} from '../directives';

/**
 * Module for grid components
 */
@NgModule(
{
    imports:
    [
        GridSAComponent,
        TableGridMetadataGathererSAComponent,
        TableGridColumnSAComponent,
        TableGridHeaderCellTemplateDirective,
        TableGridBodyCellTemplateDirective,
    ],
    exports:
    [
        GridSAComponent,
        TableGridMetadataGathererSAComponent,
        TableGridColumnSAComponent,
        TableGridHeaderCellTemplateDirective,
        TableGridBodyCellTemplateDirective,
    ],
})
export class GridModule
{
}