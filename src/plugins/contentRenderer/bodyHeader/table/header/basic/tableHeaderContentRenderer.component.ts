import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from '@angular/core';
import {extend} from '@jscrpt/common';

import {TableHeaderContentRendererOptions} from '../../tableContentRenderer.interface';
import {HEADER_CONTENT_RENDERER_OPTIONS} from '../../../types';
import {HeaderContentRendererAbstractComponent} from '../../../headerContentRendererAbstract.component';
import {GRID_PLUGIN_INSTANCES} from '../../../../../components/grid/types';
import {GridPluginInstances} from '../../../../../components/grid';

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
    styleUrls: ['tableHeaderContentRenderer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeaderContentRendererComponent<TData = any> extends HeaderContentRendererAbstractComponent<TData, TableHeaderContentRendererOptions>
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
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: TableHeaderContentRendererOptions,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances)
    {
        super(pluginElement, gridPlugins, changeDetector);

        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }
}