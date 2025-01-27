import {Directive, Inject} from '@angular/core';

import {GRID_INSTANCE} from '../../misc/tokens';
import {Grid} from '../../interfaces';
import {MatrixContentRendererOptions} from '../../plugins';
import {TableDefaultTemplatesSAComponent} from '../../plugins/contentRenderer/matrix/misc/components/tableDefaultTemplates/tableDefaultTemplates.component';

/**
 * Configures MatrixContentRenderer to use TableDefaultTemplates
 */
@Directive(
{
    selector: '[ngGrid][useTable]',
})
export class UseTableDirective
{
    //######################### constructor #########################
    constructor(@Inject(GRID_INSTANCE) grid: Grid,)
    {
        grid.gridOptions =
        {
            plugins:
            {
                contentRenderer:
                {
                    options: <MatrixContentRendererOptions>
                    {
                        defaults: TableDefaultTemplatesSAComponent,
                    },
                },
            },
        };
    }
}
