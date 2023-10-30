import {Signal} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

import {GridPlugin} from '../../gridPlugin/gridPlugin.interface';
import {PluginOptions} from '../../pluginOptions/pluginOptions.interface';
import {DataLoaderState} from '../../../misc/enums';

/**
 * Options for data loader
 */
export interface DataLoaderOptions extends PluginOptions
{
    /**
     * Indication that grid should try to load data at the end of init phase
     */
    autoLoadData: boolean;

    /**
     * Number of miliseconds that are used for debounce call of dataCallback
     */
    debounceDataCallback: number;
}

/**
 * Data loader plugin interface
 */
export interface DataLoader<TResult = unknown, TOptions extends DataLoaderOptions = DataLoaderOptions> extends GridPlugin<TOptions>
{
    /**
     * Loads data from 'source'
     * @param force - Indication that data should be reloaded even if nothing changed
     */
    loadData(force?: boolean): PromiseOr<void>;

    /**
     * Current result of data loader
     */
    readonly result: Signal<TResult>;

    /**
     * Current state of data loader
     */
    readonly state: Signal<DataLoaderState>;
}
