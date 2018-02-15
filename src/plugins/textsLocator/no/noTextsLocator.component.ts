import {Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject} from "@angular/core";

import {GridPluginGeneric} from "../../../misc";
import {TextsLocator, TextsLocatorOptions} from "../textsLocator.interface";
import {GridPluginInstances, GRID_PLUGIN_INSTANCES} from "../../../components/grid";

/**
 * Component used for rendering no texts locator
 */
@Component(
{
    selector: 'ng-no-texts-locator',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoTextsLocatorComponent implements TextsLocator, GridPluginGeneric<TextsLocatorOptions>
{
    //######################### public properties - implementation of TextsLocator #########################

    /**
     * Options for grid plugin
     */
    public options: TextsLocatorOptions;

    /**
     * Indication that texts should be obtained again, because they have changed
     */
    public textsChange: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) public gridPlugins: GridPluginInstances,
                public pluginElement: ElementRef)
    {
    }

    //######################### public methods - implementation of TextsLocator #########################

    /**
     * Gets text for specified key
     */
    public getText(key: string): string
    {
        return key;
    }

    /**
     * Initialize plugin, to be ready to use
     */
    public initialize()
    {
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
    }
}