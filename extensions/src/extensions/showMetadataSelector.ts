import {GridAction, GridPluginType, MetadataSelector} from '@anglr/grid';

/**
 * Shows metadata (column) selector
 */
export function showMetadataSelector(): GridAction
{
    return grid =>
    {
        const metadataSelector = grid.getPlugin<MetadataSelector>(GridPluginType.MetadataSelector);

        metadataSelector.show();
    };
}