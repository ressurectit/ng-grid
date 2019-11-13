import {ChangeDetectorRef, Inject, Injectable, ElementRef, Optional} from "@angular/core";
import {extend} from "@jscrpt/common";

import {GridPluginInstances} from "../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../components/grid/types";
import {BodyContentRenderer, BodyContentRendererOptions} from "./contentRenderer.interface";
import {Paging} from "../paging";
import {PAGING} from "../paging/types";
import {GridPluginGeneric} from "../../misc";

//TODO - compute classes before rendering
//TOOD - mergeClasses as pipe

/**
 * Abstract component for body content renderer
 */
@Injectable()
export class BodyContentRendererAbstractComponent<TData, TOptions extends BodyContentRendererOptions<TCssClasses>, TMetadata, TCssClasses> implements BodyContentRenderer<TData, TMetadata>, GridPluginGeneric<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for body content renderer
     */
    protected _options: TOptions;

    //######################### public properties - template bindings #########################

    /**
     * Starting index of currently displayed items
     */
    public startingIndex: number = 0;

    //######################### public properties - implementation of BodyContentRenderer #########################

    /**
     * Options for body content renderer
     */
    public set options(options: TOptions)
    {
        this._options = extend(true, this._options, options) as TOptions;
    }
    public get options(): TOptions
    {
        return this._options;
    }

    /**
     * Data that are rendered
     */
    public data: TData[];

    /**
     * Metadata used for rendering
     */
    public metadata: TMetadata;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances)
    {
    }

    //######################### public methods - implementation of CssDivsBodyContentRenderer<TData, BasicTableColumn> #########################

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
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
        this.startingIndex = (this.gridPlugins[PAGING] as Paging).firstItemIndex;
        this._changeDetector.detectChanges();
    }

    //######################### public methods - template bindings #########################

    /**
     * Merges css classes specified as strings
     */
    public mergeStringClasses(...classes: string[])
    {
        let result = [];

        classes.forEach(cls => cls ? (result.push(cls)) : null);

        return result;
    }
}