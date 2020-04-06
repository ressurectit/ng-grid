import {GridInitializerOptions, GridInitializer} from "../gridInitializer.interface";

/**
 * Query cookie grid initializer options
 */
export interface QueryCookieGridInitializerOptions extends GridInitializerOptions
{
    /**
     * Name of cookie used for storing items per page
     */
    cookieIppName?: string;
}

/**
 * Query cookie grid initializer that uses query params and cookie for getting and storing grid info
 */
export interface QueryCookieGridInitializer extends GridInitializer
{
}