import {ChangeDetectionStrategy, Component, ElementRef, ChangeDetectorRef, Optional, Inject} from "@angular/core";
import {extend} from "@jscrpt/common";

import {PagingAbstractComponent} from "../pagingAbstract.component";
import {NoPagingOptions, NoPaging} from "./noPaging.interface";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {PAGING_OPTIONS} from "../types";

/**
 * Default options for paging
 * @internal
 */
const defaultOptions: NoPagingOptions =
{
    initialItemsPerPage: NaN,
    initialPage: 1
};

/**
 * Component used for no paging
 */
@Component(
{
    selector: "ng-no-paging",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPagingComponent extends PagingAbstractComponent<any, NoPagingOptions> implements NoPaging
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

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: NoPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }
}