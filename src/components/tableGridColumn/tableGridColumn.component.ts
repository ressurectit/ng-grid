import {Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild} from '@angular/core';

import {TableGridColumn, TableGridColumnTemplateContext} from '../../interfaces';

/**
 * Component for gathering information about table grid column
 */
@Component(
{
    selector: 'basic-table-column, table-column',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableGridColumnSAComponent<TData = unknown> implements TableGridColumn<TData>
{
    //######################### public properties - inputs #########################
    /**
     * Unique identifier of column
     */
    @Input({required: true})
    public id!: string;

    /**
     * Name of property which is assigned to this column
     */
    @Input()
    public name: string|undefined|null;

    /**
     * Title of column that is displayed in grid header
     */
    @Input()
    public title: string|undefined|null;

    /**
     * Text that is displayed in tooltip over grid header
     */
    @Input()
    public headerTooltip: string|undefined|null;

    /**
     * Indication whether should be title visible in header
     */
    @Input()
    public titleVisible: boolean = true;

    /**
     * Indication that this column can be used for ordering
     */
    @Input()
    public ordering: boolean|undefined|null;

    /**
     * Indication that this column is visible in grid
     */
    @Input()
    public visible: boolean = true;

    /**
     * Width as style string, value is exactly same (require units)
     */
    @Input()
    public width: string|undefined|null;

    /**
     * Css class that is applied to column header
     */
    @Input()
    public headerClass: string|undefined|null;

    /**
     * Css class that is applied to each column cell
     */
    @Input()
    public cellClass: string|undefined|null;

    //######################### public properties - children #########################

    /**
     * Template that is used for rendering of cell header
     */
    @ContentChild('headerTemplate')
    public headerTemplate: TemplateRef<TableGridColumnTemplateContext<TData>>|undefined|null;

    /**
     * Template that is used for rendering of cell body
     */
    @ContentChild('bodyTemplate')
    public bodyTemplate: TemplateRef<TableGridColumnTemplateContext<TData>>|undefined|null;
}