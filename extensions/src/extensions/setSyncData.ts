import {isArray} from "@jscrpt/common";

import {GridAction, DataLoader, DATA_LOADER} from "@anglr/grid";

/**
 * Sets data for SyncDataLoader
 * @param data data that should be replaced
 * @param force Indication that data should be reloaded 
 */
export function setSyncData(data: any[], force?: boolean): GridAction
{
    return grid =>
    {
        let dataLoader = grid.getPlugin<DataLoader<any>>(DATA_LOADER);

        dataLoader.options.data = isArray(data) ? data : [];
        dataLoader.loadData(force);
    };
}
