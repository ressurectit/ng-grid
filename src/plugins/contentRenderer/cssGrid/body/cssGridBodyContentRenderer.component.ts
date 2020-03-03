import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, HostBinding, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {CssGridBodyContentRendererOptions, CssClassesCssGridBodyContentRenderer} from "../cssGridContentRenderer.interface";
import {BasicTableMetadata, BasicTableColumn} from "../../../../components/metadata";
import {GridPluginInstances} from "../../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../../components/grid/types";
import {BODY_CONTENT_RENDERER_OPTIONS} from "../../types";
import {BodyContentRendererAbstractComponent} from "../../bodyContentRendererAbstract.component";

/**
 * Default options for 'CssGridBodyContentRendererComponent'
 * @internal
 */
const defaultOptions: CssGridBodyContentRendererOptions =
{
    cssClasses:
    {
        bodyDiv: '',
        rowDiv: 'body-row',
        cellDiv: 'body-cell'
    }
};

/**
 * Component used for rendering body for 'CssGridContentRenderer'
 */
@Component(
{
    selector: 'div.content-renderer-body',
    templateUrl: 'cssGridBodyContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.body-row
        {
            display: contents;
        }

        .body-row:nth-of-type(2n+0) > .body-cell
        {
            background-color: #f9f9f9;
        }

        .body-row:hover > .body-cell
        {
            background-color: #f5f5f5;
        }

        .body-cell
        {
            padding: 3px;
            line-height: 1.42857143;
            vertical-align: middle;
            border-top: 1px solid #ddd;
        }
        `
    ]
})
export class CssGridBodyContentRendererComponent<TData> extends BodyContentRendererAbstractComponent<TData, CssGridBodyContentRendererOptions, BasicTableMetadata<BasicTableColumn<TData>>, CssClassesCssGridBodyContentRenderer>
{
    //######################### public properties - host bindings #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.bodyDiv;
    }

    /**
     * Display style property of host element
     */
    @HostBinding('style.display')
    public display: string = "contents";

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: CssGridBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }
}
