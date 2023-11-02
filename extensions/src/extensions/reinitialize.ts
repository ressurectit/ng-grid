import {GridAction} from '@anglr/grid';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

/**
 * Method reinitializes grid
 * @param force - Indication that grid should be fully reinitialized, even thou nothing has changed
 */
export function reinitialize(force?: boolean): GridAction
{
    return async grid =>
    {
        force ??= false;

        const pluginsOptionsInitialized = await lastValueFrom(grid.pluginsOptionsInitialized.pipe(first(init => init)));

        if(!pluginsOptionsInitialized)
        {
            throw new Error('reinitialize: plugin options are not initialized!');
        }

        await grid.initialize(force);
    };
}