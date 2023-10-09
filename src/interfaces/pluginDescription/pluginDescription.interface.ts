import {Type} from '@angular/core';
import {Action1} from '@jscrpt/common';

import {PluginOptions} from '../pluginOptions/pluginOptions.interface';
import {GridPlugin} from '../gridPlugin/gridPlugin.interface';

/**
 * Defines interface, that describes minimal set of parameters for specifying plugin for grid
 */
export interface PluginDescription<TPluginType extends GridPlugin = GridPlugin, TPluginOptions extends PluginOptions = PluginOptions>
{
    /**
     * Type of plugin that will be dynamically instantiated
     */
    type: Type<TPluginType>|null;

    /**
     * Options that will be passed to dynamically instantiated plugin
     */
    options: TPluginOptions|null;

    /**
     * Optional callback used for obtaining dynamic instance of plugin (allows direct communication with plugin)
     */
    instanceCallback: Action1<TPluginType|null>|null;

    /**
     * If specified, allows to pass existing instance of plugin to grid, overriding dynamic creation, if it is visual plugin must be rendered outside of grid
     */
    instance: TPluginType|null;
}