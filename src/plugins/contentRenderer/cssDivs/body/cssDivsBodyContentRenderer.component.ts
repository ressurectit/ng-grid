import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, HostBinding, ElementRef} from "@angular/core";
import {Utils} from "@anglr/common";

import {BasicTableColumn} from "../../../../components/metadata";
import {CssDivsBodyContentRendererOptions, CssClassesCssDivsBodyContentRenderer} from "../cssDivsContentRenderer.interface";
import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from "../../../../components/grid";
import {BODY_CONTENT_RENDERER_OPTIONS} from "../../contentRenderer.interface";
import {BodyContentRendererAbstractComponent} from "../../bodyContentRendererAbstract.component";

/**
 * Default options for 'CssDivsBodyContentRendererComponent'
 */
const defaultOptions: CssDivsBodyContentRendererOptions<any> =
{
    rowCssClass: () => null,
    cssClasses:
    {
        bodyDiv: '',
        rowDiv: 'body-row',
        cellDiv: 'body-cell'
    }
};

/**
 * Component used for rendering body for 'CssDivsContentRenderer'
 */
@Component(
{
    selector: 'div.content-renderer-body',
    templateUrl: 'cssDivsBodyContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.body-row
        {
            display: flex;
            flex-direction: row;
        }

        .body-row:hover, .body-row:nth-of-type(2n+0):hover
        {
            background-color: #F3F3F3;
        }

        .body-row:nth-of-type(2n+0)
        {
            background-color: #EDEDED;
        }

        .body-cell
        {
            flex: 1;
            min-width: 0;
            padding: 1px 4px;
        }`
    ]
})
export class CssDivsBodyContentRendererComponent<TData> extends BodyContentRendererAbstractComponent<TData, CssDivsBodyContentRendererOptions<TData>, BasicTableColumn<TData>[], CssClassesCssDivsBodyContentRenderer>
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.bodyDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsBodyContentRendererOptions<TData>)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }
}