import {NgModule} from "@angular/core";
import {CommonModule as AngularCommonModule} from "@angular/common";
import {CommonModule} from "@anglr/common";

import {GridComponent} from "../components/grid/grid.component";
import {BasicPagingComponent, LoadMorePagingComponent, PreviousNextPagingComponent, ContentVirtualScrollPagingComponent, PageVirtualScrollPagingComponent, NoPagingComponent} from "../plugins/paging/components";
import {NoPagingInitializerComponent, QueryCookiePagingInitializerComponent, QueryPagingInitializerComponent} from "../plugins/pagingInitializer/components";
import {AsyncDataLoaderComponent} from "../plugins/dataLoader/async/asyncDataLoader.component";
import {SyncDataLoaderComponent} from "../plugins/dataLoader/sync/syncDataLoader.component";
import {HeaderTableGroupComponent} from "../components/metadata/groupedTable/headerTableGroup.component";
import {GroupedTableMetadataGathererComponent} from "../components/metadata/groupedTable/groupedTableMetadataGatherer.component";
import {BasicTableMetadataGathererComponent} from "../components/metadata/basicTable/basicTableMetadataGatherer.component";
import {BasicTableColumnComponent} from "../components/metadata/basicTable/basicTableColumn.component";
import {HeaderTableGroupColumnComponent} from "../components/metadata/groupedTable/headerTableGroupColumn.component";
import {AdvancedMetadataSelectorComponent} from "../plugins/metadataSelector/advanced/advancedMetadataSelector.component";
import {NoMetadataSelectorComponent} from "../plugins/metadataSelector/no/noMetadataSelector.component";
import {GroupedTableHeaderContentRendererComponent} from "../plugins/contentRenderer/table/header/grouped/groupedTableHeaderContentRenderer.component";
import {AdvancedTableBodyContentRendererComponent} from "../plugins/contentRenderer/table/body/advanced/advancedTableBodyContentRenderer.component";
import {CssDivsContentRendererComponent} from "../plugins/contentRenderer/cssDivs/cssDivsContentRenderer.component";
import {CssDivsHeaderContentRendererComponent} from "../plugins/contentRenderer/cssDivs/header/cssDivsHeaderContentRenderer.component";
import {CssDivsBodyContentRendererComponent} from "../plugins/contentRenderer/cssDivs/body/cssDivsBodyContentRenderer.component";
import {TableHeaderContentRendererComponent} from "../plugins/contentRenderer//table/header/basic/tableHeaderContentRenderer.component";
import {TableBodyContentRendererComponent} from "../plugins/contentRenderer/table/body/basic/tableBodyContentRenderer.component";
import {TableContentRendererComponent} from "../plugins/contentRenderer/table/tableContentRenderer.component";
import {SimpleNoDataRendererComponent} from "../plugins/noDataRenderer/simple/simpleNoDataRenderer.component";
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