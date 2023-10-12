import {FactoryProvider, Provider, inject} from '@angular/core';

import {CellContextFactoryFn, DataCellContextFactoryFn} from './types';
import {CELL_CONTEXT_FN, DATA_CELL_CONTEXT_FN} from './tokens';

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
