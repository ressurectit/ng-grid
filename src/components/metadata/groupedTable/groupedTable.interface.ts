import {TemplateRef} from "@angular/core";

import {GridColumn} from "../metadata.interface";
import {BasicTableMetadata} from "../basicTable/basicTable.interface";
import {HeaderTableGroupContext} from "./headerTableGroup.context";

/**
 * Represents information about column that is inside of group
 */
export interface HeaderTableGroupColumn
{
    /**
     * Indication whether are these metadata for group or group column
     */
    readonly isColumn: boolean;

    /**
     * Unique identification of column, reference to 'id'
     */
    id: string;

    /**
     * Indication whether is column in this group visible or not
     */
    visible: boolean;

    /**
     * Gets current number of 'columns' in group, since this is column, always returns 1
     */
    readonly size: number;
}

/**
 * Represents information about group that is used as header group
 */
export interface HeaderTableGroup
{
    /**
     * Indication whether are these metadata for group or group column
     */
    readonly isColumn: boolean;

    /**
     * Content of current group, can contain nested groups or columns
     */
    readonly content: Array<HeaderTableGroup|HeaderTableGroupColumn>;

    /**
     * Unique identification of group
     */
    id: string;

    /**
     * Title for column group, text that is displayed
     */
    title: string;

    /**
     * Indication whether is title for group visible, or not
     */
    titleVisible: boolean;

    /**
     * Template that is used for rendering of this group
     */
    template: TemplateRef<HeaderTableGroupContext>;

    /**
     * Gets current number of columns in this group, used for rendering
     */
    readonly size: number;

    /**
     * Gets group context for current group
     */
    readonly groupContext: HeaderTableGroupContext;

    /**
     * Sets array of grid columns that are currently displayed
     * @param columns Array of columns that are currently loaded from gatherer
     */
    setDisplayedGridColumns(columns: GroupedTableColumn[]): void;
}

/**
 * Grouped table column definition, used for creating table with grouped column header
 */
export interface GroupedTableColumn extends GridColumn
{
    /**
     * Id of group that identifies group in which will be this column displayed
     */
    groupId?: string;
}

/**
 * Grouped table metadata, contains columns and metadata for column groups
 */
export interface GroupedTableMetadata<TColumn extends GroupedTableColumn> extends BasicTableMetadata<TColumn>
{
    /**
     * Definition of header groups that are displayed in header
     */
    groups: HeaderTableGroup[];
}

/**
 * Token for getting component that is used as header table group
 */
export class HEADER_GROUP
{
}