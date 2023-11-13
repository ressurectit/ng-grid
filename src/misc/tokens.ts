import {InjectionToken, Type} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';

import {ContentRenderer, CurrentViewContainer, ContentRendererOptions, DataLoader, DataLoaderOptions, Grid, GridInitializer, GridInitializerOptions, GridOptions, GridOrderableCell, MetadataGatherer, MetadataSelector, MetadataSelectorOptions, NoDataRenderer, NoDataRendererOptions, Ordering, OrderingOptions, Paging, PagingOptions, RowSelector, RowSelectorOptions, VisualPluginOptions, GridPluginInstances} from '../interfaces';
import {CellContextFactoryFn, DataCellContextFactoryFn} from './types';

/**
 * Injection token used for obtaining orderable directive from cell
 */
export const ORDERABLE_CELL: InjectionToken<GridOrderableCell> = new InjectionToken<GridOrderableCell>('ORDERABLE_CELL');

/**
 * Injection token used for sharing content renderers current view container for rendering into 'container' elements
 */
export const CONTENT_RENDERER_CURRENT_VIEW_CONTAINER: InjectionToken<CurrentViewContainer> = new InjectionToken<CurrentViewContainer>('CONTENT_RENDERER_CURRENT_VIEW_CONTAINER');

/**
 * Injection token used for injecting default options
 */
export const DEFAULT_OPTIONS: InjectionToken<unknown> = new InjectionToken<unknown>('DEFAULT_OPTIONS');

/**
 * Injection token for obtaining grid instance inside grid plugins and nested types
 */
export const GRID_INSTANCE: InjectionToken<Grid> = new InjectionToken<Grid>('GRID_INSTANCE');

/**
 * Injection token for obtaining data cell context factory function
 */
export const DATA_CELL_CONTEXT_FN: InjectionToken<DataCellContextFactoryFn> = new InjectionToken<DataCellContextFactoryFn>('DATA_CELL_CONTEXT_FN');

/**
 * Injection token for obtaining cell context factory function
 */
export const CELL_CONTEXT_FN: InjectionToken<CellContextFactoryFn> = new InjectionToken<CellContextFactoryFn>('CELL_CONTEXT_FN');

/**
 * Injection token for obtaining metadata gatherer
 */
export const METADATA_GATHERER: InjectionToken<MetadataGatherer> = new InjectionToken<MetadataGatherer>('METADATA_GATHERER');

/**
 * Token used for obtaining 'GridPluginInstances'
 */
export const GRID_PLUGIN_INSTANCES: InjectionToken<GridPluginInstances> = new InjectionToken<GridPluginInstances>('GRID_PLUGIN_INSTANCES');

/**
 * Injection token for 'GridOptions'
 */
export const GRID_OPTIONS: InjectionToken<RecursivePartial<GridOptions>> = new InjectionToken<RecursivePartial<GridOptions>>('GRID_OPTIONS');

/**
 * Injection token for 'Paging' implementation
 */
export const PAGING_TYPE: InjectionToken<Type<Paging>> = new InjectionToken<Type<Paging>>('PAGING_TYPE');

/**
 * Injection token for 'Ordering' implementation
 */
export const ORDERING_TYPE: InjectionToken<Type<Ordering>> = new InjectionToken<Type<Ordering>>('ORDERING');

/**
 * Injection token for 'GridInitializer' implementation
 */
export const GRID_INITIALIZER_TYPE: InjectionToken<Type<GridInitializer>> = new InjectionToken<Type<GridInitializer>>('GRID_INITIALIZER_TYPE');

/**
 * Injection token for 'DataLoader' implementation
 */
export const DATA_LOADER_TYPE: InjectionToken<Type<DataLoader>> = new InjectionToken<Type<DataLoader>>('DATA_LOADER_TYPE');

/**
 * Injection token for 'ContentRenderer' implementation
 */
export const CONTENT_RENDERER_TYPE: InjectionToken<Type<ContentRenderer>> = new InjectionToken<Type<ContentRenderer>>('CONTENT_RENDERER_TYPE');

/**
 * Injection token for 'MetadataSelector' implementation
 */
export const METADATA_SELECTOR_TYPE: InjectionToken<Type<MetadataSelector>> = new InjectionToken<Type<MetadataSelector>>('METADATA_SELECTOR_TYPE');

/**
 * Injection token for 'NoDataRenderer' implementation
 */
export const NO_DATA_RENDERER_TYPE: InjectionToken<Type<NoDataRenderer>> = new InjectionToken<Type<NoDataRenderer>>('NO_DATA_RENDERER_TYPE');

/**
 * Injection token for 'RowSelector' implementation
 */
export const ROW_SELECTOR_TYPE: InjectionToken<Type<RowSelector>> = new InjectionToken<Type<RowSelector>>('ROW_SELECTOR_TYPE');

/**
 * Token for injecting options for content renderer
 */
export const CONTENT_RENDERER_OPTIONS: InjectionToken<RecursivePartial<ContentRendererOptions>> = new InjectionToken<RecursivePartial<ContentRendererOptions>>('CONTENT_RENDERER_OPTIONS');

/**
 * Token for injecting options for content body renderer
 */
export const BODY_CONTENT_RENDERER_OPTIONS: InjectionToken<RecursivePartial<VisualPluginOptions>> = new InjectionToken<RecursivePartial<VisualPluginOptions>>('BODY_CONTENT_RENDERER_OPTIONS');

/**
 * Token for injecting options for content header renderer
 */
export const HEADER_CONTENT_RENDERER_OPTIONS: InjectionToken<RecursivePartial<VisualPluginOptions>> = new InjectionToken<RecursivePartial<VisualPluginOptions>>('HEADER_CONTENT_RENDERER_OPTIONS');

/**
 * Token for injecting options for data loader
 */
export const DATA_LOADER_OPTIONS: InjectionToken<RecursivePartial<DataLoaderOptions>> = new InjectionToken<RecursivePartial<DataLoaderOptions>>('DATA_LOADER_OPTIONS');

/**
 * Token for injecting options for grid initializer
 */
export const GRID_INITIALIZER_OPTIONS: InjectionToken<RecursivePartial<GridInitializerOptions>> = new InjectionToken<RecursivePartial<GridInitializerOptions>>('GRID_INITIALIZER_OPTIONS');

/**
 * Token for injecting options for metadata selector
 */
export const METADATA_SELECTOR_OPTIONS: InjectionToken<RecursivePartial<MetadataSelectorOptions>> = new InjectionToken<RecursivePartial<MetadataSelectorOptions>>('METADATA_SELECTOR_OPTIONS');

/**
 * Token for injecting options for no data renderer
 */
export const NO_DATA_RENDERER_OPTIONS: InjectionToken<RecursivePartial<NoDataRendererOptions>> = new InjectionToken<RecursivePartial<NoDataRendererOptions>>('NO_DATA_RENDERER_OPTIONS');

/**
 * Token for injecting options for paging
 */
export const PAGING_OPTIONS: InjectionToken<RecursivePartial<PagingOptions>> = new InjectionToken<RecursivePartial<PagingOptions>>('PAGING_OPTIONS');

/**
 * Token for injecting options for ordering
 */
export const ORDERING_OPTIONS: InjectionToken<RecursivePartial<OrderingOptions>> = new InjectionToken<RecursivePartial<OrderingOptions>>('ORDERING_OPTIONS');

/**
 * Token for injecting options for row selector
 */
export const ROW_SELECTOR_OPTIONS: InjectionToken<RecursivePartial<RowSelectorOptions>> = new InjectionToken<RecursivePartial<RowSelectorOptions>>('ROW_SELECTOR_OPTIONS');
