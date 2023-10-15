import {Component, ChangeDetectionStrategy, OnInit, forwardRef, FactoryProvider, ExistingProvider, ValueProvider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';
import {Observable} from 'rxjs';

import {Grid, GridOptions, MetadataGatherer, TableGridMetadata} from '../../interfaces';
import {DEFAULT_OPTIONS, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../misc/tokens';
import {AsyncDataLoaderSAComponent, BasicPagingSAComponent, BasicRowSelectorSAComponent, NoGridInitializerSAComponent, NoMetadataSelectorSAComponent, SimpleNoDataRendererSAComponent, SingleOrderingSAComponent, TableContentRendererSAComponent} from '../../plugins';
import {PagingPosition} from '../../misc/enums';
import {ResolveForwardRefSAPipe} from '../../pipes';
import {GridSAComponent} from '../grid/grid.component';

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
            type: forwardRef(() => TableContentRendererSAComponent),
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
            type: forwardRef(() => BasicRowSelectorSAComponent),
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
export class MatrixGridSAComponent extends GridSAComponent implements OnInit, Grid, MetadataGatherer<TableGridMetadata>
{
    //######################### protected properties - children #########################

    /**
     * Metadata gatherer instance
     */
    protected override get metadataGatherer(): MetadataGatherer|undefined|null
    {
        return this;
    }

    //######################### public properties - implementation of MetadataGatherer #########################

    /**
     * @inheritdoc
     */
    public metadataChange: Observable<void> = new Observable();

    //######################### public methods - implementation of MetadataGatherer #########################

    /**
     * @inheritdoc
     */
    public getMetadata(): TableGridMetadata
    {
        return {
            columns: []
        };
    }
}