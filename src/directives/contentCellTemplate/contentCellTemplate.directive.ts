import {Directive, TemplateRef, inject} from '@angular/core';

import {GridDataCellContext} from '../../interfaces';

/**
 * Directive used for obtaining template for content cell
 */
@Directive(
{
    selector: '[contentCellTemplate]',
    standalone: true,
})
export class ContentCellTemplateSADirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridDataCellContext> = inject(TemplateRef<GridDataCellContext>);

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: ContentCellTemplateSADirective, _ctx: unknown): _ctx is GridDataCellContext<any>
    {
        return true;
    }
}