import {NgModule} from "@angular/core";
import {CommonModule as AngularCommonModule} from "@angular/common";
import {CommonModule} from "@anglr/common";

import {HeaderTableGroupComponent} from "../components/metadata/groupedTable/headerTableGroup.component";
import {GroupedTableMetadataGathererComponent} from "../components/metadata/groupedTable/groupedTableMetadataGatherer.component";
import {HeaderTableGroupColumnComponent} from "../components/metadata/groupedTable/headerTableGroupColumn.component";
import {GroupedTableHeaderContentRendererComponent} from "../plugins/contentRenderer/components";

/**
 * Module for grid components, allows header with grouping
 */
@NgModule(
{
    imports:
    [
        AngularCommonModule,
        CommonModule
    ],
    declarations:
    [
        GroupedTableHeaderContentRendererComponent,
        GroupedTableMetadataGathererComponent,
        HeaderTableGroupComponent,
        HeaderTableGroupColumnComponent
    ],
    entryComponents:
    [
        GroupedTableHeaderContentRendererComponent
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