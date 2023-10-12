import {ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';

import {NoGridInitializer, NoGridInitializerOptions} from './noGridInitializer.interface';
import {GridPlugin} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';

/**
 * Component used for rendering no grid initializer
 */
@Component(
{
    selector: 'ng-no-grid-initializer',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoGridInitializerSAComponent implements NoGridInitializer, GridPlugin<NoGridInitializerOptions>
{
    //######################### public properties - implementation of NoGridInitializer #########################

    /**
     * @inheritdoc
     */
    public options: NoGridInitializerOptions =
    {
        prefix: '',
    };

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef<HTMLElement>,)
    {
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
        return null;
    }

    /**
     * @inheritdoc
     */
    public setPage(): void
    {
    }

    /**
     * @inheritdoc
     */
    public getItemsPerPage(): number|undefined|null
    {
        return null;
    }

    /**
     * @inheritdoc
     */
    public setItemsPerPage(): void
    {
    }

    /**
     * @inheritdoc
     */
    public getOrdering(): unknown|undefined|null
    {
        return null;
    }

    /**
     * @inheritdoc
     */
    public setOrdering(): void
    {
    }
}