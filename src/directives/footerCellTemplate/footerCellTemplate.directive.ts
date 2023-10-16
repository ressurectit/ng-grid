import {Directive, TemplateRef, inject} from '@angular/core';

import {GridCellContext} from '../../interfaces';

/**
 * Directive used for obtaining template for footer cell
 */
@Directive(
{
    selector: '[footerCellTemplate]',
    standalone: true,
})
export class FooterCellTemplateSADirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridCellContext> = inject(TemplateRef<GridCellContext>);

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: FooterCellTemplateSADirective, _ctx: unknown): _ctx is GridCellContext<any>
    {
        return true;
    }
}