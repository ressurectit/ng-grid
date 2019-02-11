import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

import {GroupedTableColumn} from "./groupedTable.interface";
import {BasicTableColumnComponent} from "../basicTable/basicTableColumn.component";

/**
 * Component for gathering information about grouped table column
 */
@Component(
{
    selector: 'grouped-table-metadata > grouped-table-column',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedTableColumnComponent<TData> extends BasicTableColumnComponent<TData> implements GroupedTableColumn
{
    //######################### public properties - inputs #########################

    /**
     * Id of group that identifies group in which will be this column displayed
     */
    @Input()
    public groupId?: string;
}