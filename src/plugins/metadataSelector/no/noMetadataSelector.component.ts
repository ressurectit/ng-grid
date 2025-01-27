import {Component, ChangeDetectionStrategy, ElementRef, Signal, signal, inject, computed} from '@angular/core';

import {NoMetadataSelector, NoMetadataSelectorOptions} from './noMetadataSelector.interface';
import {GridMetadata, GridPlugin, GridPluginInstances, MetadataGatherer} from '../../../interfaces';

/**
 * Plugin component for metadata selector, which does not allows selection of metadata
 */
@Component(
{
    selector: 'ng-no-metadata-selector',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoMetadataSelectorComponent<TMetadata extends GridMetadata = GridMetadata> implements NoMetadataSelector<TMetadata>, GridPlugin<NoMetadataSelectorOptions>
{
    //######################### protected fields #########################

    /**
     * Indication whether gahterer has been initialized
     */
    protected gathererInitialized: boolean = false;

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    protected metadataGatherer: MetadataGatherer<TMetadata>|undefined|null;

    /**
     * Instance of signal for obtaining metadata
     */
    protected metadataValue: Signal<TMetadata|undefined|null> = signal(null).asReadonly();

    //######################### public properties - implementation of NoMetadataSelector #########################

    /**
     * @inheritdoc
     */
    public options: NoMetadataSelectorOptions = {};

    /**
     * @inheritdoc
     */
    public get metadata(): Signal<TMetadata|undefined|null>
    {
        return this.metadataValue;
    }

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null;

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    //######################### public methods - implementation of NoMetadataSelector #########################

    /**
     * @inheritdoc
     */
    public show(): void
    {
    }

    /**
     * @inheritdoc
     */
    public resetMetadata(): void
    {
    }

    /**
     * @inheritdoc
     */
    public setMetadataGatherer(gatherer: MetadataGatherer<TMetadata>): void
    {
        if(this.metadataGatherer != gatherer)
        {
            this.gathererInitialized = false;
        }

        this.metadataGatherer = gatherer;
    }

    /**
     * @inheritdoc
     */
    public initialize(force: boolean): void
    {
        if(force || !this.gathererInitialized)
        {
            this.metadataValue = computed(() => this.metadataGatherer?.metadata());

            this.gathererInitialized = true;
        }
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}