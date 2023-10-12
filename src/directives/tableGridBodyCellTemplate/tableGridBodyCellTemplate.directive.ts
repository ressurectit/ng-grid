import {Directive, TemplateRef} from '@angular/core';

import {DataCellTemplateContext} from '../../interfaces';

/**
 * Directive that is used for obtaining template for table grid body cell
 */
@Directive(
{
    selector: '[bodyCellTemplate]',
    standalone: true,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TableGridBodyCellTemplateSADirective<TColumnMetadata = any, TData = any>
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<DataCellTemplateContext<TColumnMetadata, TData>>)
    {
    }

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: TableGridBodyCellTemplateSADirective, _ctx: unknown): _ctx is DataCellTemplateContext
    {
        return true;
    }
}