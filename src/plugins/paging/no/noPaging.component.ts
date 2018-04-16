import {ChangeDetectionStrategy, Component, forwardRef, ElementRef, ChangeDetectorRef, Optional, Inject} from "@angular/core";
import {PagingAbstractComponent} from "../pagingAbstract.component";
import {NoPagingOptions, NoPaging} from "./noPaging.interface";
import {NoPagingInitializerComponent} from "../plugins/pagingInitializer";
import {GRID_PLUGIN_INSTANCES, GridPluginInstances, PAGING_OPTIONS} from "../../..";
import {Utils} from "@anglr/common";

/**
 * Default options for paging
 * @internal
 */
const defaultOptions: NoPagingOptions<any> =
{
    initialItemsPerPage: NaN,
    initialPage: 1,
    pagingInitializer:
    {
        type: forwardRef(() => NoPagingInitializerComponent)
    }
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

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
        changeDetector: ChangeDetectorRef,
        @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
        @Inject(PAGING_OPTIONS) @Optional() options?: NoPagingOptions<any>)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }
}