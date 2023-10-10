import {NgModule} from '@angular/core';

import {GridSAComponent} from '../components/grid/grid.component';
import {TableGridColumnSAComponent, TableGridMetadataGathererSAComponent} from '../components';

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
    ],
    exports:
    [
        GridSAComponent,
        TableGridMetadataGathererSAComponent,
        TableGridColumnSAComponent,
    ],
})
export class GridModule
{
}