import {Component, ChangeDetectionStrategy, OnDestroy, ElementRef} from '@angular/core';
import {Observable, Subscription, Subject} from 'rxjs';

import {NoMetadataSelector, NoMetadataSelectorOptions} from './noMetadataSelector.interface';
import {GridMetadata, GridPlugin, GridPluginInstances, MetadataGatherer} from '../../../interfaces';

/**
 * Plugin component for metadata selector, which does not allows selection of metadata
 */
@Component(
{
    selector: 'ng-no-metadata-selector',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoMetadataSelectorSAComponent<TMetadata extends GridMetadata = GridMetadata> implements NoMetadataSelector<TMetadata>, GridPlugin<NoMetadataSelectorOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscription for metadata changes
     */
    protected metadataChangedSubscription: Subscription|undefined|null;

    /**
     * Indication whether gahterer has been initialized
     */
    protected gathererInitialized: boolean = false;

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    protected metadataGatherer: MetadataGatherer<TMetadata>|undefined|null;

    /**
     * Subject used for emitting changes in metadata
     */
    protected metadataChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties - implementation of NoMetadataSelector #########################

    /**
     * @inheritdoc
     */
    public options: NoMetadataSelectorOptions = {};

    /**
     * @inheritdoc
     */
    public metadata: TMetadata|undefined|null;

    /**
     * @inheritdoc
     */
    public get metadataChange(): Observable<void>
    {
        return this.metadataChangeSubject.asObservable();
    }

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef)
    {
    }

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
            if(this.metadataChangedSubscription)
            {
                this.metadataChangedSubscription.unsubscribe();
                this.metadataChangedSubscription = null;
            }

            this.metadataChangedSubscription = this.metadataGatherer?.metadataChange.subscribe(() =>
            {
                this.metadata = this.metadataGatherer?.getMetadata();

                this.metadataChangeSubject.next();
            });

            this.gathererInitialized = true;
        }

        this.metadata = this.metadataGatherer?.getMetadata();
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

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.metadataChangedSubscription?.unsubscribe();
        this.metadataChangedSubscription = null;
    }
}