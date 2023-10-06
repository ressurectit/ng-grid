import {Directive, TemplateRef} from '@angular/core';

import {TableGridCellTemplateContext} from './tableGridCellTemplate.context';

/**
 * Base directive that is used for obtaining template for table grid cell
 */
@Directive()
export abstract class TableGridCellTemplateBaseDirective<TData = unknown>
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<TableGridCellTemplateContext<TData>>)
    {
    }
}