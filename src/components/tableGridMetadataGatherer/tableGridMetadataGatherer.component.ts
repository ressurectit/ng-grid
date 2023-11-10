import {ExistingProvider, Component, ChangeDetectionStrategy, forwardRef, ContentChildren, QueryList, AfterContentInit, Signal, WritableSignal, signal} from '@angular/core';

import {TableGridColumnSAComponent} from '../tableGridColumn/tableGridColumn.component';
import {TableGridColumn, MetadataGatherer, TableGridMetadata} from '../../interfaces';
import {METADATA_GATHERER} from '../../misc/tokens';

/**
 * Component that is used for gathering metadata for table
 */
@Component(
{
    selector: 'basic-table-metadata, table-metadata',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers:
    [
        <ExistingProvider>
        {
            provide: METADATA_GATHERER,
            useExisting: forwardRef(() => TableGridMetadataGathererSAComponent)
        }
    ]
})
export class TableGridMetadataGathererSAComponent<TData = unknown> implements AfterContentInit, MetadataGatherer<TableGridMetadata<TableGridColumn<TData>>>
{
    //######################### protected fields #########################

    /**
     * Signal for metadata value
     */
    protected metadataValue: WritableSignal<TableGridMetadata<TableGridColumn<TData>>> = signal(
    {
        columns: []
    });

    //######################### public properties - implementation of MetadataGatherer<TableGridMetadata> #########################

    /**
     * @inheritdoc
     */
    public get metadata(): Signal<TableGridMetadata<TableGridColumn<TData>>>
    {
        return this.metadataValue.asReadonly();
    }

    //######################### protected properties - children #########################

    /**
     * Gets all columns defined in gatherer
     */
    @ContentChildren(TableGridColumnSAComponent)
    protected columns: QueryList<TableGridColumnSAComponent<TData>>|undefined|null;

    //######################### public methods - implementation of AfterContentInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        this.columns?.changes.subscribe(() =>
        {
            this.metadataValue.set(
            {
                columns: this.columns?.toArray() ?? []
            });
        });

        this.metadataValue.set(
        {
            columns: this.columns?.toArray() ?? []
        });
    }
}