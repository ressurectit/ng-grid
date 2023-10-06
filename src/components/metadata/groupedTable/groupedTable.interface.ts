import {TemplateRef} from '@angular/core';

import {GridColumn} from '../metadata.interface';
import {TableGridMetadata} from '../../tableGridMetadataGatherer/tableGridMetadataGatherer.interface';
import {HeaderTableGroupContext} from '../types';

/**
 * Represents information about column that is inside of group
 */
export interface HeaderTableGroupColumn
{
    /**
     * Unique identification of column, reference to 'id' of column
     */
    id: string;
}

/**
 * Represents information about group that is used as header group
 */
export interface HeaderTableGroup
{
    /**
     * Title for column group, text that is displayed
     */
    title: string;
    
    /**
     * Indication whether is title for group visible, or not
     */
    titleVisible: boolean;

    /**
     * Css class applied to group
     */
    cssClass: string;
    
    /**
     * Template that is used for rendering of this group
     */
    template: TemplateRef<HeaderTableGroupContext>;

    /**
     * Array of nested groups in this group
     */
    readonly groups: HeaderTableGroup[];

    /**
     * Array of columns that are in this group (also recursive columns)
     */
    readonly columns: HeaderTableGroupColumn[];
    
    /**
     * Gets group context for current group
     */
    readonly groupContext: HeaderTableGroupContext;
}

/**
 * Grouped table metadata, contains columns and metadata for column groups
 */
export interface GroupedTableMetadata<TColumn extends GridColumn = any> extends TableGridMetadata<TColumn>
{
    /**
     * Definition of header groups that are displayed in header
     */
    groups: HeaderTableGroup[];
}