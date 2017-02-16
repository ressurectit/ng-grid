import {Component, Input, OnInit, ViewContainerRef, TemplateRef} from '@angular/core';
import {ColumnTemplateContext} from './columnTemplate.context';
import {ColumnComponent} from './column.component';

/**
 * Renderer that is used for rendering column template
 */
@Component(
{
    selector: "ng-grid > column-template-renderer",
    template: ''
})
export class ColumnTemplateRendererComponent implements OnInit
{
    //######################### private fields #########################

    /**
     * Context fur current template
     */
    private _context: ColumnTemplateContext;

    /**
     * Row indexes of displayed items
     */
    private _rowIndexes: number[];

    //######################### public properties - inputs #########################

    /**
     * Column definition for currenttly rendered column
     */
    @Input()
    public column: ColumnComponent;

    /**
     * Data to be used for rendering
     */
    @Input()
    public rowData: any;

    /**
     * Index of currently rendered item
     */
    @Input()
    public currentIndex: number;

    /**
     * Template that is used to render content
     */
    @Input()
    public template: TemplateRef<ColumnTemplateContext>;

    /**
     * Row indexes of displayed items
     */
    @Input()
    public set rowIndexes(indexes: number[])
    {
        this._rowIndexes = indexes;

        if(this._context)
        {
            this._context.rowIndexes = indexes;
        }
    }
    public get rowIndexes(): number[]
    {
        return this._rowIndexes;
    }

    //######################### constructor #########################
    constructor(private _viewContainer: ViewContainerRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._context = new ColumnTemplateContext(this.rowData, this.column, this.currentIndex, this.rowIndexes);
        let view = this._viewContainer.createEmbeddedView<ColumnTemplateContext>(this.template ? this.template : this.column.bodyTemplateInstance, this._context);
    }
}