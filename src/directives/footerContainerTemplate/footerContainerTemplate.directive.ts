import {Directive, TemplateRef, inject} from '@angular/core';

import {GridContext} from '../../interfaces';

/**
 * Directive used for obtaining template for grid content renderer footer container
 */
@Directive(
{
    selector: '[footerContainerTemplate]',
    standalone: true,
})
export class FooterContainerTemplateSADirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridContext> = inject(TemplateRef<GridContext>);

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: FooterContainerTemplateSADirective, _ctx: unknown): _ctx is GridContext<any>
    {
        return true;
    }
}