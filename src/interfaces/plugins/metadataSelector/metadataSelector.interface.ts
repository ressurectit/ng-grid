import {Observable} from 'rxjs';

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
    readonly metadata: TMetadata|undefined|null;

    /**
     * Occurs when metadata changed
     */
    readonly metadataChange: Observable<void>;

    /**
     * Shows metadata selector
     */
    show(): void;

    /**
     * Sets instance of metadata gatherer, which is used for getting metadata
     * @param gatherer - Gatherer used for obtaining metadata
     */
    setMetadataGatherer(gatherer: MetadataGatherer<TMetadata>): void;
}