import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableBodyContentRendererOptions} from '../../tableContentRenderer.interface';
import {BodyContentRendererAbstractComponent} from '../../../bodyContentRendererAbstract.component';
import {TableGridMetadata} from '../../../../../../components/tableGridMetadataGatherer/tableGridMetadataGatherer.interface';
import {TableGridColumn} from '../../../../../../interfaces';
import {BODY_CONTENT_RENDERER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../../../../misc/tokens';
import {GridPluginInstances} from '../../../../../../misc/types';
import {DataCellContextSAPipe, ReadValueSAPipe} from '../../../../../../pipes';
import {provideDataCellContextFactoryFn} from '../../../../../../misc/providers';
import {dataCellContextFactory} from '../../../../../../misc/utils';

/**
 * Default options for 'TableBodyContentRendererComponent'
 */
const defaultOptions: TableBodyContentRendererOptions =
{
    rowClick: null,
    rowCssClass: null,
    cssClasses: {},
};

/**
 * Component used for rendering tbody for 'TableContentRenderer'
 */
@Component(
{
    selector: 'tbody.content-renderer',
    templateUrl: 'tableBodyContentRenderer.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        ReadValueSAPipe,
        DataCellContextSAPipe,
    ],
    providers:
    [
        provideDataCellContextFactoryFn(dataCellContextFactory),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableBodyContentRendererSAComponent<TData = unknown> extends BodyContentRendererAbstractComponent<TData, unknown, TableBodyContentRendererOptions<TData>, TableGridMetadata<TableGridColumn<TData>>>
{
    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: TableBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);
    }
}