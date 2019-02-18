import {ChangeDetectionStrategy, Inject, Optional, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Utils, CookieService, isPresent} from "@anglr/common";

import {GridPluginGeneric} from "../../../misc";
import {PAGING_INITIALIZER_OPTIONS} from "../pagingInitializer.interface";
import {QueryCookiePagingInitializerOptions, QueryCookiePagingInitializer} from "./queryCookiePagingInitializer.interface";
import {QueryPagingInitializerComponent} from "../query/queryPagingInitializer.component";

/**
 * Component used for rendering query cookie paging initializer
 */
@Component(
{
    selector: "ng-query-cookie-paging-initializer",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryCookiePagingInitializerComponent extends QueryPagingInitializerComponent implements QueryCookiePagingInitializer, GridPluginGeneric<QueryCookiePagingInitializerOptions>
{
    //######################### public properties - implementation of NoPagingInitializer #########################

    /**
     * Options for grid plugin
     */
    public set options(options: QueryCookiePagingInitializerOptions)
    {
        this._options = Utils.common.extend(true, this._options, options) as QueryCookiePagingInitializerOptions;
    }
    public get options(): QueryCookiePagingInitializerOptions
    {
        return this._options;
    }

    //######################### protected properties #########################

    /**
     * Gets name of items per page cookie
     */
    protected get itemsPerPageCookieName(): string
    {
        return this.options.cookieIppName;
    }

    //######################### constructor #########################
    constructor(_router: Router,
                _route: ActivatedRoute,
                @Optional() protected _cookies: CookieService,
                @Inject(PAGING_INITIALIZER_OPTIONS) @Optional() options?: QueryCookiePagingInitializerOptions)
    {
        super(_router, _route, options);
    }

    //######################### public methods - implementation of NoPagingInitializer #########################

    /**
     * Gets initial items per page
     */
    public getItemsPerPage(): number
    {
        let ipp = super.getItemsPerPage();

        if(ipp)
        {
            return ipp;
        }

        if(this._cookies && this.itemsPerPageCookieName)
        {
            ipp = this._cookies.getCookie(this.itemsPerPageCookieName) as number;

            if(isPresent(ipp))
            {
                return ipp;
            }
        }

        return null;
    }

    /**
     * Sets current items per page when changed
     * @param {number} itemsPerPage Items per page to be set
     */
    public setItemsPerPage(itemsPerPage: number)
    {
        if(this._cookies && this.itemsPerPageCookieName)
        {
            this._cookies.setCookie(this.itemsPerPageCookieName, itemsPerPage, null, "/");
        }

        super.setItemsPerPage(itemsPerPage);
    }
}