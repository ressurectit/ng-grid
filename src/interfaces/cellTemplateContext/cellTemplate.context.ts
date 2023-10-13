/**
 * Context for cell template
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CellTemplateContext<TColumnMetadata = unknown>
{
    //######################### readonly properties #########################

    /**
     * Object of column metadata itself
     */
    readonly column: TColumnMetadata;
}