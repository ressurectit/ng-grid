import {OrderByDirection} from '@jscrpt/common';

/**
 * Definition of simple ordering using one column
 */
export interface SimpleOrdering
{
    /**
     * Order by column name
     */
    orderBy: string;

    /**
     * Order by column direction
     */
    orderByDirection: OrderByDirection;
}