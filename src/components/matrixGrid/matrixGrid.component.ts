import {Component, ChangeDetectionStrategy, forwardRef, FactoryProvider, ExistingProvider, ValueProvider, AfterContentInit, ContentChildren, QueryList, WritableSignal, signal, Signal} from '@angular/core';
import {BindThis} from '@jscrpt/common';

import {GridComponent} from '../grid/grid.component';
import {AsyncDataLoaderComponent, BasicPagingComponent, MatrixContentRendererComponent, NoGridInitializerComponent, NoMetadataSelectorComponent, NoRowSelectorComponent, SimpleNoDataRendererComponent, SingleOrderingComponent} from '../../plugins';
import {DEFAULT_OPTIONS, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../misc/tokens';
import {Grid, GridOptions, MatrixGridMetadata, MetadataGatherer} from '../../interfaces';
import {ContentContainerTemplateDirective, ContentRowContainerTemplateDirective, FooterContainerTemplateDirective, FooterRowContainerTemplateDirective, GridContainerTemplateDirective, HeaderContainerTemplateDirective, HeaderRowContainerTemplateDirective, MatrixGridColumnDirective} from '../../directives';
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
            type: forwardRef(() => MatrixContentRendererComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        dataLoader:
        {
            type: forwardRef(() => AsyncDataLoaderComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        gridInitializer:
        {
            type: forwardRef(() => NoGridInitializerComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        metadataSelector:
        {
            type: forwardRef(() => NoMetadataSelectorComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        noDataRenderer:
        {
            type: forwardRef(() => SimpleNoDataRendererComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        ordering:
        {
            type: forwardRef(() => SingleOrderingComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        paging:
        {
            type: forwardRef(() => BasicPagingComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        rowSelector:
        {
            type: forwardRef(() => NoRowSelectorComponent),
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
    providers:
    [
        <ExistingProvider>
        {
            provide: GRID_INSTANCE,
            useExisting: forwardRef(() => MatrixGridComponent),
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
export class MatrixGridComponent extends GridComponent implements Grid, MetadataGatherer<MatrixGridMetadata>, AfterContentInit
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
    @ContentChildren(GridContainerTemplateDirective, {emitDistinctChangesOnly: true})
    protected gridContainer: QueryList<GridContainerTemplateDirective>|undefined|null;

    /**
     * Header container template
     */
    @ContentChildren(HeaderContainerTemplateDirective, {emitDistinctChangesOnly: true})
    protected headerContainer: QueryList<HeaderContainerTemplateDirective>|undefined|null;

    /**
     * Content container template
     */
    @ContentChildren(ContentContainerTemplateDirective, {emitDistinctChangesOnly: true})
    protected contentContainer: QueryList<ContentContainerTemplateDirective>|undefined|null;

    /**
     * Footer container template
     */
    @ContentChildren(FooterContainerTemplateDirective, {emitDistinctChangesOnly: true})
    protected footerContainer: QueryList<FooterContainerTemplateDirective>|undefined|null;

    /**
     * Header container template
     */
    @ContentChildren(HeaderRowContainerTemplateDirective, {emitDistinctChangesOnly: true})
    protected headerRowContainer: QueryList<HeaderRowContainerTemplateDirective>|undefined|null;

    /**
     * Content container template
     */
    @ContentChildren(ContentRowContainerTemplateDirective, {emitDistinctChangesOnly: true})
    protected contentRowContainer: QueryList<ContentRowContainerTemplateDirective>|undefined|null;

    /**
     * Footer container template
     */
    @ContentChildren(FooterRowContainerTemplateDirective, {emitDistinctChangesOnly: true})
    protected footerRowContainer: QueryList<FooterRowContainerTemplateDirective>|undefined|null;

    /**
     * Obtains definition of columns
     */
    @ContentChildren(MatrixGridColumnDirective, {emitDistinctChangesOnly: true})
    protected columns: QueryList<MatrixGridColumnDirective>|undefined|null;

    //######################### public methods - implementation of AfterContentInit #########################

    /**
     * Called when content was initialized
     */
    public ngAfterContentInit(): void
    {
        this.gridContainer?.changes.subscribe(this.setMetadata);
        this.headerContainer?.changes.subscribe(this.setMetadata);
        this.contentContainer?.changes.subscribe(this.setMetadata);
        this.footerContainer?.changes.subscribe(this.setMetadata);
        this.headerRowContainer?.changes.subscribe(this.setMetadata);
        this.contentRowContainer?.changes.subscribe(this.setMetadata);
        this.footerRowContainer?.changes.subscribe(this.setMetadata);
        this.columns?.changes.subscribe(this.setMetadata);

        this.setMetadata();
    }

    //######################### protected methods #########################

    /**
     * Sets metadata
     */
    @BindThis
    public setMetadata(): void
    {
        this.metadataValue.set(
        {
            columns: this.columns?.toArray() ?? [],
            gridContainer: this.gridContainer?.length ? this.gridContainer?.toArray() : null,
            headerContainer: this.headerContainer?.first,
            contentContainer: this.contentContainer?.first,
            footerContainer: this.footerContainer?.first,
            headerRowContainer: this.headerRowContainer?.toArray() ?? [],
            contentRowContainer: this.contentRowContainer?.toArray() ?? [],
            footerRowContainer: this.footerRowContainer?.toArray() ?? [],
        });
    }
}
