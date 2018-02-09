/**
 *  Object that is stored in cookie for each grid
 */
export interface GridCookieLegacyConfig
{
    /**
     * Array of ordered booleans indicating visibility of columns
     */
    selectedColumns?: boolean[];

    /**
     * Items per page currently selected
     */
    selectItemsPerPage?: number;
}