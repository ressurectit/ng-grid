import {NgModule} from "@angular/core";
import {CommonModule as AngularCommonModule} from "@angular/common";
import {CommonModule} from "@anglr/common";

import {CssGridContentRendererComponent, CssGridBodyContentRendererComponent, CssGridHeaderContentRendererComponent} from "../plugins/contentRenderer/components";

/**
 * Module for grid components, allows using css grid and divs for rendering
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
        CssGridContentRendererComponent,
        CssGridBodyContentRendererComponent,
        CssGridHeaderContentRendererComponent
    ],
    exports:
    [
        CssGridContentRendererComponent,
        CssGridBodyContentRendererComponent,
        CssGridHeaderContentRendererComponent
    ]
})
export class CssGridModule
{
}