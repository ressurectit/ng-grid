import {GridAction, METADATA_SELECTOR, MetadataSelector} from "@anglr/grid";

/**
 * Shows metadata (column) selector
 */
export function showMetadataSelector(): GridAction
{
    return grid =>
    {
        let metadataSelector = grid.getPlugin<MetadataSelector<any>>(METADATA_SELECTOR);

        metadataSelector.show();
    };
}