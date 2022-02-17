import {InjectionToken} from '@angular/core';

import {GridInitializerOptions} from './gridInitializer.interface';

/**
 * Token for injecting options for grid initializer
 */
export const GRID_INITIALIZER_OPTIONS: InjectionToken<GridInitializerOptions> = new InjectionToken<GridInitializerOptions>('GRID_INITIALIZER_OPTIONS');

/**
 * Constant used for accessing grid initializer in grid
 */
export const GRID_INITIALIZER = 'GRID_INITIALIZER';