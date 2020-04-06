import {Inject, Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Optional, OnDestroy} from "@angular/core";
import {STRING_LOCALIZATION, StringLocalization} from "@anglr/common";
import {extend} from "@jscrpt/common";
import {Subscription} from "rxjs";

import {NO_DATA_RENDERER_OPTIONS} from "../types";
import {GridPluginGeneric} from "../../../misc";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {DataLoader, DataResponse} from "../../dataLoader";
import {DATA_LOADER, DataLoaderState} from "../../dataLoader/types";
import {SimpleNoDataRenderer, CssClassesSimpleNoDataRenderer, SimpleNoDataRendererOptions} from "./simpleNoDataRenderer.interface";
import {NoDataRendererTexts} from "../noDataRenderer.interface";

//TODO - change texts for texts options with localizations

/**
 * Default options for no data renderer
 * @internal
 */
const defaultOptions: SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer> =
{
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleNoDataRendererComponent implements SimpleNoDataRenderer, GridPluginGeneric<SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected _options: SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>;

    /**
     * Data loader currently used
     */
    protected _dataLoader: DataLoader<DataResponse<any>>;

    /**
     * Subscription for changes in state of data loader
     */
    protected _stateChangedSubscription: Subscription;

    /**
     * Subscription for changes in texts
     */
    protected _textsChangedSubscription: Subscription;

    /**
     * Object containing available texts
     */
    protected _texts: NoDataRendererTexts = {};

    //######################### public properties - template bindings #########################

    /**
     * Currently displayed text
     */
    public text: string;

    //######################### public properties - implementation of NoDataRenderer #########################

    /**
     * Options for grid plugin
     */
    public get options(): SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>
    {
        return this._options;
    }
    public set options(options: SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>)
    {
        this._options = extend(true, this._options, options);
    }

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances,
                @Inject(STRING_LOCALIZATION) protected _stringLocalization: StringLocalization,
                public pluginElement: ElementRef,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(NO_DATA_RENDERER_OPTIONS) @Optional() options?: SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>)
    {
        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._stateChangedSubscription)
        {
            this._stateChangedSubscription.unsubscribe();
            this._stateChangedSubscription = null;
        }

        if(this._textsChangedSubscription)
        {
            this._textsChangedSubscription.unsubscribe();
            this._textsChangedSubscription = null;
        }
    }

    //######################### public methods - implementation of NoDataRenderer #########################

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
        let dataLoader: DataLoader<DataResponse<any>> = this.gridPlugins[DATA_LOADER] as DataLoader<DataResponse<any>>;

        if(this._dataLoader && this._dataLoader != dataLoader)
        {
            this._stateChangedSubscription.unsubscribe();
            this._stateChangedSubscription = null;

            this._dataLoader = null;
        }

        if(!this._dataLoader)
        {
            this._dataLoader = dataLoader;

            this._stateChangedSubscription = this._dataLoader.stateChange.subscribe(() => this._processLoaderState());
        }

        this._textsChangedSubscription = this._stringLocalization.textsChange.subscribe(() => this._initTexts());
        this._initTexts();
        
        this.invalidateVisuals();
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
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Process current loader state
     */
    protected _processLoaderState()
    {
        if(!this._dataLoader)
        {
            return;
        }

        switch(this._dataLoader.state)
        {
            case DataLoaderState.NoDataLoading:
            {
                this.text = this._texts.loading;

                break;
            }
            case DataLoaderState.NoData:
            {
                this.text = this._texts.noData;

                break;
            }
            case DataLoaderState.NotLoadedYet:
            {
                this.text = this._texts.notLoaded;

                break;
            }
            default:
            //case DataLoaderState.Loaded:
            //case DataLoaderState.DataLoading:
            {
                this.text = null;

                break;
            }
        }

        this._changeDetector.detectChanges();
    }

    /**
     * Initialize texts
     */
    protected _initTexts()
    {
        Object.keys(this.options.texts).forEach(key =>
        {
            this._texts[key] = this._stringLocalization.get(this.options.texts[key]);
        });

        this._processLoaderState();
    }
}