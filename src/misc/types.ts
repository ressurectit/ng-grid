import {InjectionToken} from "@angular/core";

import {Paging} from "../plugins/paging";
import {DataLoader} from "../plugins/dataLoader";
import {ContentRenderer} from "../plugins/contentRenderer";
import {MetadataSelector} from "../plugins/metadataSelector";
import {NoDataRenderer} from "../plugins/noDataRenderer";
import {RowSelector} from "../plugins/rowSelector";
import {PagingInitializer} from "../plugins/pagingInitializer";
import {GridOptions} from "./gridOptions.interface";
import {PluginDescription} from "./plugin.interface";
import {GridInitializer} from '../plugins/gridInitializer';

/**
 * Injection token for 'GridOptions'
 */
export const GRID_OPTIONS: InjectionToken<GridOptions> = new InjectionToken<GridOptions>('GRID_OPTIONS');

/**
 * Injection token for 'Paging' implementation
 */
export const PAGING_TYPE: InjectionToken<Paging> = new InjectionToken<Paging>('PAGING_TYPE');

/**
 * Injection token for 'PagingInitializer' implementation
 */
export const PAGING_INITIALIZER_TYPE: InjectionToken<PagingInitializer> = new InjectionToken<PagingInitializer>('PAGING_INITIALIZER_TYPE');

/**
 * Injection token for 'GridInitializer' implementation
 */
export const GRID_INITIALIZER_TYPE: InjectionToken<GridInitializer> = new InjectionToken<GridInitializer>('GRID_INITIALIZER_TYPE');

/**
 * Injection token for 'DataLoader<any>' implementation
 */
export const DATA_LOADER_TYPE: InjectionToken<DataLoader<any>> = new InjectionToken<DataLoader<any>>('DATA_LOADER_TYPE');

/**
 * Injection token for 'ContentRenderer<any>' implementation
 */
export const CONTENT_RENDERER_TYPE: InjectionToken<ContentRenderer<any>> = new InjectionToken<ContentRenderer<any>>('CONTENT_RENDERER_TYPE');

/**
 * Injection token for 'MetadataSelector<any>' implementation
 */
export const METADATA_SELECTOR_TYPE: InjectionToken<MetadataSelector<any>> = new InjectionToken<MetadataSelector<any>>('METADATA_SELECTOR_TYPE');

/**
 * Injection token for 'NoDataRenderer' implementation
 */
export const NO_DATA_RENDERER_TYPE: InjectionToken<NoDataRenderer> = new InjectionToken<NoDataRenderer>('NO_DATA_RENDERER_TYPE');

/**
 * Injection token for 'RowSelector' implementation
 */
export const ROW_SELECTOR_TYPE: InjectionToken<RowSelector<any, any, any>> = new InjectionToken<RowSelector<any, any, any>>('ROW_SELECTOR_TYPE');

/**
 * All available types of plugins for grid
 */
export class GridPluginTypes
{
    /**
     * Loader that is used for obtaining data that will be displayed
     */
    dataLoader?: PluginDescription<DataLoader<any>>;

    /**
     * Paging component used for applying paging to data
     */
    paging?: PluginDescription<Paging>;

    /**
     * Paging initializer component used for obtaining initial paging data
     */
    pagingInitializer?: PluginDescription<PagingInitializer>;

    /**
     * Grid initializer component used for obtaining stored grid data
     */
    gridInitializer?: PluginDescription<GridInitializer>;

    /**
     * Metadata selector used for gathering and manipulation with metadata
     */
    metadataSelector?: PluginDescription<MetadataSelector<any>>;

    /**
     * Renderer that renders obtained data
     */
    contentRenderer?: PluginDescription<ContentRenderer<any>>;

    /**
     * Renderer used for rendering information that there are no data currently
     */
    noDataRenderer?: PluginDescription<NoDataRenderer>;

    /**
     * Row selector used for handling row selection
     */
    rowSelector?: PluginDescription<RowSelector<any, any, any>>;
}