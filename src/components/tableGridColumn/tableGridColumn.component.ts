import {Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild} from '@angular/core';

import {TableGridColumn} from '../../interfaces';
import {TableGridBodyCellTemplateSADirective, TableGridCellTemplateContext, TableGridHeaderCellTemplateSADirective} from '../../directives';

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
    //######################### public properties - implementation of TableGridColumn #########################

    /**
     * @inheritdoc
     */
    @Input({required: true})
    public id!: string;

    /**
     * @inheritdoc
     */
    @Input()
    public name: string|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public title: string|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public headerTooltip: string|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public titleVisible: boolean = true;

    /**
     * @inheritdoc
     */
    @Input()
    public ordering: boolean|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public visible: boolean = true;

    /**
     * @inheritdoc
     */
    @Input()
    public width: string|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public headerClass: string|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public cellClass: string|undefined|null;

    /**
     * @inheritdoc
     */
    public get headerTemplate(): TemplateRef<TableGridCellTemplateContext<TData>>|undefined|null
    {
        return this.headerTemplateNew ?? this.headerTemplateLegacy;
    }

    /**
     * @inheritdoc
     */
    public get bodyTemplate(): TemplateRef<TableGridCellTemplateContext<TData>>|undefined|null
    {
        return this.bodyTemplateNew ?? this.bodyTemplateLegacy;
    }

    //######################### protected properties - children #########################

    /**
     * Template that is used for rendering of cell header, legacy syntax
     */
    @ContentChild('headerTemplate')
    protected headerTemplateLegacy: TemplateRef<TableGridCellTemplateContext<TData>>|undefined|null;

    /**
     * Template that is used for rendering of cell body, legacy syntax
     */
    @ContentChild('bodyTemplate')
    protected bodyTemplateLegacy: TemplateRef<TableGridCellTemplateContext<TData>>|undefined|null;

    /**
     * Template that is used for rendering of cell header, new syntax
     */
    @ContentChild(TableGridHeaderCellTemplateSADirective, {read: TemplateRef<TableGridCellTemplateContext<TData>>})
    protected headerTemplateNew: TemplateRef<TableGridCellTemplateContext<TData>>|undefined|null;

    /**
     * Template that is used for rendering of cell body, new syntax
     */
    @ContentChild(TableGridBodyCellTemplateSADirective, {read: TemplateRef<TableGridCellTemplateContext<TData>>})
    protected bodyTemplateNew: TemplateRef<TableGridCellTemplateContext<TData>>|undefined|null;
}