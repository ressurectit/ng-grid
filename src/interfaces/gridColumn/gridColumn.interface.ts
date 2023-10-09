/**
 * Base grid column definition
 */
export interface GridColumn
{
    /**
     * Unique identifier of column
     */
    readonly id: string|undefined|null;

    /**
     * Title of column that is displayed in grid header
     */
    readonly title: string|undefined|null;

    /**
     * Indication that this column is visible in grid
     */
    visible: boolean;
}