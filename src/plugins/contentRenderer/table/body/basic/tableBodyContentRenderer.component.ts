import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, ElementRef} from "@angular/core";
import {Utils} from "@anglr/common";

import {BasicTableColumn} from "../../../../../components/metadata";
import {TableBodyContentRendererOptions} from "../../tableContentRenderer.interface";
import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from "../../../../../components/grid";
import {BODY_CONTENT_RENDERER_OPTIONS} from "../../../contentRenderer.interface";
import {BodyContentRendererAbstractComponent} from "../../../bodyContentRendererAbstract.component";

/**
 * Default options for 'TableBodyContentRendererComponent'
 */
const defaultOptions: TableBodyContentRendererOptions =
{
};

/**
 * Component used for rendering tbody for 'TableContentRenderer'
 */
@Component(
{
    selector: 'tbody.content-renderer',
    templateUrl: 'tableBodyContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableBodyContentRendererComponent<TData> extends BodyContentRendererAbstractComponent<TData, TableBodyContentRendererOptions, BasicTableColumn<TData>[], any>
{
    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: TableBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }
}