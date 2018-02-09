import {Component, Input, OnInit, ViewContainerRef, TemplateRef} from '@angular/core';
import {ColumnTemplateLegacyContext} from './columnTemplate.context';
import {ColumnLegacyComponent} from './column.component';

/**
 * Renderer that is used for rendering column template
 */
@Component(
{
    selector: "ng-legacy-grid > column-template-renderer",
    template: ''
})
export class ColumnTemplateRendererLegacyComponent implements OnInit
{
    //######################### private fields #########################

    /**
     * Context fur current template
     */
    private _context: ColumnTemplateLegacyContext;

    /**
     * Row indexes of displayed items
     */
    private _rowIndexes: number[];

    //######################### public properties - inputs #########################

    /**
     * Column definition for currenttly rendered column
     */
    @Input()
    public column: ColumnLegacyComponent;

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
    public template: TemplateRef<ColumnTemplateLegacyContext>;

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
        this._context = new ColumnTemplateLegacyContext(this.rowData, this.column, this.currentIndex, this.rowIndexes);
        this._viewContainer.createEmbeddedView<ColumnTemplateLegacyContext>(this.template ? this.template : this.column.bodyTemplateInstance, this._context);
    }
}