import {PromiseOr} from '@jscrpt/common';

import type {CellTemplateContext, DataCellTemplateContext, Grid, GridPlugin} from '../interfaces';
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

/**
 * Factory function signature for obtaining data cell context
 * @param grid - Instance of grid
 * @param plugins - Instances of all plugins
 * @param data - Data for row that is being rendered
 * @param index - Index of current row in header
 * @param columnMetadata - Metadata for column
 */
export type DataCellContextFactoryFn = <TData = unknown, TColumnMetadata = unknown, TContext extends DataCellTemplateContext = DataCellTemplateContext>(grid: Grid, plugins: GridPluginInstances, data: TData, index: number, columnMetadata: TColumnMetadata) => TContext;

/**
 * Factory function signature for obtaining cell context
 * @param grid - Instance of grid
 * @param plugins - Instances of all plugins
 * @param index - Index of current row in header
 * @param columnMetadata - Metadata for column
 */
export type CellContextFactoryFn = <TColumnMetadata = unknown, TContext extends CellTemplateContext = CellTemplateContext>(grid: Grid, plugins: GridPluginInstances, index: number, columnMetadata: TColumnMetadata) => TContext;