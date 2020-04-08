import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {HEADER_CONTENT_RENDERER_OPTIONS} from "../../types";
import {CssDivsHeaderContentRendererOptions} from "../cssDivsContentRenderer.interface";
import {HeaderContentRendererAbstractComponent} from "../../headerContentRendererAbstract.component";
import {GRID_PLUGIN_INSTANCES} from '../../../../components/grid/types';
import {GridPluginInstances} from '../../../../components/grid';

/**
 * Default options for 'CssDivsHeaderContentRendererComponent'
 * @internal
 */
const defaultOptions: CssDivsHeaderContentRendererOptions =
{
    cssClasses:
    {
        headerDiv: 'header-row-contents',
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
    templateUrl: 'CssDivsHeaderContentRenderer.component.html',
    styleUrls: ['CssDivsHeaderContentRenderer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssDivsHeaderContentRendererComponent<TData = any> extends HeaderContentRendererAbstractComponent<TData, CssDivsHeaderContentRendererOptions>
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
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsHeaderContentRendererOptions,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances)
    {
        super(pluginElement, gridPlugins, changeDetector);

        this._options = extend(true, {}, defaultOptions, options);
    }
}
