import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

import {HeaderTableGroupColumn} from "./groupedTable.interface";

/**
 * Component for gathering information about table group column
 */
@Component(
{
    selector: 'table-group > table-group-column',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderTableGroupColumnComponent implements HeaderTableGroupColumn
{
    //######################### public properties #########################

    /**
     * Indication whether is column in this group visible or not
     */
    public visible: boolean;

    /**
     * Indication whether are these metadata for group or group column
     */
    public get isColumn(): boolean
    {
        return true;
    }

    /**
     * Gets current number of 'columns' in group, since this is column, always returns 1
     */
    public get size(): number
    {
        return 1;
    }

    //######################### public properties - inputs #########################

    /**
     * Unique identification of column, reference to 'id'
     */
    @Input()
    public id: string;
}