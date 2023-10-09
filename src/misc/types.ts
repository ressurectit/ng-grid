import {PromiseOr} from '@jscrpt/common';

import type {Grid, GridPlugin} from '../interfaces';
import type {GridPluginType} from './enums';

/**
 * Defintion of action that can be executed on grid
 */
export type GridAction = (grid: Grid) => PromiseOr<void>;

/**
 * Definition of function that can be executed on grid and returns some data
 */
export type GridFunction<TResult = unknown> = (grid: Grid) => TResult;

/**
 * Available plugin type names
 */
export type GridPluginTypeName = keyof typeof GridPluginType;

/**
 * Object that stores all grid plugin instances
 */
export type GridPluginInstances = Record<GridPluginType, GridPlugin>;