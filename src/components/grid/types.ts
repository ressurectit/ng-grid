import {InjectionToken} from '@angular/core';

import {GridPluginInstances} from './grid.interface';

/**
 * Token used for obtaining 'GridPluginInstances'
 */
export const GRID_PLUGIN_INSTANCES: InjectionToken<GridPluginInstances> = new InjectionToken<GridPluginInstances>('GRID_PLUGIN_INSTANCES');