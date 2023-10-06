import {Directive} from '@angular/core';

import {TableGridCellTemplateBaseDirective} from '../tableGridCellTemplate/tableGridCellTemplate.directive';

/**
 * Directive that is used for obtaining template for table grid body cell
 */
@Directive(
{
    selector: '[bodyCellTemplate]',
    standalone: true,
})
export abstract class TableGridBodyCellTemplateSADirective<TData = unknown> extends TableGridCellTemplateBaseDirective<TData>
{
}