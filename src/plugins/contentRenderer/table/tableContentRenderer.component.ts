import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, HostBinding, forwardRef, ElementRef} from '@angular/core';
import {extend} from '@jscrpt/common';

import {TableContentRendererOptions} from './tableContentRenderer.interface';
import {GridPluginInstances} from '../../../components/grid';
import {GRID_PLUGIN_INSTANCES} from '../../../components/grid/types';
import {CONTENT_RENDERER_OPTIONS} from '../types';
import {PluginDescription} from '../../../misc';
import {TableBodyContentRendererComponent} from './body/basic/tableBodyContentRenderer.component';
import {TableHeaderContentRendererComponent} from './header/basic/tableHeaderContentRenderer.component';
import {ContentRendererAbstractComponent} from '../contentRendererAbstract.component';
import {BodyContentRenderer, HeaderContentRenderer} from '../contentRenderer.interface';
import {GatheredMetadata} from '../../../components/metadata';

/**
 * Default options for 'TableContentRendererComponent'
 * @internal
 */
const defaultOptions: TableContentRendererOptions =
{
    cssClasses:
    {
        table: 'table table-condensed table-striped table-hover',
        containerDiv: 'table-container'
    },
    plugins:
    {
        bodyRenderer: <PluginDescription<BodyContentRenderer>>
        {
            type: forwardRef(() => TableBodyContentRendererComponent)
        },
        headerRenderer: <PluginDescription<HeaderContentRenderer>>
        {
            type: forwardRef(() => TableHeaderContentRendererComponent)
        }
    }
};

/**
 * Component used for 'TableContentRendererComponent'
 */
@Component(
{
    selector: 'div.table-content-renderer',
    templateUrl: 'tableContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContentRendererComponent<TOrdering = any, TData = any, TMetadata extends GatheredMetadata = any> extends ContentRendererAbstractComponent<TOrdering, TData, TMetadata, TableContentRendererOptions> implements OnDestroy
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public override get cssClass(): string
    {
        return this._options.cssClasses.containerDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: TableContentRendererOptions)
    {
        super(pluginElement, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }
}