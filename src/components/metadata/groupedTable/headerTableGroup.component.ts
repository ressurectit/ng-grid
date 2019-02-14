import {Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild, ContentChildren, QueryList} from "@angular/core";

import {HeaderTableGroup, HeaderTableGroupColumn} from "./groupedTable.interface";
import {HeaderTableGroupContext} from "./headerTableGroup.context";
import {HeaderTableGroupColumnComponent} from "./headerTableGroupColumn.component";

/**
 * Component for gathering information about table group
 */
@Component(
{
    selector: 'grouped-table-metadata table-group',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderTableGroupComponent implements HeaderTableGroup
{
    //######################### private fields #########################

    /**
     * Array of columns that are displayed
     */
    private _columns: HeaderTableGroupColumn[] = [];

    //######################### public properties #########################

    /**
     * Gets group context for current group
     */
    public get groupContext(): HeaderTableGroupContext
    {
        return new HeaderTableGroupContext(this);
    }

    /**
     * Content of current group, can contain nested groups or columns
     */
    public get groups(): HeaderTableGroup[]
    {
        return this.groupsChildren.toArray();
    }

    /**
     * Array of columns that are in this group (also recursive columns)
     */
    public get columns(): HeaderTableGroupColumn[]
    {
        if(this._columns)
        {
            return this._columns;
        }
        
        if(this.columnsChildren.length)
        {
            this._columns = this.columnsChildren.toArray();
        }

        if(this.groupsChildren.length && !this.columnsChildren.length)
        {
            let groups = this.groupsChildren.toArray();
            
            this._columns = groups.reduce((acc, x) => acc.concat(x.columns), []);
        }

        return this._columns || [];
    }

    //######################### public properties - inputs #########################

    /**
     * Title for column group, text that is displayed
     */
    @Input()
    public title: string;

    /**
     * Indication whether is title for group visible, or not
     */
    @Input()
    public titleVisible: boolean;

    /**
     * Css class applied to group
     */
    @Input()
    public cssClass: string;

    //######################### public properties - children #########################

    /**
     * Array of gathered nested columns
     * @internal
     */
    @ContentChildren(HeaderTableGroupComponent)
    public groupsChildren: QueryList<HeaderTableGroup>;

    /**
     * Array of gathered columns
     * @internal
     */
    @ContentChildren(HeaderTableGroupColumnComponent)
    public columnsChildren: QueryList<HeaderTableGroupColumn>;

    /**
     * Template that is used for rendering of this group
     */
    @ContentChild(TemplateRef)
    public template: TemplateRef<HeaderTableGroupContext>;
}