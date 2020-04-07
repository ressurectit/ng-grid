import {ChangeDetectionStrategy, Inject, Optional, ElementRef, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {extend} from "@jscrpt/common";

import {GridPluginGeneric} from "../../../misc";
import {QueryGridInitializer, QueryGridInitializerOptions} from "./queryGridInitializer.interface";
import {GRID_INITIALIZER_OPTIONS} from "../types";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from '../../../components/grid/types';
import {PAGING_INITIALIZER} from '../../pagingInitializer/types';
import {PagingInitializer} from '../../pagingInitializer';

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

    /**
     * Paging initializer plugin
     */
    protected _pagingInitializer: PagingInitializer;

    //######################### public properties - implementation of NoGridInitializer #########################

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
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances,
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
        this._pagingInitializer = this.gridPlugins[PAGING_INITIALIZER] as PagingInitializer;
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
        return this._pagingInitializer.getPage();
    }

    /**
     * Sets current page when changed
     * @param page - Page to be stored
     */
    public setPage(page: number)
    {
        this._pagingInitializer.setPage(page);
    }

    /**
     * Gets stored items per page
     */
    public getItemsPerPage(): number
    {
        return this._pagingInitializer.getItemsPerPage();
    }

    /**
     * Sets current items per page when changed
     * @param itemsPerPage - Items per page to be stored
     */
    public setItemsPerPage(itemsPerPage: number)
    {
        this._pagingInitializer.setItemsPerPage(itemsPerPage);
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