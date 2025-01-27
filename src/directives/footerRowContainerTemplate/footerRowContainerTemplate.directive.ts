import {Directive, Input, TemplateRef, inject} from '@angular/core';
import {Func1} from '@jscrpt/common';

import {GridRowContext} from '../../interfaces';
import {rowColumnsAttribute} from '../../misc/utils';

/**
 * Directive used for obtaining template for grid content renderer footer row container
 */
@Directive(
{
    selector: '[footerRowContainerTemplate]',
})
export class FooterRowContainerTemplateDirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridRowContext> = inject(TemplateRef<GridRowContext>);

    //######################### public properties - inputs #########################

    /**
     * Predicate which controls rendering of row template, if not specified row is rendered
     */
    @Input('footerRowContainerTemplatePredicate')
    public predicate: Func1<boolean, GridRowContext>|undefined|null;

    /**
     * Array of column ids to be rendered in this row, if not specified or null all available columns will be rendered
     */
    @Input({alias: 'footerRowContainerTemplate', transform: rowColumnsAttribute})
    public columns: string[]|undefined|null;

    /**
     * Indication whether list of columns will be excluded, not included in this row
     */
    @Input('footerRowContainerTemplateExclude')
    public exclude: boolean = false;

    //######################### ng language server #########################

    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: FooterRowContainerTemplateDirective, _ctx: unknown): _ctx is GridRowContext<any>
    {
        return true;
    }

    /**
     * Custom input type for `predicate` input
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static ngAcceptInputType_predicate: Func1<boolean, GridRowContext<any>>|undefined|null;
}