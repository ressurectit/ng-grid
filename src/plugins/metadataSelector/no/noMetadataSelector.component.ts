import {Component, ChangeDetectionStrategy, EventEmitter, OnDestroy, ElementRef} from "@angular/core";
import {Subscription} from "rxjs";

import {NoMetadataSelector, NoMetadataSelectorOptions} from "./noMetadataSelector.interface";
import {MetadataGatherer} from "../../../components/metadata";
import {GridPluginInstances} from "../../../components/grid";
import {GridPluginGeneric} from "../../../misc";

/**
 * Plugin component for metadata selector, which does not allows selection of metadata
 */
@Component(
{
    selector: 'ng-no-metadata-selector',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoMetadataSelectorComponent<TMetadata> implements NoMetadataSelector<TMetadata>, GridPluginGeneric<NoMetadataSelectorOptions>, OnDestroy
{
    /**
     * Subscription for metadata changes
     */
    private _metadataChangedSubscription: Subscription;

    /**
     * Indication whether gahterer has been initialized
     */
    private _gathererInitialized: boolean = false;

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    private _metadataGatherer: MetadataGatherer<TMetadata>;

    //######################### public properties - implementation of NoMetadataSelector #########################

    /**
     * Options for metadata selector
     */
    public options: NoMetadataSelectorOptions;

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    public get metadataGatherer(): MetadataGatherer<TMetadata>
    {
        return this._metadataGatherer;
    }
    public set metadataGatherer(gatherer: MetadataGatherer<TMetadata>)
    {
        if(this._metadataGatherer != gatherer)
        {
            this._gathererInitialized = false;
        }

        this._metadataGatherer = gatherer;
    }

    /**
     * Current metadata that are used for rendering
     */
    public metadata: TMetadata;

    /**
     * Occurs when metadata changed
     */
    public metadataChange: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Grid plugin instances available for this plugin
     */
    public gridPlugins: GridPluginInstances;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef)
    {
    }

    //######################### public methods - implementation of NoMetadataSelector #########################

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
        if(!this._gathererInitialized)
        {
            if(this._metadataChangedSubscription)
            {
                this._metadataChangedSubscription.unsubscribe();
                this._metadataChangedSubscription = null;
            }

            this._metadataChangedSubscription = this.metadataGatherer.metadataChange.subscribe(() =>
            {
                this.metadata = this.metadataGatherer.getMetadata();

                this.metadataChange.emit();
            });
        }

        this.metadata = this.metadataGatherer.getMetadata();
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions()
    {
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals()
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._metadataChangedSubscription)
        {
            this._metadataChangedSubscription.unsubscribe();
            this._metadataChangedSubscription = null;
        }
    }
}