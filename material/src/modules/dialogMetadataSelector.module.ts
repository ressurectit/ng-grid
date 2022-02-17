import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';

import {DialogMetadataSelectorComponent} from '../plugins/metadataSelector/components';
import {VerticalDragNDropSelectionComponent} from '../components/verticalDragNDropSelection/types';

/**
 * Module allows using of angular material dialog for metadata selector
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        DragDropModule,
        MatDialogModule
    ],
    declarations:
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