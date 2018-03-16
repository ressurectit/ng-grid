import {NgModule} from "@angular/core";
import {CommonModule as AngularCommonModule} from "@angular/common";
import {CommonModule} from "@anglr/common";

import {GridComponent} from "../components/grid/grid.component";
import {VirtualScrollPagingComponent, PreviousNextPagingComponent, LoadMorePagingComponent, BasicPagingComponent, NoPagingComponent, QueryPagingInitializerComponent, NoPagingInitializerComponent} from "../plugins/paging";
import {SyncDataLoaderComponent, AsyncDataLoaderComponent} from "../plugins/dataLoader";
import {BasicTableColumnComponent, BasicTableMetadataGathererComponent} from "../components/metadata";
import {NoMetadataSelectorComponent, AdvancedMetadataSelectorComponent} from "../plugins/metadataSelector";
import {TableContentRendererComponent, TableBodyContentRendererComponent, TableHeaderContentRendererComponent, CssDivsBodyContentRendererComponent, CssDivsHeaderContentRendererComponent, CssDivsContentRendererComponent, AdvancedTableBodyContentRendererComponent} from "../plugins/contentRenderer";
import {SimpleNoDataRendererComponent} from "../plugins/noDataRenderer";
import {NoTextsLocatorComponent} from "../plugins/textsLocator";
import {BasicRowSelectorComponent} from "../plugins/rowSelector";

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
        VirtualScrollPagingComponent,
        PreviousNextPagingComponent,
        NoPagingComponent,
        QueryPagingInitializerComponent,
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
        BasicRowSelectorComponent
    ],
    entryComponents:
    [
        BasicPagingComponent,
        LoadMorePagingComponent,
        VirtualScrollPagingComponent,
        PreviousNextPagingComponent,
        NoPagingComponent,
        QueryPagingInitializerComponent,
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
        BasicRowSelectorComponent
    ],
    exports:
    [
        GridComponent,
        BasicTableColumnComponent,
        BasicTableMetadataGathererComponent,
        BasicPagingComponent,
        LoadMorePagingComponent,
        VirtualScrollPagingComponent,
        PreviousNextPagingComponent
    ],
    providers:
    [
    ]
})
export class GridModule
{
}