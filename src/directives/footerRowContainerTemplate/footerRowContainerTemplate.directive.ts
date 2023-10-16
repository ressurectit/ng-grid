import {Directive, TemplateRef, inject} from '@angular/core';
import {Func1} from '@jscrpt/common';

import {GridRowContext} from '../../interfaces';

/**
 * Directive used for obtaining template for grid content renderer footer row container
 */
@Directive(
{
    selector: '[footerRowContainerTemplate]',
    standalone: true,
})
export class FooterRowContainerTemplateSADirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridRowContext> = inject(TemplateRef<GridRowContext>);

    /**
     * Predicate which controls rendering of row template, if not specified row is rendered
     */
    public predicate: Func1<boolean, GridRowContext>|undefined|null;

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: FooterRowContainerTemplateSADirective, _ctx: unknown): _ctx is GridRowContext<any>
    {
        return true;
    }
}