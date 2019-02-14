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
    //######################### public properties - inputs #########################

    /**
     * Unique identification of column, reference to 'id' of column
     */
    @Input()
    public id: string;
}