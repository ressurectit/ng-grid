import {ChangeDetectionStrategy, Inject, Optional, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PermanentStorage, PERMANENT_STORAGE} from "@anglr/common";
import {extend, isPresent} from "@jscrpt/common";

import {GridPluginGeneric} from "../../../misc";
import {GRID_INITIALIZER_OPTIONS} from "../types";
import {QueryPermanentStorageGridInitializerOptions, QueryPermanentStorageGridInitializer} from "./queryPermanentStorageGridInitializer.interface";
import {QueryGridInitializerComponent} from "../query/queryGridInitializer.component";

/**
 * Component used for rendering query, permanent storage grid initializer
 */
@Component(
{
    selector: "ng-query-permanent-storage-grid-initializer",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryPermanentStorageGridInitializerComponent extends QueryGridInitializerComponent implements QueryPermanentStorageGridInitializer, GridPluginGeneric<QueryPermanentStorageGridInitializerOptions>
{
    //######################### public properties - implementation of NoGridInitializer #########################

    /**
     * Options for grid plugin
     */
    public get options(): QueryPermanentStorageGridInitializerOptions
    {
        return this._options;
    }
    public set options(options: QueryPermanentStorageGridInitializerOptions)
    {
        this._options = extend(true, this._options, options) as QueryPermanentStorageGridInitializerOptions;
    }

    //######################### protected properties #########################

    /**
     * Gets name of items per page permanent storage
     */
    protected get itemsPerPagePermanentStorageName(): string
    {
        return this.options.storageIppName;
    }

    //######################### constructor #########################
    constructor(_router: Router,
                _route: ActivatedRoute,
                @Inject(PERMANENT_STORAGE) @Optional() protected _permanentStorages: PermanentStorage,
                @Inject(GRID_INITIALIZER_OPTIONS) @Optional() options?: QueryPermanentStorageGridInitializerOptions)
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

        if(this._permanentStorages && this.itemsPerPagePermanentStorageName)
        {
            ipp = this._permanentStorages.get<number>(this.itemsPerPagePermanentStorageName);

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
        if(this._permanentStorages && this.itemsPerPagePermanentStorageName)
        {
            this._permanentStorages.set(this.itemsPerPagePermanentStorageName, itemsPerPage);
        }

        super.setItemsPerPage(itemsPerPage);
    }
}