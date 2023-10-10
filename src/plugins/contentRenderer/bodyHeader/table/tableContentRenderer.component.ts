import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, HostBinding, forwardRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonDynamicModule} from '@anglr/common';

import {TableContentRendererOptions} from './tableContentRenderer.interface';
import {BodyHeaderContentRendererAbstractComponent} from '../bodyHeaderContentRendererAbstract.component';
import {GridMetadata} from '../../../../interfaces';
import {CONTENT_RENDERER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../../misc/tokens';
import {GridPluginInstances} from '../../../../misc/types';
import {TableBodyContentRendererSAComponent} from './body/basic/tableBodyContentRenderer.component';
import {TableHeaderContentRendererSAComponent} from './header/basic/tableHeaderContentRenderer.component';

/**
 * Default options for 'TableContentRendererComponent'
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
        bodyRenderer:
        {
            type: forwardRef(() => TableBodyContentRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        headerRenderer:
        {
            type: forwardRef(() => TableHeaderContentRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
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
    standalone: true,
    imports:
    [
        CommonModule,
        CommonDynamicModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContentRendererSAComponent<TOrdering = unknown, TData = unknown, TMetadata extends GridMetadata = GridMetadata> extends BodyHeaderContentRendererAbstractComponent<TOrdering, TData, TMetadata, TableContentRendererOptions> implements OnDestroy
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public override get cssClass(): string
    {
        return this.ɵoptions.cssClasses.containerDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: TableContentRendererOptions)
    {
        super(pluginElement, gridPlugins, defaultOptions, options);
    }
}