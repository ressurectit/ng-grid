import {Directive, Input, TemplateRef, inject} from '@angular/core';
import {Func1} from '@jscrpt/common';

import {GridDataRowContext} from '../../interfaces';
import {rowColumnsAttribute} from '../../misc/utils';

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

    //######################### public properties - inputs #########################

    /**
     * Predicate which controls rendering of row template, if not specified row is rendered
     */
    @Input()
    public predicate: Func1<boolean, GridDataRowContext>|undefined|null;

    /**
     * Array of column ids to be rendered in this row, if not specified or null all available columns will be rendered
     */
    @Input({alias: 'contentRowContainerTemplate', transform: rowColumnsAttribute})
    public columns: string[]|undefined|null;

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