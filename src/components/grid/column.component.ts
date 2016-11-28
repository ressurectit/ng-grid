import {Component, Input, ContentChild, TemplateRef, AfterContentInit} from '@angular/core';
import {ColumnTemplateContext} from './columnTemplate.context';

/**
 * Definition of column metadata
 */
@Component(
{
    selector: "ng2-grid > ng2-column",
    template: ''
})
export class ColumnComponent implements AfterContentInit
{
    //######################### public properties - inputs #########################
    
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
     * Indication whether should be title visible in header of table
     */
    @Input()
    public titleVisible: boolean = true;
    
    /**
     * Indication that this column can be used for ordering
     */
    @Input()
    public ordering: boolean = false;
    
    /**
     * Indication that this column is visible in grid
     */
    @Input()
    public visible: boolean = true;
    
    /**
     * Width as style string, value is exactly same (require units)
     */
    @Input()
    public width: string = null;
    
    /**
     * Css class that is applied to column header
     */
    @Input()
    public headerClass: string = null;
    
    /**
     * Css class that is applied to each column cell 
     */
    @Input()
    public cellClass: string = null;
    
    /**
     * Name of column group that is this column assigned to
     */
    @Input()
    public columnGroupName: string = null;

    /**
     * Indication that this column can be used for selection
     */
    @Input()
    public selectionVisible: boolean = true;
    
    //######################### public properties #########################
    
    /**
     * Template that is used for rendering of cell
     */
    @ContentChild(TemplateRef) 
    public template: TemplateRef<ColumnTemplateContext>;

    /**
     * Template that is used for rendering of cell header
     */
    @ContentChild('headerTemplate')
    public headerTemplate: TemplateRef<ColumnTemplateContext>;

    /**
     * Template that is used for rendering of cell body
     */
    @ContentChild('bodyTemplate')
    public bodyTemplate: TemplateRef<ColumnTemplateContext>;

    /**
     * Css class that is used for displaying current ordering
     */
    public orderingCssClass: string = "fa-sort";

    /**
     * Instance of template used for rendering body
     */
    public bodyTemplateInstance: TemplateRef<ColumnTemplateContext>;
    
    //######################### constructor #########################
    constructor()
    {
    }

    //######################### public methods - implementation of AfterContentInit #########################
    
    /**
     * Called when content was initialized
     */
    public ngAfterContentInit()
    {
        this.bodyTemplateInstance = this.template;

        if (this.bodyTemplate)
        {
            this.bodyTemplateInstance = this.bodyTemplate;
        }
    }
}
