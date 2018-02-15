import {InjectionToken, EventEmitter} from "@angular/core";

import {PluginOptions, GridPlugin} from "../../misc";
import {MetadataGatherer} from "../../components/metadata";

/**
 * Token for injecting options for metadata selector
 */
export const METADATA_SELECTOR_OPTIONS: InjectionToken<MetadataSelectorOptions> = new InjectionToken<MetadataSelectorOptions>('METADATA_SELECTOR_OPTIONS');

/**
 * Constant used for accessing metadata selector in grid
 */
export const METADATA_SELECTOR = "METADATA_SELECTOR";

/**
 * Metadata selector options
 */
export interface MetadataSelectorOptions extends PluginOptions
{
}

/**
 * Metadata selector plugin interface
 */
export interface MetadataSelector<TMetadata> extends GridPlugin
{
    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    metadataGatherer: MetadataGatherer<TMetadata>;

    /**
     * Current metadata that are used for rendering
     */
    metadata: TMetadata;

    /**
     * Occurs when metadata changed
     */
    metadataChange: EventEmitter<void>;
}