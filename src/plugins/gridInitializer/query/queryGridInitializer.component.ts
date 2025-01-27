import {ChangeDetectionStrategy, Inject, Optional, ElementRef, Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecursivePartial, deserializeFromUrlQuery, serializeToUrlQuery} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';

import {QueryGridInitializer, QueryGridInitializerOptions} from './queryGridInitializer.interface';
import {GridPlugin, GridPluginInstances} from '../../../interfaces';
import {GRID_INITIALIZER_OPTIONS} from '../../../misc/tokens';

/**
 * Default options for query grid initializer
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
    selector: 'ng-query-grid-initializer',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryGridInitializerComponent implements QueryGridInitializer, GridPlugin<QueryGridInitializerOptions>
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected ɵoptions: QueryGridInitializerOptions;

    //######################### public properties - implementation of NoGridInitializer #########################

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null;

    /**
     * @inheritdoc
     */
    public get options(): QueryGridInitializerOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<QueryGridInitializerOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options) as QueryGridInitializerOptions;
    }

    //######################### protected properties #########################

    /**
     * Gets name of page in url
     */
    protected get pageName(): string
    {
        return this.ɵoptions.prefix + 'p';
    }

    /**
     * Gets name of items per page in url
     */
    protected get itemsPerPageName(): string
    {
        return this.ɵoptions.prefix + 'ipp';
    }

    /**
     * Gets name of ordering in url
     */
    protected get orderingName(): string
    {
        return this.ɵoptions.prefix + 'o';
    }

    //######################### constructor #########################
    constructor(protected router: Router,
                public pluginElement: ElementRef<HTMLElement>,
                protected route: ActivatedRoute,
                @Inject(GRID_INITIALIZER_OPTIONS) @Optional() options?: QueryGridInitializerOptions)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of NoGridInitializer #########################

    /**
     * @inheritdoc
     */
    public initialize(_force: boolean): void
    {
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    /**
     * @inheritdoc
     */
    public getPage(): number|undefined|null
    {
        if(!this.route.snapshot.queryParamMap.has(this.pageName))
        {
            return null;
        }

        return +this.route.snapshot.queryParamMap.get(this.pageName)!;
    }

    /**
     * @inheritdoc
     */
    public setPage(page: number|undefined|null): void
    {
        const pageParam: Params = {};

        pageParam[this.pageName] = page;

        this.router.navigate(['.'],
        {
            relativeTo: this.route,
            queryParams: pageParam,
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    /**
     * @inheritdoc
     */
    public getItemsPerPage(): number|undefined|null
    {
        if(!this.route.snapshot.queryParamMap.has(this.itemsPerPageName))
        {
            return null;
        }

        return +this.route.snapshot.queryParamMap.get(this.itemsPerPageName)!;
    }

    /**
     * @inheritdoc
     */
    public setItemsPerPage(itemsPerPage: number|undefined|null): void
    {
        const pageParam: Params = {};

        pageParam[this.itemsPerPageName] = itemsPerPage;

        this.router.navigate(['.'],
        {
            relativeTo: this.route,
            queryParams: pageParam,
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    /**
     * @inheritdoc
     */
    public getOrdering(): unknown|undefined|null
    {
        if(!this.route.snapshot.queryParamMap.has(this.orderingName))
        {
            return null;
        }

        return deserializeFromUrlQuery(this.route.snapshot.queryParamMap.get(this.orderingName)!);
    }

    /**
     * @inheritdoc
     */
    public setOrdering(ordering: unknown|undefined|null): void
    {
        const orderingParam: Params = {};

        orderingParam[this.orderingName] = serializeToUrlQuery(ordering);

        this.router.navigate(['.'],
        {
            relativeTo: this.route,
            queryParams: orderingParam,
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }
}