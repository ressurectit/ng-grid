import {Component, Input} from '@angular/core';

/**
 * Definition of column group metadata
 */
@Component(
{
    selector: "ng2-grid > ng2-columnGroup, ng2-columnGroup > ng2-columnGroup",
    template: ''
})
export class ColumnGroupComponent
{
    //######################### public properties - inputs #########################
    
    /**
     * Name of column group
     */
    @Input() 
    public name: string;
    
    /**
     * Title of column group that is displayed
     */
    @Input() 
    public title: string;
    
    /**
     * Css class that is applied to column group
     */
    @Input()
    public cssClass: string;
    
    //######################### public properties #########################
    
    /**
     * Colspan indicating how many columns should be grouped
     */
    public colSpan: number = 0;
    
    //######################### constructor #########################
    constructor()
    {
    }
}
