import {NgModule} from '@angular/core';

import {GridComponent, TableGridColumnComponent, TableGridMetadataGathererComponent} from '../components';
import {TableGridBodyCellTemplateDirective, TableGridHeaderCellTemplateDirective} from '../directives';

/**
 * Module for grid components
 */
@NgModule(
{
    imports:
    [
        GridComponent,
        TableGridMetadataGathererComponent,
        TableGridColumnComponent,
        TableGridHeaderCellTemplateDirective,
        TableGridBodyCellTemplateDirective,
    ],
    exports:
    [
        GridComponent,
        TableGridMetadataGathererComponent,
        TableGridColumnComponent,
        TableGridHeaderCellTemplateDirective,
        TableGridBodyCellTemplateDirective,
    ],
})
export class GridModule
{
}