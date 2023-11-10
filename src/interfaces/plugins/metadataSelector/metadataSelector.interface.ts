import {Signal} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';
import {GridMetadata, MetadataGatherer} from '../../metadata/metadataGatherer.interface';
import {PluginOptions} from '../../pluginOptions/pluginOptions.interface';

/**
 * Metadata selector options
 */
export interface MetadataSelectorOptions extends PluginOptions
{
}

/**
 * Metadata selector plugin interface
 */
export interface MetadataSelector<TMetadata extends GridMetadata = GridMetadata, TOptions extends MetadataSelectorOptions = MetadataSelectorOptions> extends GridPlugin<TOptions>
{
    /**
     * Current metadata that are used for rendering
     */
    readonly metadata: Signal<TMetadata|undefined|null>;

    /**
     * Shows metadata selector
     */
    show(): void;

    /**
     * Resets metadata to default
     */
    resetMetadata(): PromiseOr<void>;

    /**
     * Sets instance of metadata gatherer, which is used for getting metadata
     * @param gatherer - Gatherer used for obtaining metadata
     */
    setMetadataGatherer(gatherer: MetadataGatherer<TMetadata>): void;
}