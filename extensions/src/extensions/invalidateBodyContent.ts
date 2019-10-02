import {GridAction, BODY_CONTENT_RENDERER} from "@anglr/grid";

/**
 * Invalidates body content renderer view
 */
export function invalidateBodyContent(): GridAction
{
    return grid =>
    {
        let bodyContentRenderer = grid.getPlugin(BODY_CONTENT_RENDERER);

        bodyContentRenderer.invalidateVisuals();
    };
}