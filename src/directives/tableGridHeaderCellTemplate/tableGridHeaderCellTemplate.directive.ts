import {Directive, TemplateRef} from '@angular/core';

import {CellTemplateContext, TableGridColumn} from '../../interfaces';

/**
 * Directive that is used for obtaining template for table grid header cell
 */
@Directive(
{
    selector: '[headerCellTemplate]',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TableGridHeaderCellTemplateDirective<TColumnMetadata = any>
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<CellTemplateContext<TColumnMetadata>>)
    {
    }

    //######################### ng language server #########################

    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: TableGridHeaderCellTemplateDirective, _ctx: unknown): _ctx is CellTemplateContext<TableGridColumn<any>>
    {
        return true;
    }
}
