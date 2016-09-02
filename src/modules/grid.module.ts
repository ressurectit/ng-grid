import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PagingComponent} from '../components/paging';
import {GRID_DIRECTIVES, ColumnTemplateRendererComponent} from '../components/grid';

/**
 * Grid module 
 */
@NgModule(
{
    imports: [CommonModule],
    declarations: [GRID_DIRECTIVES, PagingComponent, ColumnTemplateRendererComponent],
    exports: [GRID_DIRECTIVES, PagingComponent]
})
export class GridModule
{
}