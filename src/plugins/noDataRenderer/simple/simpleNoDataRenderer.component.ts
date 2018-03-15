import {Inject, Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Optional, OnDestroy} from "@angular/core";
import {Utils} from "@anglr/common";
import {Subscription} from "rxjs/Subscription";

import {NO_DATA_RENDERER_OPTIONS} from "../noDataRenderer.interface";
import {GridPluginGeneric} from "../../../misc";
import {GridPluginInstances, GRID_PLUGIN_INSTANCES} from "../../../components/grid";
import {DataLoader, DataResponse, DATA_LOADER} from "../../dataLoader";
import {SimpleNoDataRenderer, CssClassesSimpleNoDataRenderer, SimpleNoDataRendererOptions} from "./simpleNoDataRenderer.interface";

/**
 * Default options for no data renderer
 * @internal
 */
const defaultOptions: SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer> =
{
    text: 'No data available.',
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.simple-no-data
        {
            padding: 2px 8px;
            text-align: center;
        }

        .simple-no-data-text
        {
            font-weight: bold;
        }`
    ]
})
export class SimpleNoDataRendererComponent implements SimpleNoDataRenderer, GridPluginGeneric<SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>>, OnDestroy
{
    //######################### private fields #########################

    /**
     * Options for grid plugin
     */
    private _options: SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>;

    /**
     * Data loader currently used
     */
    private _dataLoader: DataLoader<DataResponse<any>>;

    /**
     * Subscription for changes in data
     */
    private _dataChangedSubscription: Subscription;

    //######################### public properties - template bindings #########################

    /**
     * Indication that data are present or not
     */
    public dataPresent: boolean = false;

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
        this._options = Utils.common.extend(true, this._options, options);
    }

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) public gridPlugins: GridPluginInstances,
                public pluginElement: ElementRef,
                private _changeDetector: ChangeDetectorRef,
                @Inject(NO_DATA_RENDERER_OPTIONS) @Optional() options?: SimpleNoDataRendererOptions<CssClassesSimpleNoDataRenderer>)
    {
        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._dataChangedSubscription)
        {
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;
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
            this._dataChangedSubscription.unsubscribe();
            this._dataChangedSubscription = null;

            this._dataLoader = null;
        }

        if(!this._dataLoader)
        {
            this._dataLoader = dataLoader;

            this._dataChangedSubscription = this._dataLoader.resultChange.subscribe(() => this.invalidateVisuals());
        }

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
        this.dataPresent = !!this._dataLoader.result.data.length;

        this._changeDetector.detectChanges();
    }
}