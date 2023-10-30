import {ElementRef} from '@angular/core';
import {Invalidatable, PromiseOr, RecursivePartial} from '@jscrpt/common';

import {GridPluginInstances} from '../gridPluginInstances/gridPluginInstances.interface';

/**
 * Grid plugin interface
 */
export interface GridPlugin<TOptions = unknown> extends Invalidatable
{
    /**
     * Grid plugin instances available for this plugin
     */
    gridPlugins: GridPluginInstances|undefined|null;

    /**
     * Element that represents plugin
     */
    readonly pluginElement: ElementRef<HTMLElement>;

    /**
     * Options for grid plugin
     */
    get options(): TOptions;
    set options(value: RecursivePartial<TOptions>);

    /**
     * Initialize plugin, to be ready to use, initialize communication with other plugins
     * @param force - Indication that plugin should be fully reinitialized, even thou nothing has changed
     */
    initialize(force: boolean): PromiseOr<void>;

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    initOptions(): PromiseOr<void>;
}