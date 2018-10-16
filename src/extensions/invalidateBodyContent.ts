import {GridAction} from "../components/grid";
import {BODY_CONTENT_RENDERER} from "../plugins/contentRenderer";

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