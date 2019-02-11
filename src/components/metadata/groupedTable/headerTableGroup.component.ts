import {Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild, ContentChildren, QueryList} from "@angular/core";
import {isPresent} from "@anglr/common";

import {HeaderTableGroup, HeaderTableGroupColumn, HEADER_GROUP} from "./groupedTable.interface";
import {HeaderTableGroupContext} from "./headerTableGroup.context";

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
     * Computed number of current columns in this group
     */
    private _size?: number = null;

    //######################### public properties #########################
    
    /**
     * Indication whether are these metadata for group or group column
     */
    public get isColumn(): boolean
    {
        return false;
    }

    /**
     * Gets group context for current group
     */
    public get groupContext(): HeaderTableGroupContext
    {
        return new HeaderTableGroupContext(this);
    }

    /**
     * Gets current number of columns in this group, used for rendering
     */
    public get size(): number
    {
        if(isPresent(this._size))
        {
            return this._size;   
        }

        this._size = this.content.map(itm => itm.size).reduce((acc, val) => acc + val);

        return this._size;
    }

    /**
     * Content of current group, can contain nested groups or columns
     */
    public content: Array<HeaderTableGroup|HeaderTableGroupColumn>;

    //######################### public properties - inputs #########################

    /**
     * Unique identification of group
     */
    @Input()
    public id: string;

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

    //######################### public properties - children #########################

    /**
     * Metadata gatherer instance
     * @internal
     */
    @ContentChildren(HEADER_GROUP)
    public metadataGatherer: QueryList<HeaderTableGroup|HeaderTableGroupColumn>;

    /**
     * Template that is used for rendering of this group
     */
    @ContentChild(TemplateRef)
    public template: TemplateRef<HeaderTableGroupContext>;
}