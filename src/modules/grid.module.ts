import {NgModule} from "@angular/core";
import {CommonModule as AngularCommonModule} from "@angular/common";
import {CommonModule} from "@anglr/common";

import {GridComponent} from "../components/grid/grid.component";
import {BasicPagingComponent, LoadMorePagingComponent, PreviousNextPagingComponent, ContentVirtualScrollPagingComponent, PageVirtualScrollPagingComponent, NoPagingComponent} from "../plugins/paging/components";
import {NoGridInitializerComponent, QueryCookieGridInitializerComponent, QueryGridInitializerComponent} from "../plugins/gridInitializer/components";
import {AsyncDataLoaderComponent, SyncDataLoaderComponent} from "../plugins/dataLoader/components";
import {BasicTableMetadataGathererComponent} from "../components/metadata/basicTable/basicTableMetadataGatherer.component";
import {BasicTableColumnComponent} from "../components/metadata/basicTable/basicTableColumn.component";
import {NoMetadataSelectorComponent, AdvancedMetadataSelectorComponent} from "../plugins/metadataSelector/components";
import {AdvancedTableBodyContentRendererComponent, TableHeaderContentRendererComponent, TableBodyContentRendererComponent, TableContentRendererComponent} from "../plugins/contentRenderer/components";
import {SimpleNoDataRendererComponent} from "../plugins/noDataRenderer/components";
import {BasicRowSelectorComponent, LimitedRowSelectorComponent} from "../plugins/rowSelector/components";

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
        QueryGridInitializerComponent,
        QueryCookieGridInitializerComponent,
        NoGridInitializerComponent,
        SyncDataLoaderComponent,
        AsyncDataLoaderComponent,
        NoMetadataSelectorComponent,
        AdvancedMetadataSelectorComponent,
        TableContentRendererComponent,
        TableBodyContentRendererComponent,
        AdvancedTableBodyContentRendererComponent,
        TableHeaderContentRendererComponent,
        SimpleNoDataRendererComponent,
        BasicRowSelectorComponent,
        LimitedRowSelectorComponent
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
        QueryGridInitializerComponent,
        QueryCookieGridInitializerComponent,
        NoGridInitializerComponent,
        SyncDataLoaderComponent,
        AsyncDataLoaderComponent,
        NoMetadataSelectorComponent,
        AdvancedMetadataSelectorComponent,
        TableContentRendererComponent,
        TableBodyContentRendererComponent,
        AdvancedTableBodyContentRendererComponent,
        TableHeaderContentRendererComponent,
        SimpleNoDataRendererComponent,
        BasicRowSelectorComponent,
        LimitedRowSelectorComponent
    ],
    providers:
    [
    ]
})
export class GridModule
{
}