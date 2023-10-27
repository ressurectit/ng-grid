import {GridAction, GridOptions} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

/**
 * Method used to patch options without full initialization of grid, only options are initialized
 * @param options - Options to be used as patch
 */
export function patchOptions(options: RecursivePartial<GridOptions>): GridAction
{
    return async grid =>
    {
        grid.gridOptions = options;

        await grid.initOptions();
        grid.invalidateVisuals();
        await lastValueFrom(grid.pluginsOptionsInitialized.pipe(first(init => init)));
    };
}