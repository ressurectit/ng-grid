import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BasicPagingComponent} from '../components/paging/basicPaging.component';
import {GRID_DIRECTIVES, GridComponent} from '../components/grid/grid.component';
import {ColumnTemplateRendererComponent} from '../components/grid/columnTemplateRenderer.component';

/**
 * Grid module 
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [GRID_DIRECTIVES, BasicPagingComponent, ColumnTemplateRendererComponent],
    entryComponents: [GridComponent, BasicPagingComponent],
    exports: [GRID_DIRECTIVES, BasicPagingComponent]
})
export class GridModule
{
}