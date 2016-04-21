import {Component, Input, ContentChild, TemplateRef} from 'angular2/core';
import utils from 'ng2-common/utils';

/**
 * Definition of column metadata
 */
@Component(
{
    selector: "ng2-grid > ng2-column",
    template: ''
})
export class ColumnComponent
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
    
    //######################### public properties #########################
    
    /**
     * Template that is used for rendering of cell
     */
    @ContentChild(TemplateRef) 
    public template: TemplateRef;
    
    /**
     * Css class that is used for displaying current ordering
     */
    public orderingCssClass: string = "fa-sort";
    
    //######################### constructor #########################
    constructor()
    {
    }
}
