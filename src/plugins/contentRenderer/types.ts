import {InjectionToken} from "@angular/core";

import {ContentRendererOptions} from "./contentRenderer.interface";
import {VisualPluginOptions} from "../../misc";

export * from './table/body/advanced/basicTableColumnSelectable.context';

/**
 * Token for injecting options for content renderer
 */
export const CONTENT_RENDERER_OPTIONS: InjectionToken<ContentRendererOptions<any, any>> = new InjectionToken<ContentRendererOptions<any, any>>('CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content renderer in grid
 */
export const CONTENT_RENDERER = "CONTENT_RENDERER";

/**
 * Token for injecting options for content body renderer
 */
export const BODY_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions<any>> = new InjectionToken<VisualPluginOptions<any>>('BODY_CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content body renderer in grid
 */
export const BODY_CONTENT_RENDERER = "BODY_CONTENT_RENDERER";

/**
 * Token for injecting options for content header renderer
 */
export const HEADER_CONTENT_RENDERER_OPTIONS: InjectionToken<VisualPluginOptions<any>> = new InjectionToken<VisualPluginOptions<any>>('HEADER_CONTENT_RENDERER_OPTIONS');

/**
 * Constant used for accessing content header renderer in grid
 */
export const HEADER_CONTENT_RENDERER = "HEADER_CONTENT_RENDERER";