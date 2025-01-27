import {Directive, TemplateRef} from '@angular/core';

import {DataCellTemplateContext, TableGridColumn} from '../../interfaces';

/**
 * Directive that is used for obtaining template for table grid body cell
 */
@Directive(
{
    selector: '[bodyCellTemplate]',
})
export class TableGridBodyCellTemplateDirective<TColumnMetadata = unknown, TData = unknown>
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<DataCellTemplateContext<TColumnMetadata, TData>>)
    {
    }

    //######################### ng language server #########################

    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: TableGridBodyCellTemplateDirective, _ctx: unknown): _ctx is DataCellTemplateContext<TableGridColumn<any>, any>
    {
        return true;
    }
}