import {GridAction, DataLoader, GridPluginType, SyncDataLoaderOptions} from '@anglr/grid';
import {isArray} from '@jscrpt/common';

/**
 * Sets data for SyncDataLoader
 * @param data - data that should be replaced
 * @param force - Indication that data should be reloaded 
 */
export function setSyncData(data: unknown[], force?: boolean): GridAction
{
    return grid =>
    {
        const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);

        (dataLoader.options as SyncDataLoaderOptions).data = isArray(data) ? data : [];
        dataLoader.loadData(force);
    };
}
