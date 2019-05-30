import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {CssDivsHeaderContentRendererOptions} from "../cssDivsContentRenderer.interface";
import {HEADER_CONTENT_RENDERER_OPTIONS} from "../../types";
import {HeaderContentRendererAbstractComponent} from "../../headerContentRendererAbstract.component";

/**
 * Default options for 'CssDivsHeaderContentRendererComponent'
 * @internal
 */
const defaultOptions: CssDivsHeaderContentRendererOptions =
{
    cssClasses:
    {
        headerDiv: '',
        headerRowDiv: 'header-row',
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
 * Component used for rendering css divs header in css divs content renderer
 */
@Component(
{
    selector: 'div.content-renderer-header',
    templateUrl: 'cssDivsHeaderContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.header-row
        {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #EDEDED;
        }

        .header-cell
        {
            flex: 1;
            min-width: 0;
            padding: 2px 4px;
            font-weight: bold;
            white-space: nowrap;
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
export class CssDivsHeaderContentRendererComponent<TData> extends HeaderContentRendererAbstractComponent<TData, CssDivsHeaderContentRendererOptions>
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
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsHeaderContentRendererOptions)
    {
        super(pluginElement, changeDetector);

        this._options = extend(true, {}, defaultOptions, options);
    }
}