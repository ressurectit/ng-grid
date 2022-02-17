import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';

import {CssDivsContentRendererComponent, CssDivsBodyContentRendererComponent, CssDivsHeaderContentRendererComponent} from '../plugins/contentRenderer/components';

/**
 * Module for grid components, allows using css grid and divs for rendering
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
export class CssDivsModule
{
}