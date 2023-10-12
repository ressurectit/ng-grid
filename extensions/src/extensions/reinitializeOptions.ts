import {GridAction, GridOptions} from '@anglr/grid';
import {isBoolean} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

/**
 * Method reinitialize options for grid
 * @param force - Indication that options should be fully reinitialized, even thou nothing has changed
 */
export function reinitializeOptions(force?: boolean): GridAction
/**
 * Method reinitialize options for grid
 * @param options - Options to be used for reinitialization
 */
export function reinitializeOptions(options?: GridOptions): GridAction
/**
 * Method reinitialize options for grid
 * @param force - Indication that options should be fully reinitialized, even thou nothing has changed
 * @param options - Options to be used for reinitialization
 */
export function reinitializeOptions(force?: boolean, options?: GridOptions): GridAction
export function reinitializeOptions(optionsOrForce?: GridOptions|boolean, opts?: GridOptions): GridAction
{
    return async grid =>
    {
        const force = isBoolean(optionsOrForce) ? optionsOrForce : false;
        const options = opts ?? isBoolean(optionsOrForce) ? undefined : optionsOrForce;

        if(options)
        {
            grid.gridOptions = options;
        }

        await grid.initOptions();
        grid.invalidateVisuals();
        await lastValueFrom(grid.pluginsOptionsInitialized.pipe(first(init => init)));
        await grid.initialize(force);
    };
}