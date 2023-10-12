import {Directive, TemplateRef} from '@angular/core';

import {CellTemplateContext} from '../../interfaces';


/**
 * Directive that is used for obtaining template for table grid header cell
 */
@Directive(
{
    selector: '[headerCellTemplate]',
    standalone: true,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TableGridHeaderCellTemplateSADirective<TColumnMetadata = any>
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<CellTemplateContext<TColumnMetadata>>)
    {
    }

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: TableGridHeaderCellTemplateSADirective, _ctx: unknown): _ctx is CellTemplateContext
    {
        return true;
    }
}