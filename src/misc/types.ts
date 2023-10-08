import {PromiseOr} from '@jscrpt/common';

import type {Grid} from '../interfaces';

/**
 * Defintion of action that can be executed on grid
 */
export type GridAction = (grid: Grid) => PromiseOr<void>;

/**
 * Definition of function that can be executed on grid and returns some data
 */
export type GridFunction<TResult = unknown> = (grid: Grid) => TResult;