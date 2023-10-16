import {Directive, TemplateRef, inject} from '@angular/core';
import {Func1} from '@jscrpt/common';

import {GridDataRowContext} from '../../interfaces';

/**
 * Directive used for obtaining template for grid content renderer content (body) row container
 */
@Directive(
{
    selector: '[contentRowContainerTemplate]',
    standalone: true,
})
export class ContentRowContainerTemplateSADirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridDataRowContext> = inject(TemplateRef<GridDataRowContext>);

    /**
     * Predicate which controls rendering of row template, if not specified row is rendered
     */
    public predicate: Func1<boolean, GridDataRowContext>|undefined|null;

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: ContentRowContainerTemplateSADirective, _ctx: unknown): _ctx is GridDataRowContext<any>
    {
        return true;
    }
}