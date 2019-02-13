import {Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild, ContentChildren, QueryList, ExistingProvider, forwardRef} from "@angular/core";
import {isPresent} from "@anglr/common";

import {HeaderTableGroup, HeaderTableGroupColumn, HEADER_GROUP, GroupedTableColumn} from "./groupedTable.interface";
import {HeaderTableGroupContext} from "./headerTableGroup.context";

//TODO - think of some caching, to eliminate too much iterations on each change of columns

/**
 * Component for gathering information about table group
 */
@Component(
{
    selector: 'grouped-table-metadata table-group',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:
    [
        <ExistingProvider>
        {
            provide: HEADER_GROUP,
            useExisting: forwardRef(() => HeaderTableGroupComponent),
            multi: true
        }
    ]
})
export class HeaderTableGroupComponent implements HeaderTableGroup
{
    //######################### private fields #########################

    /**
     * Content of current group, can contain nested groups or columns
     */
    private _content: Array<HeaderTableGroup|HeaderTableGroupColumn> = null;

    /**
     * Array of columns that are displayed
     */
    private _columns: GroupedTableColumn[];

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

        this._size = this.content
            .filter(itm => !itm.isColumn || this._columns.find(col => col.id == itm.id))
            .map(itm => itm.size)
            .reduce((acc, val) => acc + val);

        return this._size;
    }

    /**
     * Content of current group, can contain nested groups or columns
     */
    public get content(): Array<HeaderTableGroup|HeaderTableGroupColumn>
    {
        if(this._content)
        {
            return this._content;
        }

        return this.groupsColumns.toArray();
    }

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
    public groupsColumns: QueryList<HeaderTableGroup|HeaderTableGroupColumn>;

    /**
     * Template that is used for rendering of this group
     */
    @ContentChild(TemplateRef)
    public template: TemplateRef<HeaderTableGroupContext>;

    //######################### public methods #########################

    /**
     * Sets array of grid columns that are currently displayed
     * @param columns Array of columns that are currently loaded from gatherer
     */
    public setDisplayedGridColumns(columns: GroupedTableColumn[]): void
    {
        this._size = null;
        this._columns = columns;

        //no content defined that means column group mapping was specified in columns
        if(!this.groupsColumns.length)
        {
            this._content = [];

            columns.forEach(column =>
            {
                if(column.groupId == this.id && column.visible)
                {
                    this._content.push(
                    {
                        id: column.id,
                        visible: column.visible,
                        size: 1,
                        isColumn: true
                    });
                }
            });
        }
        else
        {
            this.groupsColumns.forEach((itm: HeaderTableGroup) =>
            {
                if(!itm.isColumn)
                {
                    itm.setDisplayedGridColumns(columns);
                }
            });
        }
    }
}