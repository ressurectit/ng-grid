import {InjectionToken} from '@angular/core';

import {ContentRenderer, ContentRendererOptions, DataLoader, DataLoaderOptions, GridInitializer, GridInitializerOptions, GridOptions, MetadataGatherer, MetadataSelector, MetadataSelectorOptions, NoDataRenderer, NoDataRendererOptions, Paging, PagingOptions, RowSelector, RowSelectorOptions, VisualPluginOptions} from '../interfaces';
import {GridPluginInstances} from './types';

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
export const GRID_OPTIONS: InjectionToken<GridOptions> = new InjectionToken<GridOptions>('GRID_OPTIONS');

/**
 * Injection token for 'Paging' implementation
 */
export const PAGING_TYPE: InjectionToken<Paging> = new InjectionToken<Paging>('PAGING_TYPE');

/**
 * Injection token for 'GridInitializer' implementation
 */
export const GRID_INITIALIZER_TYPE: InjectionToken<GridInitializer> = new InjectionToken<GridInitializer>('GRID_INITIALIZER_TYPE');

/**
 * Injection token for 'DataLoader' implementation
 */
export const DATA_LOADER_TYPE: InjectionToken<DataLoader> = new InjectionToken<DataLoader>('DATA_LOADER_TYPE');

/**
 * Injection token for 'ContentRenderer' implementation
 */
export const CONTENT_RENDERER_TYPE: InjectionToken<ContentRenderer> = new InjectionToken<ContentRenderer>('CONTENT_RENDERER_TYPE');

/**
 * Injection token for 'MetadataSelector' implementation
 */
export const METADATA_SELECTOR_TYPE: InjectionToken<MetadataSelector> = new InjectionToken<MetadataSelector>('METADATA_SELECTOR_TYPE');

/**
 * Injection token for 'NoDataRenderer' implementation
 */
export const NO_DATA_RENDERER_TYPE: InjectionToken<NoDataRenderer> = new InjectionToken<NoDataRenderer>('NO_DATA_RENDERER_TYPE');

/**
 * Injection token for 'RowSelector' implementation
 */
export const ROW_SELECTOR_TYPE: InjectionToken<RowSelector> = new InjectionToken<RowSelector>('ROW_SELECTOR_TYPE');

/**
 * Token for injecting options for content renderer
 */
export const CONTENT_RENDERER_OPTIONS: InjectionToken<ContentRendererOptions> = new InjectionToken<ContentRendererOptions>('CONTENT_RENDERER_OPTIONS');

/**
 * Token for injecting options for content body renderer
 */
export const BODY_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions> = new InjectionToken<VisualPluginOptions>('BODY_CONTENT_RENDERER_OPTIONS');

/**
 * Token for injecting options for content header renderer
 */
export const HEADER_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions> = new InjectionToken<VisualPluginOptions>('HEADER_CONTENT_RENDERER_OPTIONS');

/**
 * Token for injecting options for data loader
 */
export const DATA_LOADER_OPTIONS: InjectionToken<DataLoaderOptions> = new InjectionToken<DataLoaderOptions>('DATA_LOADER_OPTIONS');

/**
 * Token for injecting options for grid initializer
 */
export const GRID_INITIALIZER_OPTIONS: InjectionToken<GridInitializerOptions> = new InjectionToken<GridInitializerOptions>('GRID_INITIALIZER_OPTIONS');

/**
 * Token for injecting options for metadata selector
 */
export const METADATA_SELECTOR_OPTIONS: InjectionToken<MetadataSelectorOptions> = new InjectionToken<MetadataSelectorOptions>('METADATA_SELECTOR_OPTIONS');

/**
 * Token for injecting options for no data renderer
 */
export const NO_DATA_RENDERER_OPTIONS: InjectionToken<NoDataRendererOptions> = new InjectionToken<NoDataRendererOptions>('NO_DATA_RENDERER_OPTIONS');

/**
 * Token for injecting options for paging
 */
export const PAGING_OPTIONS: InjectionToken<PagingOptions> = new InjectionToken<PagingOptions>('PAGING_OPTIONS');

/**
 * Token for injecting options for row selector
 */
export const ROW_SELECTOR_OPTIONS: InjectionToken<RowSelectorOptions> = new InjectionToken<RowSelectorOptions>('ROW_SELECTOR_OPTIONS');
