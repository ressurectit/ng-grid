import {FactoryProvider, Provider, Type, ValueProvider, inject} from '@angular/core';
import {RecursivePartial} from '@jscrpt/common';

import {CellContextFactoryFn, DataCellContextFactoryFn} from './types';
import {CELL_CONTEXT_FN, CONTENT_RENDERER_OPTIONS, CONTENT_RENDERER_TYPE, DATA_CELL_CONTEXT_FN, DATA_LOADER_OPTIONS, DATA_LOADER_TYPE, GRID_INITIALIZER_OPTIONS, GRID_INITIALIZER_TYPE, GRID_OPTIONS, METADATA_SELECTOR_OPTIONS, METADATA_SELECTOR_TYPE, NO_DATA_RENDERER_OPTIONS, NO_DATA_RENDERER_TYPE, ORDERING_OPTIONS, ORDERING_TYPE, PAGING_OPTIONS, PAGING_TYPE, ROW_SELECTOR_OPTIONS, ROW_SELECTOR_TYPE} from './tokens';
import {ContentRenderer, ContentRendererOptions, DataLoader, DataLoaderOptions, GridInitializer, GridInitializerOptions, GridOptions, MetadataSelector, MetadataSelectorOptions, NoDataRenderer, NoDataRendererOptions, Ordering, OrderingOptions, Paging, PagingOptions, RowSelector, RowSelectorOptions} from '../interfaces';

/**
 * Provides factory function for cell context
 * @param fn - Factory function for cell context that is going to be provided
 * @param useParent - Indication whether use existing parent provided value if exists, defaults to true
 */
export function provideCellContextFactoryFn(fn: CellContextFactoryFn, useParent: boolean = true): Provider
{
    return <FactoryProvider>
    {
        provide: CELL_CONTEXT_FN,
        useFactory: () =>
        {
            if(useParent)
            {
                const parentCellContextFn = inject(CELL_CONTEXT_FN, {optional: true, skipSelf: true});

                if(parentCellContextFn)
                {
                    return parentCellContextFn;
                }
            }

            return fn;
        },
    };
}

/**
 * Provides factory function for data cell context
 * @param fn - Factory function for data cell context that is going to be provided
 * @param useParent - Indication whether use existing parent provided value if exists, defaults to true
 */
export function provideDataCellContextFactoryFn(fn: DataCellContextFactoryFn, useParent: boolean = true): Provider
{
    return <FactoryProvider>
    {
        provide: DATA_CELL_CONTEXT_FN,
        useFactory: () =>
        {
            if(useParent)
            {
                const parentDataCellContextFn = inject(DATA_CELL_CONTEXT_FN, {optional: true, skipSelf: true});

                if(parentDataCellContextFn)
                {
                    return parentDataCellContextFn;
                }
            }

            return fn;
        },
    };
}

/**
 * Provides grid options
 * @param gridOptions - Grid options to be provided
 */
export function provideGridOptions(gridOptions: RecursivePartial<GridOptions>): Provider
{
    return <ValueProvider>{
        provide: GRID_OPTIONS,
        useValue: gridOptions,
    };
}

/**
 * Provides paging type
 * @param type - Type that is provided for paging plugin
 */
export function providePagingType(type: Type<Paging>): Provider
{
    return <ValueProvider>{
        provide: PAGING_TYPE,
        useValue: type,
    };
}

/**
 * Provides ordering type
 * @param type - Type that is provided for ordering plugin
 */
export function provideOrderingType(type: Type<Ordering>): Provider
{
    return <ValueProvider>{
        provide: ORDERING_TYPE,
        useValue: type,
    };
}

/**
 * Provides grid initializer type
 * @param type - Type that is provided for grid initializer plugin
 */
export function provideGridInitializerType(type: Type<GridInitializer>): Provider
{
    return <ValueProvider>{
        provide: GRID_INITIALIZER_TYPE,
        useValue: type,
    };
}

/**
 * Provides data loader type
 * @param type - Type that is provided for data loader plugin
 */
export function provideDataLoaderType(type: Type<DataLoader>): Provider
{
    return <ValueProvider>{
        provide: DATA_LOADER_TYPE,
        useValue: type,
    };
}

/**
 * Provides content renderer type
 * @param type - Type that is provided for content renderer plugin
 */
export function provideContentRendererType(type: Type<ContentRenderer>): Provider
{
    return <ValueProvider>{
        provide: CONTENT_RENDERER_TYPE,
        useValue: type,
    };
}

/**
 * Provides metadata selector type
 * @param type - Type that is provided for metadata selector plugin
 */
export function provideMetadataSelectorType(type: Type<MetadataSelector>): Provider
{
    return <ValueProvider>{
        provide: METADATA_SELECTOR_TYPE,
        useValue: type,
    };
}

/**
 * Provides no data renderer type
 * @param type - Type that is provided for no data renderer plugin
 */
export function provideNoDataRendererType(type: Type<NoDataRenderer>): Provider
{
    return <ValueProvider>{
        provide: NO_DATA_RENDERER_TYPE,
        useValue: type,
    };
}

/**
 * Provides row selector type
 * @param type - Type that is provided for row selector plugin
 */
export function provideRowSelectorType(type: Type<RowSelector>): Provider
{
    return <ValueProvider>{
        provide: ROW_SELECTOR_TYPE,
        useValue: type,
    };
}

/**
 * Provides content renderer options
 * @param options - Options for content renderer
 */
export function provideContentRendererOptions<TOptions extends ContentRendererOptions = ContentRendererOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: CONTENT_RENDERER_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides data loader options
 * @param options - Options for data loader
 */
export function provideDataLoaderOptions<TOptions extends DataLoaderOptions = DataLoaderOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: DATA_LOADER_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides grid initializer options
 * @param options - Options for grid initializer
 */
export function provideGridInitializerOptions<TOptions extends GridInitializerOptions = GridInitializerOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: GRID_INITIALIZER_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides metadata selector options
 * @param options - Options for metadata selector
 */
export function provideMetadataSelectorOptions<TOptions extends MetadataSelectorOptions = MetadataSelectorOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: METADATA_SELECTOR_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides no data renderer options
 * @param options - Options for no data renderer
 */
export function provideNoDataRendererOptions<TOptions extends NoDataRendererOptions = NoDataRendererOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: NO_DATA_RENDERER_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides paging options
 * @param options - Options for paging
 */
export function providePagingOptions<TOptions extends PagingOptions = PagingOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: PAGING_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides ordering options
 * @param options - Options for ordering
 */
export function provideOrderingOptions<TOptions extends OrderingOptions = OrderingOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: ORDERING_OPTIONS,
        useValue: options,
    };
}

/**
 * Provides row selector options
 * @param options - Options for row selector
 */
export function provideRowSelectorOptions<TOptions extends RowSelectorOptions = RowSelectorOptions>(options: RecursivePartial<TOptions>): Provider
{
    return <ValueProvider>{
        provide: ROW_SELECTOR_OPTIONS,
        useValue: options,
    };
}