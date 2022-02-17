import {ExistingProvider, Component, ChangeDetectionStrategy, EventEmitter, forwardRef, ContentChildren, QueryList, AfterContentInit} from '@angular/core';

import {MetadataGatherer} from '../metadata.interface';
import {METADATA_GATHERER} from '../types';
import {BasicTableColumn, BasicTableMetadata} from './basicTable.interface';
import {BasicTableColumnComponent} from './basicTableColumn.component';

/**
 * Component that is used for gathering metadata for basic table
 *
 * @example
 * This is metadata gatherer which works with `BasicTableColumnComponent`
 *
 * Here is sample of use of available options for `BasicTableMetadataGathererComponent` with `BasicTableColumnComponent`
 *
 * ``` html
 * <ng-grid #grid [gridOptions]="gridOptions" class="clearfix" fixedHeader>
 *     <basic-table-metadata>
 *         <!-- Basic usage, id must be unique -->
 *         <!-- if custom template is not provided name is used for getting data -->
 *         <!-- title is displayed in header of grid -->
 *         <basic-table-column id="colId" name="colId" title="Id"></basic-table-column>
 *
 *         <!-- Tooltip that is displayed on hover on column header -->
 *         <!-- This column can be used for ordering -->
 *         <basic-table-column id="colId2" name="colId2" title="Col 2" headerTooltip="This is tooltip text" [ordering]="true"></basic-table-column>
 *
 *         <!-- Title in header is no displayed -->
 *         <!-- Column width set to fixed max 60px -->
 *         <basic-table-column id="colId3" name="colId3" title="Col 3" [titleVisible]="false" width="60px"></basic-table-column>
 *
 *         <!-- Column default behavior will be that it will not be rendered -->
 *         <basic-table-column id="colId5" name="colId5" title="Col 5" [visible]="false"></basic-table-column>
 *
 *         <!-- Column will have custom css class applied to header and each cell -->
 *         <basic-table-column id="colId6" name="colId6" title="Col 6" headerClass="header-css-class" cellClass="cell-css-class"></basic-table-column>
 *
 *         <!-- Column with custom template for header and each cell -->
 *         <basic-table-column id="colId7" name="colId7" title="Custom col">
 *             <!-- Custom header template -->
 *             <ng-template #headerTemplate>
 *                 <div title="This is custom tooltip">Custom column</div>
 *             </ng-template>
 *
 *             <!-- Custom body cell template -->
 *             <ng-template #bodyTemplate let-item let-index="index" let-rowIndex="rowIndex" let-column="column" let-startingIndex="startingIndex">
 *                 <div>
*                      <div>{{item?.dateItem?.format('L')}} 'item' is row object from data</div>
*                      <div>{{index}} index is zero based index of row for all items</div>
*                      <div>{{rowIndex}} rowIndex is zero based index of row for current page</div>
*                      <div>{{column}} column is object of 'BasicTableColumnComponent'</div>
*                      <div>{{startingIndex}} startingIndex starting zero based index of current page</div>
 *                 </div>
 *             </ng-template>
 *         </basic-table-column>
 *     </basic-table-metadata>
 * </ng-grid>
 * ```
 */
@Component(
{
    selector: 'ng-grid > basic-table-metadata',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:
    [
        <ExistingProvider>
        {
            provide: METADATA_GATHERER,
            useExisting: forwardRef(() => BasicTableMetadataGathererComponent)
        }
    ]
})
export class BasicTableMetadataGathererComponent<TData = any> implements AfterContentInit, MetadataGatherer<BasicTableMetadata<BasicTableColumn<TData>>>
{
    //######################### public properties - implementation of MetadataGatherer<BasicTableColumn[]> #########################

    /**
     * Information that metadata for grid has changed
     */
    public metadataChange: EventEmitter<void> = new EventEmitter<void>();

    //######################### public properties - children #########################

    /**
     * Gets all columns defined in gatherer
     * @internal
     */
    @ContentChildren(BasicTableColumnComponent)
    public columns: QueryList<BasicTableColumnComponent<TData>>;

    //######################### public methods - implementation of MetadataGatherer<BasicTableColumn[]> #########################

    /**
     * Gets current metadata for grid
     */
    public getMetadata(): BasicTableMetadata<BasicTableColumn<TData>>
    {
        return {
            columns: this.columns.toArray()
        };
    }

    //######################### public methods - implementation of AfterContentInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        this.columns.changes.subscribe(() =>
        {
            this.metadataChange.emit();
        });
    }
}