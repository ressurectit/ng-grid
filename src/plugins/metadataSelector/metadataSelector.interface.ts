import {EventEmitter} from "@angular/core";

import {PluginOptions, GridPlugin} from "../../misc";
import {MetadataGatherer} from "../../components/metadata";

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