import {Func0, Func1, PromiseOr, isBlank, isString} from '@jscrpt/common';
import {Subject} from 'rxjs';

import {Grid, GridPlugin, Paging, PluginDescription, RowSelector, SimpleOrdering, DataCellTemplateContext, CellTemplateContext} from '../interfaces';
import {GridPluginType} from './enums';
import type {GridSAComponent} from '../components';
import {CellContextFactoryFn, DataCellContextFactoryFn, GridPluginInstances} from './types';

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
 * @param getInitOptionsSubject - Subject for emitting init options initialization state
 * @param beforeOptionsSet - Optional code that is code before options are set
 */
export function setPluginFactory<TPlugin extends GridPlugin = GridPlugin>(pluginType: GridPluginType,
                                                                          getPluginDescription: Func0<PluginDescription<TPlugin>>,
                                                                          getInitOptionsSubject: Func0<Subject<boolean>>,
                                                                          beforeOptionsSet?: Func1<PromiseOr<void>, TPlugin>): Func1<Promise<void>, TPlugin|null>
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

        getInitOptionsSubject().next(true);
    };
}

/**
 * Creates context object for cell in grid
 * @param grid - Instance of grid
 * @param plugins - Instances of all plugins
 * @param index - Index of current row in header
 * @param columnMetadata - Metadata for column
 */
export const cellContextFactory: CellContextFactoryFn = function cellContextFactory<TColumnMetadata, TContext extends CellTemplateContext = CellTemplateContext>(_grid: Grid,
                                                                                                                                                                 _plugins: GridPluginInstances,
                                                                                                                                                                 _index: number,
                                                                                                                                                                 columnMetadata: TColumnMetadata): TContext
{
    return {
        column: columnMetadata,
    } as TContext;
};

/**
 * Creates context object for data cell in grid
 * @param grid - Instance of grid
 * @param plugins - Instances of all plugins
 * @param data - Data for row that is being rendered
 * @param index - Index of current row in header
 * @param columnMetadata - Metadata for column
 */
export const dataCellContextFactory: DataCellContextFactoryFn = function dataCellContextFactory<TData, TColumnMetadata, TContext extends DataCellTemplateContext = DataCellTemplateContext>(_grid: Grid,
                                                                                                                                                                                            plugins: GridPluginInstances,
                                                                                                                                                                                            data: TData,
                                                                                                                                                                                            index: number,
                                                                                                                                                                                            columnMetadata: TColumnMetadata): TContext
{
    const paging = plugins[GridPluginType.Paging] as Paging;
    const rowSelector = plugins[GridPluginType.RowSelector] as RowSelector;

    return {
        $implicit: data,
        column: columnMetadata,
        index: index,
        rowIndex: paging.firstItemIndex + index,
        startingIndex: paging.firstItemIndex,
        get isSelected(): boolean
        {
            return rowSelector.isSelected(data);
        },        
    } as TContext;
};

/**
 * Transforms row columns attribute value into row columns value
 * @param value - Value to be transformed as row columns attribute
 */
export function rowColumnsAttribute(value: string|undefined|null|string[]): string[]|undefined|null
{
    if(isBlank(value))
    {
        return value;
    }

    if(value === '')
    {
        return [];
    }

    if(isString(value))
    {
        throw new Error(`rowColumnsAttribute: invalid value ${value}, must be array or empty string or null or undefined!`);
    }

    return value;
}