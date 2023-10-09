import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';

import {GridSAComponent} from '../components/grid/grid.component';
import {BasicPagingComponent, LoadMorePagingComponent, PreviousNextPagingComponent, ContentVirtualScrollPagingComponent, PageVirtualScrollPagingComponent, NoPagingComponent} from '../plugins/paging/components';
import {NoGridInitializerComponent, QueryPermanentStorageGridInitializerComponent, QueryGridInitializerComponent} from '../plugins/gridInitializer/components';
import {AsyncDataLoaderComponent, SyncDataLoaderComponent} from '../plugins/dataLoader/components';
import {TableGridMetadataGathererSAComponent} from '../components/tableGridMetadataGatherer/tableGridMetadataGatherer.component';
import {TableGridColumnSAComponent} from '../components/tableGridColumn/tableGridColumn.component';
import {NoMetadataSelectorComponent, AdvancedMetadataSelectorComponent} from '../plugins/metadataSelector/components';
import {AdvancedTableBodyContentRendererComponent, TableHeaderContentRendererComponent, TableBodyContentRendererComponent, TableContentRendererComponent} from '../plugins/contentRenderer/components';
import {SimpleNoDataRendererComponent} from '../plugins/noDataRenderer/components';
import {BasicRowSelectorComponent, LimitedRowSelectorComponent} from '../plugins/rowSelector/components';

/**
 * Module for grid components
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
        GridSAComponent,
        TableGridColumnSAComponent,
        TableGridMetadataGathererSAComponent,
        BasicPagingComponent,
        LoadMorePagingComponent,
        ContentVirtualScrollPagingComponent,
        PageVirtualScrollPagingComponent,
        PreviousNextPagingComponent,
        NoPagingComponent,
        QueryGridInitializerComponent,
        QueryPermanentStorageGridInitializerComponent,
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
        GridSAComponent,
        TableGridColumnSAComponent,
        TableGridMetadataGathererSAComponent,
        BasicPagingComponent,
        LoadMorePagingComponent,
        ContentVirtualScrollPagingComponent,
        PageVirtualScrollPagingComponent,
        PreviousNextPagingComponent,
        NoPagingComponent,
        QueryGridInitializerComponent,
        QueryPermanentStorageGridInitializerComponent,
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