import {ExistingProvider, Component, ChangeDetectionStrategy, forwardRef, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {METADATA_GATHERER} from '../metadata/types';
import {TableGridMetadata} from './tableGridMetadataGatherer.interface';
import {TableGridColumnSAComponent} from '../tableGridColumn/tableGridColumn.component';
import {TableGridColumn, MetadataGatherer} from '../../interfaces';

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
            //TODO: rework or injection token
            provide: METADATA_GATHERER,
            useExisting: forwardRef(() => TableGridMetadataGathererSAComponent)
        }
    ]
})
export class TableGridMetadataGathererSAComponent<TData = unknown> implements AfterContentInit, MetadataGatherer<TableGridMetadata<TableGridColumn<TData>>>
{
    //######################### protected fields #########################

    /**
     * Subject used for emitting metadata changes
     */
    protected metadataChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties - implementation of MetadataGatherer<TableGridMetadata> #########################

    /**
     * @inheritdoc
     */
    public get metadataChange(): Observable<void>
    {
        return this.metadataChangeSubject.asObservable();
    }

    //######################### protected properties - children #########################

    /**
     * Gets all columns defined in gatherer
     */
    @ContentChildren(TableGridColumnSAComponent)
    protected columns: QueryList<TableGridColumnSAComponent<TData>>|undefined|null;

    //######################### public methods - implementation of MetadataGatherer<TableGridMetadata> #########################

    /**
     * @inheritdoc
     */
    public getMetadata(): TableGridMetadata<TableGridColumn<TData>>
    {
        return {
            columns: this.columns?.toArray() ?? []
        };
    }

    //######################### public methods - implementation of AfterContentInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        this.columns?.changes.subscribe(() =>
        {
            this.metadataChangeSubject.next();
        });
    }
}