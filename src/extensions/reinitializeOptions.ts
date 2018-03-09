import {GridAction} from "../components/grid";
import {GridOptions} from "../misc/gridOptions.interface";

/**
 * Method reinitialize options for grid
 * @param {GridOptions} options Options to be used for reinitialization
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