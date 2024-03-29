import {NgModule} from '@angular/core';

import {GridSAComponent, TableGridColumnSAComponent, TableGridMetadataGathererSAComponent} from '../components';
import {TableGridBodyCellTemplateSADirective, TableGridHeaderCellTemplateSADirective} from '../directives';

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
        TableGridHeaderCellTemplateSADirective,
        TableGridBodyCellTemplateSADirective,
    ],
    exports:
    [
        GridSAComponent,
        TableGridMetadataGathererSAComponent,
        TableGridColumnSAComponent,
        TableGridHeaderCellTemplateSADirective,
        TableGridBodyCellTemplateSADirective,
    ],
})
export class GridModule
{
}