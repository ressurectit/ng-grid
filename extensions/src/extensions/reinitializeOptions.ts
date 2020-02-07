import {GridAction, GridOptions} from "@anglr/grid";

/**
 * Method reinitialize options for grid
 * @param options - Options to be used for reinitialization
 */
export function reinitializeOptions(options?: GridOptions): GridAction
{
    return grid =>
    {
        if(options)
        {
            grid.gridOptions = options;
        }

        grid.initOptions();
        grid.invalidateVisuals();
        grid.initialize();
    };
}