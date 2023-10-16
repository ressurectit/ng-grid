import {Directive, TemplateRef, inject} from '@angular/core';

import {GridRowContext} from '../../interfaces';

/**
 * Directive used for obtaining template for grid content renderer header row container
 */
@Directive(
{
    selector: '[headerRowContainerTemplate]',
    standalone: true,
})
export class HeaderRowContainerTemplateSADirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridRowContext> = inject(TemplateRef<GridRowContext>);

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: HeaderRowContainerTemplateSADirective, _ctx: unknown): _ctx is GridRowContext<any>
    {
        return true;
    }
}