import {Inject, Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {LocalizeSAPipe} from '@anglr/common';
import {TableGridMetadata, GridColumn} from '@anglr/grid';

import {DialogMetadataSelectorContentComponent, DialogMetadataSelectorComponentData} from '../../plugins/metadataSelector';
import {VerticalDragNDropSelectionTexts, CssClassesVerticalDragNDropSelection} from './verticalDragNDropSelection.interface';

//TODO: cleanup casts to unkown and then to class

/**
 * Component that is used for handling metadata seletion using vertical drag n drop
 */
@Component(
{
    selector: 'ng-dialog-vertical-metadata-selector',
    templateUrl: 'verticalDragNDropSelection.component.html',
    styleUrls: ['verticalDragNDropSelection.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        LocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalDragNDropSelectionSAComponent implements DialogMetadataSelectorContentComponent<TableGridMetadata<GridColumn>>
{
    //######################### protected properties - template bindings #########################

    /**
     * Metadata that are rendered
     */
    protected metadata: TableGridMetadata<GridColumn>;

    /**
     * Texts that are used withing vertical drag n drop
     */
    protected texts: VerticalDragNDropSelectionTexts;

    /**
     * Css classes that are used withing  vertical drag n drop
     */
    protected cssClasses: CssClassesVerticalDragNDropSelection;

    //######################### constructor #########################
    constructor(public dialog: MatDialogRef<VerticalDragNDropSelectionSAComponent, DialogMetadataSelectorComponentData<TableGridMetadata<GridColumn>>>,
                @Inject(MAT_DIALOG_DATA) public data: DialogMetadataSelectorComponentData<TableGridMetadata<GridColumn>>)
    {
        this.metadata = this.data.metadata;
        this.texts = this.data.texts as unknown as VerticalDragNDropSelectionTexts;
        this.cssClasses = this.data.cssClasses as unknown as CssClassesVerticalDragNDropSelection;
    }

    //######################### protected methods - template bindings #########################

    /**
     * Called on drop event
     * @param event - Drop event data
     */
    protected drop(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(this.metadata.columns, event.previousIndex, event.currentIndex);

        this.data.setMetadata(this.metadata);
    }

    /**
     * Toggles visibility of column
     * @param column - Column that is being toggled
     * @param event - Event that occured
     */
    protected toggleVisibility(column: GridColumn, target: {checked: boolean}): void
    {
        column.visible = target.checked;
        
        this.data.setMetadata(this.metadata);
    }
}