import {Component, ChangeDetectionStrategy, EventEmitter, forwardRef, ContentChildren, QueryList, AfterContentInit} from "@angular/core";

import {MetadataGatherer, METADATA_GATHERER} from "../metadata.interface";
import {BasicTableColumn} from "./basicTable.interface";
import {ExistingProvider} from "@angular/core/src/di/provider";
import {BasicTableColumnComponent} from "./basicTableColumn.component";

/**
 * Component that is used for gathering metadata for basic table
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
export class BasicTableMetadataGathererComponent<TData> implements AfterContentInit, MetadataGatherer<BasicTableColumn<TData>[]>
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
    getMetadata(): BasicTableColumn<TData>[]
    {
        return this.columns.toArray();
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