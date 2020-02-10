import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule as NgCommonModule} from "@anglr/common";

import {VirtualScrollTableContentRendererComponent, VirtualScrollTableBodyContentRendererComponent, VirtualScrollTableHeaderContentRendererComponent} from "../plugins/contentRenderer/components";
import {CdkVirtualScrollPagingComponent} from "../plugins/paging/components";

/**
 * Module allows using of angular material virtual scroll within content renderer
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        NgCommonModule,
        ScrollingModule
    ],
    declarations:
    [
        VirtualScrollTableContentRendererComponent,
        VirtualScrollTableBodyContentRendererComponent,
        VirtualScrollTableHeaderContentRendererComponent,
        CdkVirtualScrollPagingComponent
    ],
    exports:
    [
        VirtualScrollTableContentRendererComponent,
        VirtualScrollTableBodyContentRendererComponent,
        VirtualScrollTableHeaderContentRendererComponent,
        CdkVirtualScrollPagingComponent
    ]
})
export class VirtualScrollTableContentRendererModule
{
}