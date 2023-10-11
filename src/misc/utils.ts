import {Func0, Func1, PromiseOr} from '@jscrpt/common';

import {Grid, GridPlugin, PluginDescription, RowSelector, SimpleOrdering} from '../interfaces';
import {GridPluginType} from './enums';
import type {GridSAComponent} from '../components';

/**
 * Applies block of row selection to grid, if row was not selected checkbox change event will be blocked
 * @param grid - Instance of grid which is used
 * @param itm - Data item for row
 * @param event - Mouse event that occured
 */
export function applyRowSelectionBlock<TItem>(grid: Grid, itm: TItem, event: MouseEvent): void
{
    const rowSelector = grid.getPlugin<RowSelector>(GridPluginType.RowSelector);

    if(!rowSelector.isSelected(itm) && (event.target as HTMLInputElement).checked)
    {
        event.preventDefault();
    }
}

/**
 * Serialize ordering
 * @param ordering - Ordering to be serialized
 */
export function serializeSimpleOrdering(ordering: SimpleOrdering): string|null
{
    if(!ordering)
    {
        return null;
    }

    return encodeURIComponent(`${ordering.orderBy},${ordering.orderByDirection}`);
}

/**
 * Deserialize ordering
 * @param ordering - Ordering as string to be deserialized
 */
export function deserializeSimpleOrdering(ordering: string): SimpleOrdering|null
{
    if(!ordering)
    {
        return null;
    }

    const [orderBy, orderByDirection] = decodeURIComponent(ordering).split(',');

    return {
        orderBy: orderBy,
        orderByDirection: +orderByDirection
    };
}

/**
 * Factory function that creates set plugin function
 * @param pluginType - Type of plugin that is being set
 * @param getPluginDescription - Function that obtains plugin description object
 * @param beforeOptionsSet - Optional code that is code before options are set
 */
export function setPluginFactory<TPlugin extends GridPlugin = GridPlugin>(pluginType: GridPluginType,
                                                                          getPluginDescription: Func0<PluginDescription<TPlugin>>,
                                                                          beforeOptionsSet?: (plugin: TPlugin) => PromiseOr<void>): Func1<Promise<void>, TPlugin|null>
{
    return async function(this: GridSAComponent, plugin: TPlugin|null): Promise<void>
    {
        if(!plugin)
        {
            return;
        }

        this.pluginInstances[pluginType] = plugin;

        await beforeOptionsSet?.bind(this)(plugin);

        const options = getPluginDescription().options;

        //sets options if they are present
        if(options)
        {
            plugin.options = options;
        }

        await plugin.initOptions();

        const instanceCallback = getPluginDescription().instanceCallback;
        
        if(instanceCallback)
        {
            instanceCallback(plugin);
        }
    };
}
