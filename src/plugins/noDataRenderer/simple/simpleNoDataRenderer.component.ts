import {Inject, Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Optional, signal, WritableSignal, computed, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalizePipe} from '@anglr/common';
import {RecursivePartial, extend} from '@jscrpt/common';

import {DataLoader, GridPlugin, GridPluginInstances} from '../../../interfaces';
import {SimpleNoDataRenderer, SimpleNoDataRendererOptions} from './simpleNoDataRenderer.interface';
import {DataLoaderState, GridPluginType} from '../../../misc/enums';
import {GRID_PLUGIN_INSTANCES, NO_DATA_RENDERER_OPTIONS} from '../../../misc/tokens';

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
        wrapperContainer: 'no-data-container',
        textElement: 'no-data-text',
    }
};

/**
 * Component for basic simple no data renderer
 */
@Component(
{
    selector: 'ng-simple-no-data',
    templateUrl: 'simpleNoDataRenderer.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        LocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleNoDataRendererSAComponent implements SimpleNoDataRenderer, GridPlugin<SimpleNoDataRendererOptions>
{
    //######################### protected fields #########################

    /**
     * Data loader currently used
     */
    protected dataLoader: DataLoader|undefined|null;

    //######################### protected properties - template bindings #########################

    /**
     * Currently displayed text
     */
    protected text: Signal<string> = signal('').asReadonly();

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
            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader)
        {
            this.dataLoader = dataLoader;

            this.text = computed<string>(() =>
            {
                if(!this.dataLoader)
                {
                    return '';
                }

                const state = this.dataLoader.state();

                switch(state)
                {
                    case DataLoaderState.NoDataLoading:
                    {
                        return this.optionsValue().texts.loading;
                    }
                    case DataLoaderState.NoData:
                    {
                        return this.optionsValue().texts.noData;
                    }
                    case DataLoaderState.NotLoadedYet:
                    {
                        return this.optionsValue().texts.notLoaded;
                    }
                    default:
                    //case DataLoaderState.Loaded:
                    //case DataLoaderState.DataLoading:
                    {
                        return '';
                    }
                }
            });
        }

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
}