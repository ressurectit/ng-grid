import {NgModule} from "@angular/core";
import {CommonModule as AngularCommonModule} from "@angular/common";
import {CommonModule} from "@anglr/common";

import {GridComponent} from "../components/grid/grid.component";
import {BasicPagingComponent, LoadMorePagingComponent, PreviousNextPagingComponent, ContentVirtualScrollPagingComponent, PageVirtualScrollPagingComponent, NoPagingComponent} from "../plugins/paging/components";
import {NoPagingInitializerComponent, QueryCookiePagingInitializerComponent, QueryPagingInitializerComponent} from "../plugins/pagingInitializer/components";
import {AsyncDataLoaderComponent, SyncDataLoaderComponent} from "../plugins/dataLoader/components";
import {HeaderTableGroupComponent} from "../components/metadata/groupedTable/headerTableGroup.component";
import {GroupedTableMetadataGathererComponent} from "../components/metadata/groupedTable/groupedTableMetadataGatherer.component";
import {BasicTableMetadataGathererComponent} from "../components/metadata/basicTable/basicTableMetadataGatherer.component";
import {BasicTableColumnComponent} from "../components/metadata/basicTable/basicTableColumn.component";
import {HeaderTableGroupColumnComponent} from "../components/metadata/groupedTable/headerTableGroupColumn.component";
import {NoMetadataSelectorComponent, AdvancedMetadataSelectorComponent} from "../plugins/metadataSelector/components";
import {GroupedTableHeaderContentRendererComponent, AdvancedTableBodyContentRendererComponent, CssDivsContentRendererComponent, CssDivsHeaderContentRendererComponent, CssDivsBodyContentRendererComponent, TableHeaderContentRendererComponent, TableBodyContentRendererComponent, TableContentRendererComponent} from "../plugins/contentRenderer/components";
import {SimpleNoDataRendererComponent} from "../plugins/noDataRenderer/components";
import {NoTextsLocatorComponent} from "../plugins/textsLocator/components";
import {BasicRowSelectorComponent} from "../plugins/rowSelector/components";

/**
 * Module for grid components
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
        GridComponent,
        BasicTableColumnComponent,
        BasicTableMetadataGathererComponent,
        BasicPagingComponent,
        LoadMorePagingComponent,
        ContentVirtualScrollPagingComponent,
        PageVirtualScrollPagingComponent,
        PreviousNextPagingComponent,
        NoPagingComponent,
        QueryPagingInitializerComponent,
        QueryCookiePagingInitializerComponent,
        NoPagingInitializerComponent,
        SyncDataLoaderComponent,
        AsyncDataLoaderComponent,
        NoMetadataSelectorComponent,
        AdvancedMetadataSelectorComponent,
        TableContentRendererComponent,
        TableBodyContentRendererComponent,
        AdvancedTableBodyContentRendererComponent,
        TableHeaderContentRendererComponent,
        CssDivsContentRendererComponent,
        CssDivsBodyContentRendererComponent,
        CssDivsHeaderContentRendererComponent,
        SimpleNoDataRendererComponent,
        NoTextsLocatorComponent,
        BasicRowSelectorComponent,
        GroupedTableHeaderContentRendererComponent,
        GroupedTableMetadataGathererComponent,
        HeaderTableGroupComponent,
        HeaderTableGroupColumnComponent
    ],
    entryComponents:
    [
        BasicPagingComponent,
        LoadMorePagingComponent,
        ContentVirtualScrollPagingComponent,
        PageVirtualScrollPagingComponent,
        PreviousNextPagingComponent,
        NoPagingComponent,
        QueryPagingInitializerComponent,
        QueryCookiePagingInitializerComponent,
        NoPagingInitializerComponent,
        SyncDataLoaderComponent,
        AsyncDataLoaderComponent,
        NoMetadataSelectorComponent,
        AdvancedMetadataSelectorComponent,
        TableContentRendererComponent,
        TableBodyContentRendererComponent,
        AdvancedTableBodyContentRendererComponent,
        TableHeaderContentRendererComponent,
        CssDivsContentRendererComponent,
        CssDivsBodyContentRendererComponent,
        CssDivsHeaderContentRendererComponent,
        SimpleNoDataRendererComponent,
        NoTextsLocatorComponent,
        BasicRowSelectorComponent,
        GroupedTableHeaderContentRendererComponent
    ],
    exports:
    [
        GridComponent,
        BasicTableColumnComponent,
        BasicTableMetadataGathererComponent,
        BasicPagingComponent,
        LoadMorePagingComponent,
        ContentVirtualScrollPagingComponent,
        PageVirtualScrollPagingComponent,
        PreviousNextPagingComponent,
        NoPagingComponent,
        QueryPagingInitializerComponent,
        QueryCookiePagingInitializerComponent,
        NoPagingInitializerComponent,
        SyncDataLoaderComponent,
        AsyncDataLoaderComponent,
        NoMetadataSelectorComponent,
        AdvancedMetadataSelectorComponent,
        TableContentRendererComponent,
        TableBodyContentRendererComponent,
        AdvancedTableBodyContentRendererComponent,
        TableHeaderContentRendererComponent,
        CssDivsContentRendererComponent,
        CssDivsBodyContentRendererComponent,
        CssDivsHeaderContentRendererComponent,
        SimpleNoDataRendererComponent,
        NoTextsLocatorComponent,
        BasicRowSelectorComponent,
        GroupedTableHeaderContentRendererComponent,
        GroupedTableMetadataGathererComponent,
        HeaderTableGroupComponent,
        HeaderTableGroupColumnComponent
    ],
    providers:
    [
    ]
})
export class GridModule
{
}