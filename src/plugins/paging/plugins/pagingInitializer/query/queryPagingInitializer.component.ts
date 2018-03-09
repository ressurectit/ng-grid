import {ChangeDetectionStrategy, Inject, Optional, ElementRef, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Utils} from "@anglr/common";

import {GridPluginGeneric} from "../../../../../misc";
import {QueryPagingInitializer, QueryPagingInitializerOptions} from "./queryPagingInitializer.interface";
import {PAGING_INITIALIZER_OPTIONS} from "../../../paging.interface";
import {GridPluginInstances} from "../../../../../components/grid";

/**
 * Default options for query paging initializer
 */
const defaultOptions: QueryPagingInitializerOptions =
{
    prefix: ''
};

/**
 * Component used for rendering query paging initializer
 */
@Component(
{
    selector: "ng-query-paging-initializer",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryPagingInitializerComponent implements QueryPagingInitializer, GridPluginGeneric<QueryPagingInitializerOptions>
{
    //######################### private fields #########################

    /**
     * Options for grid plugin
     */
    private _options: QueryPagingInitializerOptions;

    //######################### public properties - implementation of NoPagingInitializer #########################

    /**
     * Grid plugin instances available for this plugin
     */
    public gridPlugins: GridPluginInstances;

    /**
     * Element that represents plugin
     */
    public pluginElement: ElementRef;

    /**
     * Options for grid plugin
     */
    public set options(options: QueryPagingInitializerOptions)
    {
        this._options = Utils.common.extend(true, this._options, options) as QueryPagingInitializerOptions;
    }
    public get options(): QueryPagingInitializerOptions
    {
        return this._options;
    }

    //######################### private properties #########################

    /**
     * Gets name of page in url
     */
    private get pageName(): string
    {
        return this._options.prefix + 'p';
    }

    /**
     * Gets name of items per page in url
     */
    private get itemsPerPageName(): string
    {
        return this._options.prefix + 'ipp';
    }

    //######################### constructor #########################
    constructor(private _router: Router, 
                private _route: ActivatedRoute,
                @Inject(PAGING_INITIALIZER_OPTIONS) @Optional() options?: QueryPagingInitializerOptions)
    {
        this._options = Utils.common.extend(true, {}, defaultOptions, options);
    }    

    //######################### public methods - implementation of NoPagingInitializer #########################

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     */
    public initialize()
    {
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions()
    {
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
    }

    /**
     * Gets initial page
     */
    public getPage(): number
    {
        if(!this._route.snapshot.queryParamMap.has(this.pageName))
        {
            return null;
        }

        return +this._route.snapshot.queryParamMap.get(this.pageName);
    }

    /**
     * Sets current page when changed
     * @param {number} page Page to be set
     */
    public setPage(page: number)
    {
        let pageParam = {};

        pageParam[this.pageName] = page;

        this._router.navigate(['.'],
        {
            relativeTo: this._route,
            queryParams: pageParam,
            queryParamsHandling: "merge",
            replaceUrl: true
        });
    }

    /**
     * Gets initial items per page
     */
    public getItemsPerPage(): number
    {
        if(!this._route.snapshot.queryParamMap.has(this.itemsPerPageName))
        {
            return null;
        }

        return +this._route.snapshot.queryParamMap.get(this.itemsPerPageName);
    }

    /**
     * Sets current items per page when changed
     * @param {number} itemsPerPage Items per page to be set
     */
    public setItemsPerPage(itemsPerPage: number)
    {
        let pageParam = {};

        pageParam[this.itemsPerPageName] = itemsPerPage;

        this._router.navigate(['.'],
        {
            relativeTo: this._route,
            queryParams: pageParam,
            queryParamsHandling: "merge",
            replaceUrl: true
        });
    }
}