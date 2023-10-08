import {InjectionToken} from '@angular/core';

import {MetadataGatherer} from '../interfaces';

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