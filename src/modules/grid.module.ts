import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@anglr/common';
import {BasicPagingComponent} from '../components/paging/basicPaging.component';
import {GRID_DIRECTIVES, GridComponent} from '../components/grid/grid.component';
import {ColumnTemplateRendererComponent} from '../components/grid/columnTemplateRenderer.component';
import {LoadMorePagingComponent} from "../components/paging/loadMorePaging.component";
import {PreviousNextPagingComponent} from "../components/paging/previousNextPaging.component";

/**
 * Grid module 
 */
@NgModule(
{
    imports: [CommonModule, NgCommonModule],
    declarations: [GRID_DIRECTIVES, BasicPagingComponent, LoadMorePagingComponent, PreviousNextPagingComponent, ColumnTemplateRendererComponent],
    entryComponents: [GridComponent, BasicPagingComponent, LoadMorePagingComponent, PreviousNextPagingComponent],
    exports: [GRID_DIRECTIVES, BasicPagingComponent, LoadMorePagingComponent, PreviousNextPagingComponent]
})
export class GridModule
{
}