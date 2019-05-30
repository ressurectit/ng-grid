import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, forwardRef, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {CssDivsContentRendererOptions} from "./cssDivsContentRenderer.interface";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {CONTENT_RENDERER_OPTIONS} from "../contentRenderer.interface";
import {PluginDescription} from "../../../misc";
import {ContentRendererAbstractComponent} from "../contentRendererAbstract.component";
import {CssDivsBodyContentRendererComponent} from "./body/cssDivsBodyContentRenderer.component";
import {CssDivsHeaderContentRendererComponent} from "./header/cssDivsHeaderContentRenderer.component";

/**
 * Default options for 'CssDivsContentRendererComponent'
 * @internal
 */
const defaultOptions: CssDivsContentRendererOptions =
{
    cssClasses:
    {
    },
    plugins:
    {
        bodyRenderer: <PluginDescription<CssDivsBodyContentRendererComponent<any>>>
        {
            type: forwardRef(() => CssDivsBodyContentRendererComponent)
        },
        headerRenderer: <PluginDescription<CssDivsHeaderContentRendererComponent<any>>>
        {
            type: forwardRef(() => CssDivsHeaderContentRendererComponent)
        }
    }
};

/**
 * Component used for 'CssDivsContentRendererComponent'
 */
@Component(
{
    selector: 'div.content-renderer',
    templateUrl: 'cssDivsContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssDivsContentRendererComponent<TOrdering, TData, TMetadata> extends ContentRendererAbstractComponent<TOrdering, TData, TMetadata, CssDivsContentRendererOptions> implements OnDestroy
{
    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: CssDivsContentRendererOptions)
    {
        super(pluginElement, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }
}