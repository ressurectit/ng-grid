import {ChangeDetectionStrategy, Inject, Optional, Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {extend, isPresent} from '@jscrpt/common';

import {QueryPermanentStorageGridInitializerOptions, QueryPermanentStorageGridInitializer} from './queryPermanentStorageGridInitializer.interface';
import {QueryGridInitializerComponent} from '../query/queryGridInitializer.component';
import {GridPlugin} from '../../../interfaces';
import {GRID_INITIALIZER_OPTIONS} from '../../../misc/tokens';

/**
 * Component used for rendering query, permanent storage grid initializer
 */
@Component(
{
    selector: 'ng-query-permanent-storage-grid-initializer',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryPermanentStorageGridInitializerSAComponent extends QueryGridInitializerComponent implements QueryPermanentStorageGridInitializer, GridPlugin<QueryPermanentStorageGridInitializerOptions>
{
    //######################### protected fields - overrides #########################

    /**
     * @inheritdoc
     */
    protected override ɵoptions: QueryPermanentStorageGridInitializerOptions = super.ɵoptions as QueryPermanentStorageGridInitializerOptions;

    //######################### public properties - implementation of NoGridInitializer #########################

    /**
     * Options for grid plugin
     */
    public override get options(): QueryPermanentStorageGridInitializerOptions
    {
        return this.ɵoptions;
    }
    public override set options(options: QueryPermanentStorageGridInitializerOptions)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options) as QueryPermanentStorageGridInitializerOptions;
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
    constructor(router: Router,
                route: ActivatedRoute,
                pluginElement: ElementRef<HTMLElement>,
                @Inject(PERMANENT_STORAGE) @Optional() protected _permanentStorages: PermanentStorage,
                @Inject(GRID_INITIALIZER_OPTIONS) @Optional() options?: QueryPermanentStorageGridInitializerOptions)
    {
        super(router, pluginElement, route, options);
    }

    //######################### public methods - implementation of NoGridInitializer #########################

    /**
     * @inheritdoc
     */
    public override getItemsPerPage(): number|undefined|null
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
     * @inheritdoc
     */
    public override setItemsPerPage(itemsPerPage: number): void
    {
        if(this._permanentStorages && this.itemsPerPagePermanentStorageName)
        {
            this._permanentStorages.set(this.itemsPerPagePermanentStorageName, itemsPerPage);
        }

        super.setItemsPerPage(itemsPerPage);
    }
}