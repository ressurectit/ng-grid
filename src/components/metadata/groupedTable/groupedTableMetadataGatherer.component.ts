import {ExistingProvider, Component, ChangeDetectionStrategy, EventEmitter, forwardRef, ContentChildren, QueryList, AfterContentInit} from '@angular/core';

import {MetadataGatherer} from '../metadata.interface';
import {METADATA_GATHERER} from '../types';
import {GroupedTableMetadata} from './groupedTable.interface';
import {HeaderTableGroupComponent} from './headerTableGroup.component';
import {BasicTableColumn} from '../basicTable/basicTable.interface';
import {BasicTableColumnComponent} from '../basicTable/basicTableColumn.component';

/**
 * Component that is used for gathering metadata for table with grouped header columns
 *
 * This is metadata gatherer which works with `GroupedTableColumnComponent` and `HeaderTableGroupComponent`
 */
@Component(
{
    selector: 'ng-grid > grouped-table-metadata',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:
    [
        <ExistingProvider>
        {
            provide: METADATA_GATHERER,
            useExisting: forwardRef(() => GroupedTableMetadataGathererComponent)
        }
    ]
})
export class GroupedTableMetadataGathererComponent<TData = any> implements AfterContentInit, MetadataGatherer<GroupedTableMetadata<BasicTableColumn<TData>>>
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
    public columns: QueryList<BasicTableColumn<TData>>;

    /**
     * Gets all groups defined in gatherer
     * @internal
     */
    @ContentChildren(HeaderTableGroupComponent)
    public groups: QueryList<HeaderTableGroupComponent>;

    //######################### public methods - implementation of MetadataGatherer<BasicTableColumn[]> #########################

    /**
     * Gets current metadata for grid
     */
    public getMetadata(): GroupedTableMetadata<BasicTableColumn<TData>>
    {
        return {
            columns: this.columns.toArray(),
            groups: this.groups.toArray()
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