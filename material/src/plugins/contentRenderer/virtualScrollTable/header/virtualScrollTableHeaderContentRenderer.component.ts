import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from "@angular/core";
import {HEADER_CONTENT_RENDERER_OPTIONS, HeaderContentRendererAbstractComponent, SimpleOrdering, BasicTableMetadata, BasicOrderableColumn} from "@anglr/grid";
import {extend} from "@jscrpt/common";

import {VirtualScrollTableHeaderContentRendererOptions, VirtualScrollTableHeaderContentRenderer} from '../virtualScrollTableContentRenderer.interface';

/**
 * Default options for 'VirtualScrollTableHeaderContentRendererComponent'
 * @internal
 */
const defaultOptions: VirtualScrollTableHeaderContentRendererOptions =
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
    selector: 'thead.virtual-scroll-content-renderer',
    templateUrl: 'virtualScrollTableHeaderContentRenderer.component.html',
    styleUrls: ['virtualScrollTableHeaderContentRenderer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualScrollTableHeaderContentRendererComponent<TData> extends HeaderContentRendererAbstractComponent<TData, VirtualScrollTableHeaderContentRendererOptions> implements VirtualScrollTableHeaderContentRenderer<SimpleOrdering, BasicTableMetadata<BasicOrderableColumn<TData>>>
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
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: VirtualScrollTableHeaderContentRendererOptions)
    {
        super(pluginElement, changeDetector);

        this._options = extend(true, {}, defaultOptions, options);
    }
}