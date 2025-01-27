import {Directive, Input, TemplateRef, inject} from '@angular/core';

import {GridContext} from '../../interfaces';
import {rowColumnsAttribute} from '../../misc/utils';

/**
 * Directive used for obtaining template for grid content renderer container
 */
@Directive(
{
    selector: '[gridContainerTemplate]',
})
export class GridContainerTemplateDirective
{
    //######################### public properties #########################

    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<GridContext> = inject(TemplateRef<GridContext>);

    //######################### public properties - inputs #########################

    /**
     * Array of column ids to be rendered in this grid container, if not specified or null all available columns will be rendered
     */
    @Input({alias: 'gridContainerTemplate', transform: rowColumnsAttribute})
    public columns: string[]|undefined|null;

    /**
     * Indication whether list of columns will be excluded, not included in this grid container
     */
    @Input('gridContainerTemplateExclude')
    public exclude: boolean = false;

    //######################### ng language server #########################

    /**
     * Allows typechecking for template
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ngTemplateContextGuard(_dir: GridContainerTemplateDirective, _ctx: unknown): _ctx is GridContext<any>
    {
        return true;
    }
}