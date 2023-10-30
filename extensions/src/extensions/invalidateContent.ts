import {GridAction, GridPluginType} from '@anglr/grid';

/**
 * Invalidates content renderer view, redraws content
 */
export function invalidateContent(): GridAction
{
    return grid =>
    {
        const contentRenderer = grid.getPlugin(GridPluginType.ContentRenderer);

        contentRenderer.invalidateVisuals();
    };
}