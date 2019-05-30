import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {TableHeaderContentRendererOptions} from "../../tableContentRenderer.interface";
import {HEADER_CONTENT_RENDERER_OPTIONS} from "../../../contentRenderer.interface";
import {HeaderContentRendererAbstractComponent} from "../../../headerContentRendererAbstract.component";

/**
 * Default options for 'TableHeaderContentRendererComponent'
 * @internal
 */
const defaultOptions: TableHeaderContentRendererOptions =
{
    cssClasses:
    {
        thead: '',
        thDefault: 'header-default',
        thOrderable: 'header-orderable',
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
 * Component used for rendering table header in table content renderer
 */
@Component(
{
    selector: 'thead.content-renderer',
    templateUrl: 'tableHeaderContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.header-default
        {
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
export class TableHeaderContentRendererComponent<TData> extends HeaderContentRendererAbstractComponent<TData, TableHeaderContentRendererOptions>
{
    //######################### public properties - host #########################

    /**
     * Css class applied to header itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.thead;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: TableHeaderContentRendererOptions)
    {
        super(pluginElement, changeDetector);

        this._options = extend(true, {}, defaultOptions, options);
    }
}