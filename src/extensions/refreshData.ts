import {GridAction} from "../components/grid";
import {DataLoader, DATA_LOADER} from "../plugins/dataLoader";

/**
 * Refresh data
 * @param force Indication that data should be reloaded
 */
export function refreshData(force?: boolean): GridAction
{
    return grid =>
    {
        let dataLoader = grid.getPlugin<DataLoader<any>>(DATA_LOADER);

        dataLoader.loadData(force);
    };
}