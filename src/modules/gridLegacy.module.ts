import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@anglr/common';
import {BasicPagingLegacyComponent} from '../components/legacyPaging/basicPaging.component';
import {GRID_LEGACY_DIRECTIVES, GridLegacyComponent} from '../components/legacyGrid/grid.component';
import {ColumnTemplateRendererLegacyComponent} from '../components/legacyGrid/columnTemplateRenderer.component';
import {LoadMorePagingLegacyComponent} from "../components/legacyPaging/loadMorePaging.component";
import {PreviousNextPagingLegacyComponent} from "../components/legacyPaging/previousNextPaging.component";

/**
 * Grid legacy module 
 */
@NgModule(
{
    imports: [CommonModule, NgCommonModule],
    declarations: [GRID_LEGACY_DIRECTIVES, BasicPagingLegacyComponent, LoadMorePagingLegacyComponent, PreviousNextPagingLegacyComponent, ColumnTemplateRendererLegacyComponent],
    entryComponents: [GridLegacyComponent, BasicPagingLegacyComponent, LoadMorePagingLegacyComponent, PreviousNextPagingLegacyComponent],
    exports: [GRID_LEGACY_DIRECTIVES, BasicPagingLegacyComponent, LoadMorePagingLegacyComponent, PreviousNextPagingLegacyComponent]
})
export class GridLegacyModule
{
}