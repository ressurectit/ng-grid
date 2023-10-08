import {Observable} from 'rxjs';

import {GridPlugin} from '../../misc';

/**
 * Public API for grid
 */
export interface Grid
{
    /**
     * Occurs every time when grid is initialized or reinitialized, if value is false grid was not initialized yet
     */
    readonly initialized: Observable<boolean>;

    /**
     * Gets or sets grid options
     */
    gridOptions: GridOptions;

    /**
     * Initialize component, automatically called once if not blocked by options
     */
    initialize();

    /**
     * Initialize options, automaticaly called during init phase, but can be used to reinitialize GridOptions
     */
    initOptions();

    /**
     * Gets instance of plugin by its id
     * @param pluginId - Id of plugin, use constants
     */
    getPlugin<PluginType extends GridPlugin>(pluginId: string): PluginType;

    /**
     * Executes actions on grid
     * @param actions - Array of actions that are executed over grid
     */
    execute(...actions: GridAction[]);

    /**
     * Executes function on grid and returns result
     * @param func - Function that is executed and its result is returned
     */
    executeAndReturn<TResult>(func: GridFunction<TResult>): TResult;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}
