import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';

import {HeaderTableGroupComponent} from '../components/metadata/groupedTable/headerTableGroup.component';
import {GroupedTableMetadataGathererComponent} from '../components/metadata/groupedTable/groupedTableMetadataGatherer.component';
import {HeaderTableGroupColumnComponent} from '../components/metadata/groupedTable/headerTableGroupColumn.component';
import {GroupedTableHeaderContentRendererComponent} from '../plugins/contentRenderer/components';

/**
 * Module for grid components, allows header with grouping
 */
@NgModule(
{
    imports:
    [
        AngularCommonModule,
        CommonDynamicModule,
    ],
    declarations:
    [
        GroupedTableHeaderContentRendererComponent,
        GroupedTableMetadataGathererComponent,
        HeaderTableGroupComponent,
        HeaderTableGroupColumnComponent
    ],
    exports:
    [
        GroupedTableHeaderContentRendererComponent,
        GroupedTableMetadataGathererComponent,
        HeaderTableGroupComponent,
        HeaderTableGroupColumnComponent
    ],
    providers:
    [
    ]
})
export class GroupedGridModule
{
}