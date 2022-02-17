import {InjectionToken} from '@angular/core';

import {NoDataRendererOptions} from './noDataRenderer.interface';

/**
 * Token for injecting options for no data renderer
 */
export const NO_DATA_RENDERER_OPTIONS: InjectionToken<NoDataRendererOptions> = new InjectionToken<NoDataRendererOptions>('NO_DATA_RENDERER_OPTIONS');

/**
 * Constant used for accessing no data renderer in grid
 */
export const NO_DATA_RENDERER = 'NO_DATA_RENDERER';