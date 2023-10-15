import {Directive, TemplateRef, inject} from '@angular/core';

/**
 * Directive used for obtaining template for grid content renderer container
 */
@Directive(
{
    selector: '[gridContainerTemplate]',
    standalone: true,
})
export class GridContainerTemplateSADirective
{
    /**
     * Obtained template by this directive
     */
    public template: TemplateRef<unknown> = inject(TemplateRef);
}