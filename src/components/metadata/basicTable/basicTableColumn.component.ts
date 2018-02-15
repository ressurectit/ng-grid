import {Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild} from "@angular/core";

import {BasicTableColumn} from "./basicTable.interface";
import {BasicTableColumnContext} from "./basicTableColumn.context";

/**
 * Component for gathering information about basic table column
 */
@Component(
{
    selector: 'basic-table-metadata > basic-table-column',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTableColumnComponent<TData> implements BasicTableColumn<TData>
{
    //######################### public properties - inputs #########################
    /**
     * Unique identifier of column
     */
    @Input()
    public id: string;

    /**
     * Name of property which is assigned to this column
     */
    @Input()
    public name: string;

    /**
     * Title of column that is displayed in grid header
     */
    @Input()
    public title: string;

    /**
     * Text that is displayed in tooltip over grid header
     */
    @Input()
    public headerTooltip: string;

    /**
     * Indication whether should be title visible in header
     */
    @Input()
    public titleVisible: boolean = true;

    /**
     * Indication that this column can be used for ordering
     */
    @Input()
    public ordering: boolean;

    /**
     * Indication that this column is visible in grid
     */
    @Input()
    public visible: boolean = true;

    /**
     * Width as style string, value is exactly same (require units)
     */
    @Input()
    public width: string;

    /**
     * Css class that is applied to column header
     */
    @Input()
    public headerClass: string;

    /**
     * Css class that is applied to each column cell
     */
    @Input()
    public cellClass: string;

    //######################### public properties - children #########################

    /**
     * Template that is used for rendering of cell header
     */
    @ContentChild('headerTemplate')
    public headerTemplate: TemplateRef<BasicTableColumnContext<TData>>;

    /**
     * Template that is used for rendering of cell body
     */
    @ContentChild('bodyTemplate')
    public bodyTemplate: TemplateRef<BasicTableColumnContext<TData>>;

    //######################### public methods - helper #########################

    /**
     * Gets basic table column context
     */
    public getColumnContext(data: TData, column: BasicTableColumn<TData>, index: number, startingIndex: number): BasicTableColumnContext<TData>
    {
        return new BasicTableColumnContext(data, column, index, startingIndex);
    }
}