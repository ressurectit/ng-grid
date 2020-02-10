import {NgModule} from "@angular/core";
import {CommonModule as AngularCommonModule} from "@angular/common";
import {CommonModule} from "@anglr/common";

import {CssDivsContentRendererComponent, CssDivsHeaderContentRendererComponent, CssDivsBodyContentRendererComponent} from "../plugins/contentRenderer/components";

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
        CssDivsContentRendererComponent,
        CssDivsBodyContentRendererComponent,
        CssDivsHeaderContentRendererComponent
    ],
    exports:
    [
        CssDivsContentRendererComponent,
        CssDivsBodyContentRendererComponent,
        CssDivsHeaderContentRendererComponent
    ]
})
export class CssGridModule
{
}