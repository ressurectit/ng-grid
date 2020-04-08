import {ChangeDetectionStrategy, Component, ElementRef} from "@angular/core";

import {GridPluginInstances} from "../../../components/grid";
import {GridPluginGeneric} from "../../../misc";
import {NoGridInitializer, NoGridInitializerOptions} from "./noGridInitializer.interface";


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
    //######################### public properties - implementation of NoGridInitializer #########################

    /**
     * Element that represents plugin
     */
    public pluginElement: ElementRef;

    /**
     * Options for grid plugin
     */
    public options: NoGridInitializerOptions;

    /**
     * Grid plugin instances available for this plugin
     */
    public gridPlugins: GridPluginInstances;

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
        return null;
    }

    /**
     * Sets current page when changed
     * @param page - Page to be stored
     */
    public setPage()
    {
    }

    /**
     * Gets stored items per page
     */
    public getItemsPerPage(): number
    {
        return null;
    }

    /**
     * Sets current items per page when changed
     * @param itemsPerPage - Items per page to be stored
     */
    public setItemsPerPage()
    {
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