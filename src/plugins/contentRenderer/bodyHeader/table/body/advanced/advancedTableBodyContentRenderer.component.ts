import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BodyContentRendererAbstractComponent} from '../../../bodyContentRendererAbstract.component';
import {AdvancedTableBodyContentRendererOptions} from './advancedTableBodyContentRenderer.interface';
import {TableGridMetadata} from '../../../../../../components/tableGridMetadataGatherer/tableGridMetadataGatherer.interface';
import {RowSelector, TableGridColumn} from '../../../../../../interfaces';
import {BODY_CONTENT_RENDERER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../../../../misc/tokens';
import {GridPluginInstances} from '../../../../../../misc/types';
import {GridPluginType} from '../../../../../../misc/enums';
import {TableGridCellTemplateContext} from '../../../../../../directives/tableGridCellTemplate/tableGridCellTemplate.context';
import {ReadValueSAPipe} from '../../../../../../pipes';

/**
 * Default options for 'AdvancedTableBodyContentRendererComponent'
 */
const defaultOptions: AdvancedTableBodyContentRendererOptions =
{
    cssClasses: {}
};

/**
 * Component used for rendering tbody for 'TableContentRenderer' advanced
 */
@Component(
{
    selector: 'tbody.content-renderer-advanced',
    templateUrl: 'advancedTableBodyContentRenderer.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        ReadValueSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedTableBodyContentRendererSAComponent<TData = unknown> extends BodyContentRendererAbstractComponent<TData, unknown, AdvancedTableBodyContentRendererOptions<TData>, TableGridMetadata<TableGridColumn<TData>>>
{
    //######################### protected fields #########################

    /**
     * Currently used row selector
     */
    protected rowSelector: RowSelector<unknown, unknown, TData>|undefined|null;

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: AdvancedTableBodyContentRendererOptions<TData>)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);
    }

    //######################### public methods - template bindings #########################

    /**
     * Gets basic table column context
     */
    public getColumnContext(data: TData, column: TableGridColumn<TData>, index: number, startingIndex: number): TableGridCellTemplateContext<TData>
    {
        return {
            $implicit: data,
            column,
            index,
            startingIndex,
            rowIndex: 0 //TODO: calculate
        };
    }

    /**
     * Handles click to row
     * @param data - Data of row that was clicked
     * @param index - Index of clicked row
     */
    public rowClick(data: TData, index: number)
    {
        if(this.options.rowClick)
        {
            this.options.rowClick(data, index);
        }
    }

    //######################### public methods - implementation of BodyContentRenderer #########################

    /**
     * @inheritdoc
     */
    public override initialize(force: boolean): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('AdvancedTableBodyContentRendererSAComponent: missing gridPlugins!');
        }

        super.initialize(force);

        const rowSelector: RowSelector<unknown, unknown, TData> = this.gridPlugins[GridPluginType.RowSelector] as RowSelector<unknown, unknown, TData>;

        if(force || (this.rowSelector && this.rowSelector != rowSelector))
        {
            this.rowSelector = null;
        }

        if(!this.rowSelector)
        {
            this.rowSelector = rowSelector;
        }
    }
}