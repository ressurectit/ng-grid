import {ChangeDetectionStrategy, ElementRef, Component} from "@angular/core";

import {GridPluginGeneric} from "../../../misc";
import {NoPagingInitializerOptions, NoPagingInitializer} from "./noPagingInitializer.interface";
import {GridPluginInstances} from "../../../components/grid";

/**
 * Component used for rendering no paging initializer
 */
@Component(
{
    selector: "ng-no-paging-initializer",
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPagingInitializerComponent implements NoPagingInitializer, GridPluginGeneric<NoPagingInitializerOptions>
{
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
    public options: NoPagingInitializerOptions;

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
        return null;
    }

    /**
     * Sets current page when changed
     * @param {number} page Page to be set
     */
    public setPage()
    {
    }

    /**
     * Gets initial items per page
     */
    public getItemsPerPage(): number
    {
        return null;
    }

    /**
     * Sets current items per page when changed
     * @param {number} itemsPerPage Items per page to be set
     */
    public setItemsPerPage()
    {
    }
}