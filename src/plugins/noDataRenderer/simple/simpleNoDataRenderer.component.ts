import {Inject, Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Optional, OnDestroy, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalizeSAPipe} from '@anglr/common';
import {RecursivePartial, extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {DataLoader, GridPlugin} from '../../../interfaces';
import {SimpleNoDataRenderer, SimpleNoDataRendererOptions} from './simpleNoDataRenderer.interface';
import {DataLoaderState, GridPluginType} from '../../../misc/enums';
import {GRID_PLUGIN_INSTANCES, NO_DATA_RENDERER_OPTIONS} from '../../../misc/tokens';
import {GridPluginInstances} from '../../../misc/types';

/**
 * Default options for no data renderer
 */
const defaultOptions: SimpleNoDataRendererOptions =
{
    template: null,
    texts:
    {
        loading: 'Loading ...',
        noData: 'No data available.',
        notLoaded: 'No data loaded yet'
    },
    cssClasses:
    {
        wrapperDiv: 'simple-no-data',
        textSpan: 'simple-no-data-text'
    }
};

/**
 * Component for basic simple no data renderer
 */
@Component(
{
    selector: 'ng-simple-no-data',
    templateUrl: 'simpleNoDataRenderer.component.html',
    styleUrls: ['simpleNoDataRenderer.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        LocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleNoDataRendererSAComponent implements SimpleNoDataRenderer, GridPlugin<SimpleNoDataRendererOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Data loader currently used
     */
    protected dataLoader: DataLoader|undefined|null;

    /**
     * Subscription for changes in state of data loader
     */
    protected stateChangedSubscription: Subscription|undefined|null;

    //######################### protected properties - template bindings #########################

    /**
     * Currently displayed text
     */
    protected text: WritableSignal<string> = signal('');

    /**
     * Options for grid plugin
     */
    protected optionsValue: WritableSignal<SimpleNoDataRendererOptions>;

    //######################### public properties - implementation of NoDataRenderer #########################

    /**
     * @inheritdoc
     */
    public get options(): SimpleNoDataRendererOptions
    {
        return this.optionsValue();
    }
    public set options(options: RecursivePartial<SimpleNoDataRendererOptions>)
    {
        this.optionsValue.update(opts => extend(true, opts, options));
    }

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                protected changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances|undefined|null,
                @Inject(NO_DATA_RENDERER_OPTIONS) @Optional() options?: SimpleNoDataRendererOptions,)
    {
        this.optionsValue = signal(extend(true, {}, defaultOptions, options));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.stateChangedSubscription?.unsubscribe();
        this.stateChangedSubscription = null;
    }

    //######################### public methods - implementation of NoDataRenderer #########################

    /**
     * @inheritdoc
     */
    public initialize(force: boolean): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('SimpleNoDataRendererSAComponent: missing gridPlugins!');
        }

        const dataLoader: DataLoader = this.gridPlugins[GridPluginType.DataLoader] as DataLoader;

        //data loader obtained and its different instance
        if(force || (this.dataLoader && this.dataLoader != dataLoader))
        {
            this.stateChangedSubscription?.unsubscribe();
            this.stateChangedSubscription = null;

            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader)
        {
            this.dataLoader = dataLoader;

            this.stateChangedSubscription = this.dataLoader.stateChange.subscribe(() => this.processLoaderState());
        }

        this.processLoaderState();
        this.invalidateVisuals();
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
        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Process current loader state
     */
    protected processLoaderState(): void
    {
        if(!this.dataLoader)
        {
            return;
        }

        switch(this.dataLoader.state)
        {
            case DataLoaderState.NoDataLoading:
            {
                this.text.set(this.optionsValue().texts.loading);

                break;
            }
            case DataLoaderState.NoData:
            {
                this.text.set(this.optionsValue().texts.noData);

                break;
            }
            case DataLoaderState.NotLoadedYet:
            {
                this.text.set(this.optionsValue().texts.notLoaded);

                break;
            }
            default:
            //case DataLoaderState.Loaded:
            //case DataLoaderState.DataLoading:
            {
                this.text.set('');

                break;
            }
        }

        this.changeDetector.detectChanges();
    }
}