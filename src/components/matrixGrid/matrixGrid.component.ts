import {Component, ChangeDetectionStrategy, forwardRef, FactoryProvider, ExistingProvider, ValueProvider, AfterContentInit, ContentChildren, QueryList, WritableSignal, signal, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';

import {GridSAComponent} from '../grid/grid.component';
import {AsyncDataLoaderSAComponent, BasicPagingSAComponent, MatrixContentRendererSAComponent, NoGridInitializerSAComponent, NoMetadataSelectorSAComponent, NoRowSelectorSAComponent, SimpleNoDataRendererSAComponent, SingleOrderingSAComponent} from '../../plugins';
import {DEFAULT_OPTIONS, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../misc/tokens';
import {ResolveForwardRefSAPipe} from '../../pipes';
import {Grid, GridOptions, MatrixGridMetadata, MetadataGatherer} from '../../interfaces';
import {ContentContainerTemplateSADirective, ContentRowContainerTemplateSADirective, FooterContainerTemplateSADirective, FooterRowContainerTemplateSADirective, GridContainerTemplateSADirective, HeaderContainerTemplateSADirective, HeaderRowContainerTemplateSADirective, MatrixGridColumnSADirective} from '../../directives';
import {GridPluginInstancesDef} from '../../misc/gridPluginInstancesDef';

/**
 * Default 'GridOptions'
 */
const defaultOptions: GridOptions =
{
    autoInitialize: true,
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
            useFactory: () => {return new GridPluginInstancesDef();}
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
     * Signal for metadata value
     */
    protected metadataValue: WritableSignal<MatrixGridMetadata> = signal(
    {
        columns: [],
        gridContainer: null,
        headerContainer: null,
        contentContainer: null,
        footerContainer: null,
        headerRowContainer: [],
        contentRowContainer: [],
        footerRowContainer: [],
    });

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
    public get metadata(): Signal<MatrixGridMetadata>
    {
        return this.metadataValue.asReadonly();
    }

    //######################### protected properties - children #########################

    /**
     * Grid container template
     */
    @ContentChildren(GridContainerTemplateSADirective, {emitDistinctChangesOnly: true})
    protected gridContainer: QueryList<GridContainerTemplateSADirective>|undefined|null;

    /**
     * Header container template
     */
    @ContentChildren(HeaderContainerTemplateSADirective, {emitDistinctChangesOnly: true})
    protected headerContainer: QueryList<HeaderContainerTemplateSADirective>|undefined|null;

    /**
     * Content container template
     */
    @ContentChildren(ContentContainerTemplateSADirective, {emitDistinctChangesOnly: true})
    protected contentContainer: QueryList<ContentContainerTemplateSADirective>|undefined|null;

    /**
     * Footer container template
     */
    @ContentChildren(FooterContainerTemplateSADirective, {emitDistinctChangesOnly: true})
    protected footerContainer: QueryList<FooterContainerTemplateSADirective>|undefined|null;

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
        this.gridContainer?.changes.subscribe(() => this.setMetadata());
        this.headerContainer?.changes.subscribe(() => this.setMetadata());
        this.contentContainer?.changes.subscribe(() => this.setMetadata());
        this.footerContainer?.changes.subscribe(() => this.setMetadata());
        this.headerRowContainer?.changes.subscribe(() => this.setMetadata());
        this.contentRowContainer?.changes.subscribe(() => this.setMetadata());
        this.footerRowContainer?.changes.subscribe(() => this.setMetadata());
        this.columns?.changes.subscribe(() => this.setMetadata());

        this.setMetadata();
    }

    //######################### protected methods #########################

    /**
     * Sets metadata
     */
    public setMetadata(): void
    {
        this.metadataValue.set(
        {
            columns: this.columns?.toArray() ?? [],
            gridContainer: this.gridContainer?.toArray() ?? [],
            headerContainer: this.headerContainer?.first,
            contentContainer: this.contentContainer?.first,
            footerContainer: this.footerContainer?.first,
            headerRowContainer: this.headerRowContainer?.toArray() ?? [],
            contentRowContainer: this.contentRowContainer?.toArray() ?? [],
            footerRowContainer: this.footerRowContainer?.toArray() ?? [],
        });
    }
}