import {Inject, Pipe, PipeTransform} from '@angular/core';

import {CellTemplateContext, Grid, GridPluginInstances} from '../../interfaces';
import {CELL_CONTEXT_FN, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../misc/tokens';
import {CellContextFactoryFn} from '../../misc/types';

/**
 * Obtains cell context for template
 */
@Pipe({name: 'cellContext', standalone: true})
export class CellContextSAPipe implements PipeTransform
{
    //######################### constructor #########################
    constructor(@Inject(CELL_CONTEXT_FN) protected factoryFn: CellContextFactoryFn,
                @Inject(GRID_INSTANCE) protected grid: Grid,
                @Inject(GRID_PLUGIN_INSTANCES) public plugins: GridPluginInstances,)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Obtains cell context for cell template
     * @param columnMetadata - Column metadata for rendered cell
     * @param index - Index of row for currently rendered cell
     */
    public transform<TColumnMetadata, TContext extends CellTemplateContext<TColumnMetadata> = CellTemplateContext<TColumnMetadata>>(columnMetadata: TColumnMetadata, index: number): TContext
    {
        return this.factoryFn(this.grid, this.plugins, index, columnMetadata);
    }
}