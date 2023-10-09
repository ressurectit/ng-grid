import {GridAction, GridPluginType} from '@anglr/grid';

/**
 * Invalidates body content renderer view
 */
export function invalidateBodyContent(): GridAction
{
    return grid =>
    {
        const bodyContentRenderer = grid.getPlugin('BODY_CONTENT_RENDERER' as unknown as GridPluginType);

        bodyContentRenderer.invalidateVisuals();
    };
}