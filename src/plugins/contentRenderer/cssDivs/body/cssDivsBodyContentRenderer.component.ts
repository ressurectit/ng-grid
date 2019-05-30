import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, HostBinding, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {BasicTableColumn, BasicTableMetadata} from "../../../../components/metadata";
import {CssDivsBodyContentRendererOptions, CssClassesCssDivsBodyContentRenderer} from "../cssDivsContentRenderer.interface";
import {GridPluginInstances} from "../../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../../components/grid/types";
import {BODY_CONTENT_RENDERER_OPTIONS} from "../../contentRenderer.interface";
import {BodyContentRendererAbstractComponent} from "../../bodyContentRendererAbstract.component";

/**
 * Default options for 'CssDivsBodyContentRendererComponent'
 * @internal
 */
const defaultOptions: CssDivsBodyContentRendererOptions =
{
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
export class CssDivsBodyContentRendererComponent<TData> extends BodyContentRendererAbstractComponent<TData, CssDivsBodyContentRendererOptions, BasicTableMetadata<BasicTableColumn<TData>>, CssClassesCssDivsBodyContentRenderer>
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
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }
}