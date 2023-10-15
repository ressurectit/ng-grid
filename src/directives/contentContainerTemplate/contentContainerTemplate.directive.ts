import {Directive, TemplateRef, inject} from '@angular/core';

import {GridContext} from '../../interfaces';

/**
 * Directive used for obtaining template for grid content renderer content (body) container
 */
@Directive(
{
    selector: '[contentContainerTemplate]',
    standalone: true,
})
export class ContentContainerTemplateSADirective
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
    static ngTemplateContextGuard(_dir: ContentContainerTemplateSADirective, _ctx: unknown): _ctx is GridContext<any>
    {
        return true;
    }
}