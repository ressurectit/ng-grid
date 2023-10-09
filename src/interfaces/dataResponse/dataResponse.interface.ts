/**
 * Standard data response
 */
export interface DataResponse<TData = unknown>
{
    /**
     * Currently returned data that are being displayed
     */
    data: TData[];

    /**
     * Count of all elements for current filter (without paging)
     */
    totalCount: number;
}