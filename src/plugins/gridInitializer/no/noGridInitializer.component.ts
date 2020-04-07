import {ChangeDetectionStrategy, ElementRef, Component, Inject, Optional} from "@angular/core";

import {GridPluginGeneric} from "../../../misc";
import {NoGridInitializerOptions, NoGridInitializer} from "./noGridInitializer.interface";
import {GridPluginInstances} from "../../../components/grid";
import {PagingInitializer} from '../../pagingInitializer';
import {PAGING_INITIALIZER} from '../../pagingInitializer/types';
import {GRID_PLUGIN_INSTANCES} from '../../../components/grid/types';

/**
 * Component used for rendering no grid initializer
 */
@Component(
{
    selector: "ng-no-grid-initializer",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoGridInitializerComponent implements NoGridInitializer, GridPluginGeneric<NoGridInitializerOptions>
{
    //######################### protected fields #########################

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
    public options: NoGridInitializerOptions;

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances)
    {
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
        return null;
    }

    /**
     * Sets current ordering when changed
     * @param ordering - Ordering as string to be stored
     */
    public setOrdering(): void
    {
    }
}