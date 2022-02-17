import {InjectionToken} from '@angular/core';

import {ContentRendererOptions, SimpleOrdering} from './contentRenderer.interface';
import {VisualPluginOptions} from '../../misc';

export * from './table/body/advanced/basicTableColumnSelectable.context';

/**
 * Token for injecting options for content renderer
 */
export const CONTENT_RENDERER_OPTIONS: InjectionToken<ContentRendererOptions> = new InjectionToken<ContentRendererOptions>('CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content renderer in grid
 */
export const CONTENT_RENDERER = 'CONTENT_RENDERER';

/**
 * Token for injecting options for content body renderer
 */
export const BODY_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions> = new InjectionToken<VisualPluginOptions>('BODY_CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content body renderer in grid
 */
export const BODY_CONTENT_RENDERER = 'BODY_CONTENT_RENDERER';

/**
 * Token for injecting options for content header renderer
 */
export const HEADER_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions> = new InjectionToken<VisualPluginOptions>('HEADER_CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content header renderer in grid
 */
export const HEADER_CONTENT_RENDERER = 'HEADER_CONTENT_RENDERER';

/**
 * Serialize ordering
 * @param ordering - Ordering to be serialized
 */
export function serializeSimpleOrdering(ordering: SimpleOrdering): string
{
    if(!ordering)
    {
        return null;
    }

    return encodeURIComponent(`${ordering.orderBy},${ordering.orderByDirection}`);
}

/**
 * Deserialize ordering
 * @param ordering - Ordering as string to be deserialized
 */
export function deserializeSimpleOrdering(ordering: string): SimpleOrdering
{
    if(!ordering)
    {
        return null;
    }

    const [orderBy, orderByDirection] = decodeURIComponent(ordering).split(',');

    return {
        orderBy: orderBy,
        orderByDirection: +orderByDirection
    };
}