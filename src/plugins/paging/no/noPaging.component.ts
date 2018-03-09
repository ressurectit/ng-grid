import {ChangeDetectionStrategy, Component} from "@angular/core";
import {PagingAbstractComponent} from "../pagingAbstract.component";
import {NoPagingOptions, NoPaging} from "./noPaging.interface";

/**
 * Component used for no paging
 */
@Component(
{
    selector: "ng-no-paging",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPagingComponent extends PagingAbstractComponent<any, NoPagingOptions<any>> implements NoPaging
{
    /**
     * Zero based index of first displayed item on page
     */
    public firstItemIndex: number = 0;

    /**
     * Gets or sets index of currently selected page
     */
    public page: number = 1;

    /**
     * Gets or sets number of items currently used for paging
     */
    public itemsPerPage: number = NaN;

    /**
     * Gets or sets number of all items that are paged with current filter criteria
     */
    public totalCount: number = null;
}