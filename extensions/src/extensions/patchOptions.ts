import {GridAction, GridOptions} from '@anglr/grid';

/**
 * Method used to patch options without full initialization of grid, only options are initialized
 * @param options - Options to be used as patch
 */
export function patchOptions(options: GridOptions): GridAction
{
    return grid =>
    {
        grid.gridOptions = options;

        grid.initOptions();
        grid.invalidateVisuals();
    };
}