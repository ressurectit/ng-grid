import {isBlank, isString} from '@jscrpt/common';

import {Grid, Paging, RowSelector, SimpleOrdering, DataCellTemplateContext, CellTemplateContext, GridPluginInstances} from '../interfaces';
import {GridPluginType} from './enums';
import {CellContextFactoryFn, DataCellContextFactoryFn} from './types';

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