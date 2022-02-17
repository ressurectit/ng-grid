import {GridAction, METADATA_SELECTOR, MetadataSelector} from '@anglr/grid';

/**
 * Shows metadata (column) selector
 */
export function showMetadataSelector(): GridAction
{
    return grid =>
    {
        const metadataSelector = grid.getPlugin<MetadataSelector>(METADATA_SELECTOR);

        metadataSelector.show();
    };
}