import {Directive} from '@angular/core';

import {TableGridCellTemplateBaseDirective} from '../tableGridCellTemplate/tableGridCellTemplate.directive';

/**
 * Directive that is used for obtaining template for table grid header cell
 */
@Directive(
{
    selector: '[headerCellTemplate]',
    standalone: true,
})
export abstract class TableGridHeaderCellTemplateSADirective<TData = unknown> extends TableGridCellTemplateBaseDirective<TData>
{
}