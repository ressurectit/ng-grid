import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {HEADER_CONTENT_RENDERER_OPTIONS} from "../../types";
import {CssGridHeaderContentRendererOptions} from "../cssGridContentRenderer.interface";
import {HeaderContentRendererAbstractComponent} from "../../headerContentRendererAbstract.component";

/**
 * Default options for 'CssGridHeaderContentRendererComponent'
 * @internal
 */
const defaultOptions: CssGridHeaderContentRendererOptions =
{
    cssClasses:
    {
        headerDiv: 'header-row',
        headerCellDiv: 'header-cell',
        headerCellOrderableDiv: 'header-orderable',
        spanContent: 'header-content',
        spanOrdering: 'header-ordering',
        spanOrderingDirection:
        {
            none: 'fa fa-sort',
            asc: 'fa fa-sort-up',
            desc: 'fa fa-sort-down'
        }
    }
};

/**
 * Component used for rendering css grid header in css grid content renderer
 */
@Component(
{
    selector: 'div.content-renderer-header',
    templateUrl: 'cssGridHeaderContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `:host.header-row
        {
            display: contents;
            border-bottom: 1px solid #EDEDED;
        }

        .header-cell
        {
            padding: 3px;
            line-height: 1.42857143;
            vertical-align: middle;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .header-orderable:hover
        {
            background-color: #E3E3E3;
            cursor: pointer;
        }

        .header-content
        {
            white-space: normal;
        }`
    ]
})
export class CssGridHeaderContentRendererComponent<TData> extends HeaderContentRendererAbstractComponent<TData, CssGridHeaderContentRendererOptions>
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.headerDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: CssGridHeaderContentRendererOptions)
    {
        super(pluginElement, changeDetector);

        this._options = extend(true, {}, defaultOptions, options);
    }
}
