import {ChangeDetectionStrategy, Inject, Optional, ElementRef, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {extend} from "@jscrpt/common";

import {GridPluginGeneric} from "../../../misc";
import {QueryGridInitializer, QueryGridInitializerOptions} from "./queryGridInitializer.interface";
import {GRID_INITIALIZER_OPTIONS} from "../types";
import {GridPluginInstances} from "../../../components/grid";

/**
 * Default options for query grid initializer
 * @internal
 */
const defaultOptions: QueryGridInitializerOptions =
{
    prefix: ''
};

/**
 * Component used for rendering query grid initializer
 */
@Component(
{
    selector: "ng-query-grid-initializer",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryGridInitializerComponent implements QueryGridInitializer, GridPluginGeneric<QueryGridInitializerOptions>
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected _options: QueryGridInitializerOptions;

    //######################### public properties - implementation of NoGridInitializer #########################

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
    public get options(): QueryGridInitializerOptions
    {
        return this._options;
    }
    public set options(options: QueryGridInitializerOptions)
    {
        this._options = extend(true, this._options, options) as QueryGridInitializerOptions;
    }

    //######################### protected properties #########################

    /**
     * Gets name of page in url
     */
    protected get pageName(): string
    {
        return this._options.prefix + 'p';
    }

    /**
     * Gets name of items per page in url
     */
    protected get itemsPerPageName(): string
    {
        return this._options.prefix + 'ipp';
    }

    /**
     * Gets name of ordering in url
     */
    protected get orderingName(): string
    {
        return this._options.prefix + 'o';
    }

    //######################### constructor #########################
    constructor(protected _router: Router, 
                protected _route: ActivatedRoute,
                @Inject(GRID_INITIALIZER_OPTIONS) @Optional() options?: QueryGridInitializerOptions)
    {
        this._options = extend(true, {}, defaultOptions, options);
    }    

    //######################### public methods - implementation of NoGridInitializer #########################

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
     * Gets stored page
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
     * @param page - Page to be stored
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
     * Gets stored items per page
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
     * @param itemsPerPage - Items per page to be stored
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

    /**
     * Gets stored ordering
     */
    public getOrdering(): string
    {
        if(!this._route.snapshot.queryParamMap.has(this.orderingName))
        {
            return null;
        }

        return this._route.snapshot.queryParamMap.get(this.orderingName);
    }

    /**
     * Sets current ordering when changed
     * @param ordering - Ordering as string to be stored
     */
    public setOrdering(ordering: string): void
    {
        let orderingParam = {};

        orderingParam[this.orderingName] = ordering;

        this._router.navigate(['.'],
        {
            relativeTo: this._route,
            queryParams: orderingParam,
            queryParamsHandling: "merge",
            replaceUrl: true
        });
    }
}