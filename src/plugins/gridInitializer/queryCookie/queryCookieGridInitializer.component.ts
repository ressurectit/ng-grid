import {ChangeDetectionStrategy, Inject, Optional, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "@anglr/common";
import {extend, isPresent} from "@jscrpt/common";

import {GridPluginGeneric} from "../../../misc";
import {GRID_INITIALIZER_OPTIONS} from "../types";
import {QueryCookieGridInitializerOptions, QueryCookieGridInitializer} from "./queryCookieGridInitializer.interface";
import {QueryGridInitializerComponent} from "../query/queryGridInitializer.component";

/**
 * Component used for rendering query cookie grid initializer
 */
@Component(
{
    selector: "ng-query-cookie-grid-initializer",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryCookieGridInitializerComponent extends QueryGridInitializerComponent implements QueryCookieGridInitializer, GridPluginGeneric<QueryCookieGridInitializerOptions>
{
    //######################### public properties - implementation of NoGridInitializer #########################

    /**
     * Options for grid plugin
     */
    public get options(): QueryCookieGridInitializerOptions
    {
        return this._options;
    }
    public set options(options: QueryCookieGridInitializerOptions)
    {
        this._options = extend(true, this._options, options) as QueryCookieGridInitializerOptions;
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
                @Inject(GRID_INITIALIZER_OPTIONS) @Optional() options?: QueryCookieGridInitializerOptions)
    {
        super(_router, _route, options);
    }

    //######################### public methods - implementation of NoGridInitializer #########################

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
     * @param itemsPerPage - Items per page to be set
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