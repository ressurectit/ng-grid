import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DragDropModule} from '@angular/cdk/drag-drop';

import {DialogMetadataSelectorComponent} from "../plugins/metadataSelector/components";
import {VerticalDragNDropSelectionComponent} from "../components/verticalDragNDropSelection/types";

/**
 * Module allows using of angular material dialog for metadata selector
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        DragDropModule
    ],
    declarations:
    [
        DialogMetadataSelectorComponent,
        VerticalDragNDropSelectionComponent
    ],
    entryComponents:
    [
        DialogMetadataSelectorComponent,
        VerticalDragNDropSelectionComponent
    ],
    exports:
    [
        DialogMetadataSelectorComponent,
        VerticalDragNDropSelectionComponent
    ]
})
export class DialogMetadataSelectorModule
{
}