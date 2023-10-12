import {Inject, Pipe, PipeTransform} from '@angular/core';

import {DataCellTemplateContext, Grid} from '../../interfaces';
import {DATA_CELL_CONTEXT_FN, GRID_INSTANCE, GRID_PLUGIN_INSTANCES} from '../../misc/tokens';
import {DataCellContextFactoryFn, GridPluginInstances} from '../../misc/types';

/**
 * Obtains data cell context for template
 */
@Pipe({name: 'dataCellContext', standalone: true})
export class DataCellContextSAPipe implements PipeTransform
{
    //######################### constructor #########################
    constructor(@Inject(DATA_CELL_CONTEXT_FN) protected factoryFn: DataCellContextFactoryFn,
                @Inject(GRID_INSTANCE) protected grid: Grid,
                @Inject(GRID_PLUGIN_INSTANCES) public plugins: GridPluginInstances,)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Obtains data cell context for cell template
     * @param data - Data for row that is being rendered
     * @param index - Index of row for currently rendered cell
     * @param columnMetadata - Column metadata for rendered cell
     */
    public transform<TData, TColumnMetadata, TContext extends DataCellTemplateContext<TColumnMetadata> = DataCellTemplateContext<TColumnMetadata>>(data: TData, index: number, columnMetadata: TColumnMetadata): TContext
    {
        return this.factoryFn(this.grid, this.plugins, data, index, columnMetadata);
    }
}