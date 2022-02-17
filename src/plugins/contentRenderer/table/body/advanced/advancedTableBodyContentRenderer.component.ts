import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, ElementRef} from '@angular/core';
import {extend} from '@jscrpt/common';

import {BasicTableColumn, BasicTableMetadata} from '../../../../../components/metadata';
import {GridPluginInstances} from '../../../../../components/grid';
import {GRID_PLUGIN_INSTANCES} from '../../../../../components/grid/types';
import {BODY_CONTENT_RENDERER_OPTIONS} from '../../../types';
import {BodyContentRendererAbstractComponent} from '../../../bodyContentRendererAbstract.component';
import {RowSelector} from '../../../../rowSelector';
import {ROW_SELECTOR} from '../../../../rowSelector/types';
import {BasicTableColumnSelectableContext} from './basicTableColumnSelectable.context';
import {AdvancedTableBodyContentRendererOptions} from './advancedTableBodyContentRenderer.interface';

/**
 * Default options for 'AdvancedTableBodyContentRendererComponent'
 * @internal
 */
const defaultOptions: AdvancedTableBodyContentRendererOptions =
{
    rowCssClass: () => null
};

/**
 * Component used for rendering tbody for 'TableContentRenderer' advanced
 */
@Component(
{
    selector: 'tbody.content-renderer-advanced',
    templateUrl: 'advancedTableBodyContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedTableBodyContentRendererComponent<TData = any> extends BodyContentRendererAbstractComponent<TData, AdvancedTableBodyContentRendererOptions<TData>, BasicTableMetadata<BasicTableColumn<TData>>>
{
    //######################### protected fields #########################

    /**
     * Currently used row selector
     */
    protected _rowSelector: RowSelector<any, any, TData>;

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: AdvancedTableBodyContentRendererOptions<TData>)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - template bindings #########################

    /**
     * Gets basic table column context
     */
    public getColumnContext(data: TData, column: BasicTableColumn<TData>, index: number, startingIndex: number): BasicTableColumnSelectableContext<TData>
    {
        return new BasicTableColumnSelectableContext(data, column, index, startingIndex, this._rowSelector);
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
     * Initialize plugin, to be ready to use
     */
    public override initialize()
    {
        super.initialize();

        const rowSelector: RowSelector<any, any, TData> = this.gridPlugins[ROW_SELECTOR] as RowSelector<any, any, TData>;

        if(this._rowSelector && this._rowSelector != rowSelector)
        {
            this._rowSelector = null;
        }

        if(!this._rowSelector)
        {
            this._rowSelector = rowSelector;
        }
    }
}