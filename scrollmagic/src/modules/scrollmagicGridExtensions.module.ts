import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {FixedGridHeaderDirective} from '../directives/fixedGridHeader/fixedGridHeader.directive';

/**
 * Module contains extensions for grid header using scrollmagic
 */
@NgModule(
{
    imports:
    [
        AngularCommonModule
    ],
    declarations:
    [
        FixedGridHeaderDirective
    ],
    exports:
    [
        FixedGridHeaderDirective
    ]
})
export class ScrollmagicGridExtensionsModule
{
}