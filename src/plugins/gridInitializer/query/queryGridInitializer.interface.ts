import {GridInitializerOptions, GridInitializer} from '../gridInitializer.interface';

/**
 * Query grid initializer options
 */
export interface QueryGridInitializerOptions extends GridInitializerOptions
{
}

/**
 * Query grid initializer that uses query params for getting and storing grid data
 */
export interface QueryGridInitializer extends GridInitializer
{
}