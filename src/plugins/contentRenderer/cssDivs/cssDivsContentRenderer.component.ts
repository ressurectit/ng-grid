import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, forwardRef, ElementRef} from "@angular/core";
import {Utils} from "@anglr/common";

import {CssDivsContentRendererOptions} from "./cssDivsContentRenderer.interface";
import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from "../../../components/grid";
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
                @Inject(GRID_PLUGIN_INSTANCES) gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: CssDivsContentRendererOptions)
    {
        super(pluginElement, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }
}