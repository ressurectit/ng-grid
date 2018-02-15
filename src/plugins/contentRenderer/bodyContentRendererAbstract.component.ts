import {ChangeDetectorRef, Inject, Injectable, ElementRef} from "@angular/core";
import {Utils} from "@anglr/common";

import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from "../../components/grid";
import {BodyContentRenderer, BodyContentRendererOptions} from "./contentRenderer.interface";
import {PAGING, Paging} from "../paging";
import {GridPluginGeneric} from "../../misc";

//TODO - compute classes before rendering
//TODO - create bodyContentRendererExt - rowHighlight
//                                     - row selection

/**
 * Abstract component for body content renderer
 */
@Injectable()
export class BodyContentRendererAbstractComponent<TData, TOptions extends BodyContentRendererOptions<TCssClasses, TData>, TMetadata, TCssClasses> implements BodyContentRenderer<TData, TMetadata>, GridPluginGeneric<TOptions>
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
        this._options = Utils.common.extend(true, this._options, options) as TOptions;
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
                @Inject(GRID_PLUGIN_INSTANCES) public gridPlugins: GridPluginInstances)
    {
    }

    //######################### public methods - implementation of CssDivsBodyContentRenderer<TData, BasicTableColumn> #########################

    /**
     * Initialize plugin, to be ready to use
     */
    public initialize()
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