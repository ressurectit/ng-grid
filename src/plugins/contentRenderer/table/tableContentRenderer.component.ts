import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, HostBinding, forwardRef, ElementRef} from "@angular/core";
import {Utils} from "@anglr/common";

import {TableContentRendererOptions} from "./tableContentRenderer.interface";
import {GRID_PLUGIN_INSTANCES, GridPluginInstances} from "../../../components/grid";
import {CONTENT_RENDERER_OPTIONS} from "../contentRenderer.interface";
import {PluginDescription} from "../../../misc";
import {TableBodyContentRendererComponent} from './body/basic/tableBodyContentRenderer.component';
import {TableHeaderContentRendererComponent} from "./header/tableHeaderContentRenderer.component";
import {ContentRendererAbstractComponent} from "../contentRendererAbstract.component";

/**
 * Default options for 'TableContentRendererComponent'
 */
const defaultOptions: TableContentRendererOptions =
{
    cssClasses:
    {
        table: 'table table-condensed table-striped table-hover'
    },
    plugins:
    {
        bodyRenderer: <PluginDescription<TableBodyContentRendererComponent<any>>>
        {
            type: forwardRef(() => TableBodyContentRendererComponent)
        },
        headerRenderer: <PluginDescription<TableHeaderContentRendererComponent<any>>>
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
    selector: 'table.content-renderer',
    templateUrl: 'tableContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContentRendererComponent<TOrdering, TData, TMetadata> extends ContentRendererAbstractComponent<TOrdering, TData, TMetadata, TableContentRendererOptions> implements OnDestroy
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.table;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                @Inject(GRID_PLUGIN_INSTANCES) gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: TableContentRendererOptions)
    {
        super(pluginElement, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }
}