import {InjectionToken} from "@angular/core";

import {PagingPosition} from "./enums";
import {GridPluginTypes} from "./plugin.interface";
import {Paging} from "../plugins/paging";
import {DataLoader} from "../plugins/dataLoader";
import {ContentRenderer} from "../plugins/contentRenderer";
import {MetadataSelector} from "../plugins/metadataSelector";
import {NoDataRenderer} from "../plugins/noDataRenderer";
import {TextsLocator} from "../plugins/textsLocator";
import {RowSelector} from "../plugins/rowSelector";

/**
 * Injection token for 'GridOptions'
 */
export const GRID_OPTIONS: InjectionToken<GridOptions> = new InjectionToken<GridOptions>('GRID_OPTIONS');

/**
 * Injection token for 'Paging' implementation
 */
export const PAGING_TYPE: InjectionToken<Paging> = new InjectionToken<Paging>('PAGING_TYPE');

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
 * Injection token for 'TextsLocator' implementation
 */
export const TEXTS_LOCATOR_TYPE: InjectionToken<TextsLocator> = new InjectionToken<TextsLocator>('TEXTS_LOCATOR_TYPE');

/**
 * Injection token for 'RowSelector' implementation
 */
export const ROW_SELECTOR_TYPE: InjectionToken<RowSelector<any, any, any>> = new InjectionToken<RowSelector<any, any, any>>('ROW_SELECTOR_TYPE');

/**
 * Describes grid options used for grid
 */
export interface GridOptions
{
    /**
     * Indication whether grid should be initialized automaticaly during 'NgOnInit' phase
     */
    autoInitialize?: boolean;

    /**
     * Position of paging rendered by grid
     */
    pagingPosition?: PagingPosition;

    /**
     * Css classes applied to grid component, possible to override only part of classes
     */
    cssClasses?: {};

    /**
     * Object defining overrides for default plugins, default plugins can be also specified using DI
     */
    plugins?: GridPluginTypes;
}