import {GridInitializer, GridInitializerOptions} from '../../../interfaces';

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