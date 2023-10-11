import {GridAction, GridOptions} from '@anglr/grid';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

/**
 * Method reinitialize options for grid
 * @param options - Options to be used for reinitialization
 */
export function reinitializeOptions(options?: GridOptions): GridAction
{
    return async grid =>
    {
        if(options)
        {
            grid.gridOptions = options;
        }

        await grid.initOptions();
        grid.invalidateVisuals();
        await lastValueFrom(grid.pluginsOptionsInitialized.pipe(first(init => init)));
        await grid.initialize();
    };
}