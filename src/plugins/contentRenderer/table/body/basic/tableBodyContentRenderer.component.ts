import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {BasicTableColumn, BasicTableMetadata} from "../../../../../components/metadata";
import {TableBodyContentRendererOptions} from "../../tableContentRenderer.interface";
import {GridPluginInstances} from "../../../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../../../components/grid/types";
import {BODY_CONTENT_RENDERER_OPTIONS} from "../../../types";
import {BodyContentRendererAbstractComponent} from "../../../bodyContentRendererAbstract.component";

/**
 * Default options for 'TableBodyContentRendererComponent'
 * @internal
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
export class TableBodyContentRendererComponent<TData> extends BodyContentRendererAbstractComponent<TData, TableBodyContentRendererOptions, BasicTableMetadata<BasicTableColumn<TData>>, any>
{
    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: TableBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }
}