import {GridAction, DataLoader, DATA_LOADER} from "@anglr/grid";

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