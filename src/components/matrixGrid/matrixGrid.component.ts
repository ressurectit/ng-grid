import {Component, ChangeDetectionStrategy, forwardRef, FactoryProvider, ExistingProvider, ValueProvider, ContentChild, AfterContentInit, ContentChildren, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';
import {Observable, Subject} from 'rxjs';

import {GridSAComponent} from '../grid/grid.component';
import {AsyncDataLoaderSAComponent, BasicPagingSAComponent, MatrixContentRendererSAComponent, NoGridInitializerSAComponent, NoMetadataSelectorSAComponent, NoRowSelectorSAComponent, SimpleNoDataRendererSAComponent, SingleOrderingSAComponent} from '../../plugins';
import {PagingPosition} from '../../misc/enums';
import {DEFAULT_OPTIONS, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../misc/tokens';
import {ResolveForwardRefSAPipe} from '../../pipes';
import {Grid, GridOptions, MatrixGridMetadata, MetadataGatherer} from '../../interfaces';
import {ContentContainerTemplateSADirective, ContentRowContainerTemplateSADirective, FooterContainerTemplateSADirective, FooterRowContainerTemplateSADirective, GridContainerTemplateSADirective, HeaderContainerTemplateSADirective, HeaderRowContainerTemplateSADirective, MatrixGridColumnSADirective} from '../../directives';

/**
 * Default 'GridOptions'
 */
const defaultOptions: GridOptions =
{
    autoInitialize: true,
    pagingPosition: PagingPosition.Bottom,
    plugins:
    {
        contentRenderer:
        {
            type: forwardRef(() => MatrixContentRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        dataLoader:
        {
            type: forwardRef(() => AsyncDataLoaderSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        gridInitializer:
        {
            type: forwardRef(() => NoGridInitializerSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        metadataSelector:
        {
            type: forwardRef(() => NoMetadataSelectorSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        noDataRenderer:
        {
            type: forwardRef(() => SimpleNoDataRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        ordering:
        {
            type: forwardRef(() => SingleOrderingSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        paging:
        {
            type: forwardRef(() => BasicPagingSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        rowSelector:
        {
            type: forwardRef(() => NoRowSelectorSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
    }
};

/**
 * Grid component used for rendering grid, configured with special content renderer and metadata gatherer
 */
@Component(
{
    selector: '[ngGrid]',
    templateUrl: '../grid/grid.component.html',
    styleUrl: '../grid/grid.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports:
    [
        CommonModule,
        CommonDynamicModule,
        ResolveForwardRefSAPipe,
    ],
    providers:
    [
        <ExistingProvider>
        {
            provide: GRID_INSTANCE,
            useExisting: forwardRef(() => MatrixGridSAComponent),
        },
        <FactoryProvider>
        {
            provide: GRID_PLUGIN_INSTANCES,
            useFactory: () => {return {};}
        },
        <ValueProvider>
        {
            provide: DEFAULT_OPTIONS,
            useValue: defaultOptions,
        },
    ]
})
export class MatrixGridSAComponent extends GridSAComponent implements Grid, MetadataGatherer<MatrixGridMetadata>, AfterContentInit
{
    //######################### protected fields #########################

    /**
     * Subject used for emitting changes in metadata
     */
    protected metadataChangeSubject: Subject<void> = new Subject<void>;

    //######################### protected properties - overrides #########################

    /**
     * @inheritdoc
     */
    protected override get metadataGatherer(): MetadataGatherer|undefined|null
    {
        return this;
    }

    //######################### public properties - implementation of MetadataGatherer #########################

    /**
     * @inheritdoc
     */
    public get metadataChange(): Observable<void>
    {
        return this.metadataChangeSubject.asObservable();
    }

    //######################### protected properties - children #########################

    /**
     * Grid container template
     */
    @ContentChild(GridContainerTemplateSADirective)
    protected gridContainer: GridContainerTemplateSADirective|undefined|null;

    /**
     * Header container template
     */
    @ContentChild(HeaderContainerTemplateSADirective)
    protected headerContainer: HeaderContainerTemplateSADirective|undefined|null;

    /**
     * Content container template
     */
    @ContentChild(ContentContainerTemplateSADirective)
    protected contentContainer: ContentContainerTemplateSADirective|undefined|null;

    /**
     * Footer container template
     */
    @ContentChild(FooterContainerTemplateSADirective)
    protected footerContainer: FooterContainerTemplateSADirective|undefined|null;

    /**
     * Header container template
     */
    @ContentChildren(HeaderRowContainerTemplateSADirective, {emitDistinctChangesOnly: true})
    protected headerRowContainer: QueryList<HeaderRowContainerTemplateSADirective>|undefined|null;

    /**
     * Content container template
     */
    @ContentChildren(ContentRowContainerTemplateSADirective, {emitDistinctChangesOnly: true})
    protected contentRowContainer: QueryList<ContentRowContainerTemplateSADirective>|undefined|null;

    /**
     * Footer container template
     */
    @ContentChildren(FooterRowContainerTemplateSADirective, {emitDistinctChangesOnly: true})
    protected footerRowContainer: QueryList<FooterRowContainerTemplateSADirective>|undefined|null;

    /**
     * Obtains definition of columns
     */
    @ContentChildren(MatrixGridColumnSADirective, {emitDistinctChangesOnly: true})
    protected columns: QueryList<MatrixGridColumnSADirective>|undefined|null;


    //######################### public methods - implementation of AfterContentInit #########################
    
    /**
     * Called when content was initialized
     */
    public ngAfterContentInit(): void
    {
        this.metadataChangeSubject.next();

        this.headerRowContainer?.changes.subscribe(() => this.metadataChangeSubject.next());
        this.contentRowContainer?.changes.subscribe(() => this.metadataChangeSubject.next());
        this.footerRowContainer?.changes.subscribe(() => this.metadataChangeSubject.next());
        this.columns?.changes.subscribe(() => this.metadataChangeSubject.next());
    }

    //######################### public methods - implementation of MetadataGatherer #########################

    /**
     * @inheritdoc
     */
    public getMetadata(): MatrixGridMetadata
    {
        return {
            columns: this.columns?.toArray() ?? [],
            gridContainer: this.gridContainer,
            headerContainer: this.headerContainer,
            contentContainer: this.contentContainer,
            footerContainer: this.footerContainer,
            headerRowContainer: this.headerRowContainer?.toArray() ?? [],
            contentRowContainer: this.contentRowContainer?.toArray() ?? [],
            footerRowContainer: this.footerRowContainer?.toArray() ?? [],
        };
    }
}