import {Invalidatable, PromiseOr, RecursivePartial} from '@jscrpt/common';
import {Observable} from 'rxjs';

import {GridOptions} from '../gridOptions/gridOptions.interface';
import {GridPlugin} from '../gridPlugin/gridPlugin.interface';
import {GridAction, GridFunction} from '../../misc/types';
import {GridPluginType} from '../../misc/enums';

/**
 * Public API for grid
 */
export interface Grid extends Invalidatable
{
    //TODO: maybe use signals
    /**
     * Occurs every time when grid is initialized or reinitialized, if value is false grid was not initialized yet or is being reinitialized
     */
    readonly initialized: Observable<boolean>;

    /**
     * Occurs everytime when plugins options initialization changes, if value is false plugins options were not initialized yet, or are being reinitialized
     */
    readonly pluginsOptionsInitialized: Observable<boolean>;

    /**
     * Gets or sets grid options
     */
    get gridOptions(): GridOptions;
    set gridOptions(value: RecursivePartial<GridOptions>);

    /**
     * Initialize component, automatically called once if not blocked by options
     * @param force - Indication that all plugins should be fully reinitialized, even thou nothing has changed
     */
    initialize(force: boolean): PromiseOr<void>;

    /**
     * Initialize options, automaticaly called during init phase, but can be used to reinitialize GridOptions
     */
    initOptions(): PromiseOr<void>;

    /**
     * Gets instance of plugin by its id
     * @param pluginId - Id of plugin, use constants
     */
    getPlugin<PluginInstance extends GridPlugin>(pluginId: GridPluginType): PluginInstance;

    /**
     * Sets GridPluginInstances into GridPlugin
     * @param plugin - Grid plugin to be filled with grid GridPluginInstances
     */
    setGridPluginInstances(plugin: GridPlugin): void;

    /**
     * Executes actions on grid
     * @param actions - Array of actions that are executed over grid
     */
    execute(...actions: GridAction[]): PromiseOr<void>;

    /**
     * Executes function on grid and returns result
     * @param func - Function that is executed and its result is returned
     */
    executeAndReturn<TResult>(func: GridFunction<TResult>): TResult;
}
