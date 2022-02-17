import {GridInitializerOptions, GridInitializer} from '../gridInitializer.interface';

/**
 * No grid initializer options
 */
export interface NoGridInitializerOptions extends GridInitializerOptions
{
}

/**
 * No grid initializer that does nothing
 */
export interface NoGridInitializer extends GridInitializer
{
}