import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableHeaderContentRendererOptions} from '../../tableContentRenderer.interface';
import {HeaderContentRendererAbstractComponent} from '../../../headerContentRendererAbstract.component';
import {GRID_PLUGIN_INSTANCES, HEADER_CONTENT_RENDERER_OPTIONS} from '../../../../../../misc/tokens';
import {GridPluginInstances} from '../../../../../../misc/types';

/**
 * Default options for 'TableHeaderContentRendererComponent'
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
    styleUrls: ['tableHeaderContentRenderer.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeaderContentRendererSAComponent<TData = unknown> extends HeaderContentRendererAbstractComponent<TData, TableHeaderContentRendererOptions>
{
    //######################### public properties - host #########################

    /**
     * Css class applied to header itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this.ɵoptions.cssClasses.thead;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options?: TableHeaderContentRendererOptions,)
    {
        super(pluginElement, gridPlugins, changeDetector, defaultOptions, options);
    }
}