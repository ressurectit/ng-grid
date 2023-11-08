import {Inject, Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, DragDropModule} from '@angular/cdk/drag-drop';
import {LocalizeSAPipe} from '@anglr/common';
import {TableGridMetadata, GridColumn} from '@anglr/grid';

import {DialogMetadataSelectorContentComponent, DialogMetadataSelectorComponentData} from '../../plugins/metadataSelector';
import {VerticalDragNDropSelectionTexts, CssClassesVerticalDragNDropSelection} from './verticalDragNDropSelection.interface';

//TODO: move into @jscrpt/common

/**
 * Tests whether is element input type checkbox
 * @param element - Element to be tested
 */
function isCheckbox(element: EventTarget): element is HTMLInputElement 
{
    return (element as HTMLInputElement).type === 'checkbox';
}

/**
 * Component that is used for handling metadata seletion using vertical drag n drop
 */
@Component(
{
    selector: 'ng-dialog-vertical-metadata-selector',
    templateUrl: 'verticalDragNDropSelection.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        LocalizeSAPipe,
        DragDropModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalDragNDropSelectionSAComponent implements DialogMetadataSelectorContentComponent<TableGridMetadata<GridColumn>, CssClassesVerticalDragNDropSelection, VerticalDragNDropSelectionTexts>
{
    //######################### constructor #########################
    constructor(public dialog: MatDialogRef<VerticalDragNDropSelectionSAComponent, DialogMetadataSelectorComponentData<TableGridMetadata<GridColumn>, CssClassesVerticalDragNDropSelection, VerticalDragNDropSelectionTexts>>,
                @Inject(MAT_DIALOG_DATA) public data: DialogMetadataSelectorComponentData<TableGridMetadata<GridColumn>, CssClassesVerticalDragNDropSelection, VerticalDragNDropSelectionTexts>)
    {
    }

    //######################### protected methods - template bindings #########################

    /**
     * Called on drop event
     * @param event - Drop event data
     */
    protected drop(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(this.data.metadata.columns, event.previousIndex, event.currentIndex);

        this.data.setMetadata(this.data.metadata);
    }

    /**
     * Toggles visibility of column
     * @param column - Column that is being toggled
     * @param event - Event that occured
     */
    protected toggleVisibility(column: GridColumn, event: Event): void
    {
        if(!event.target || !isCheckbox(event.target))
        {
            throw new Error('VerticalDragNDropSelectionSAComponent: Toggled element is not checkbox!');
        }

        column.visible = event.target.checked;
        
        this.data.setMetadata(this.data.metadata);
    }
}