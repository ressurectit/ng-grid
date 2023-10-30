import {ChangeDetectionStrategy, Component, ElementRef, ChangeDetectorRef, Optional, Inject} from '@angular/core';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {NoPagingOptions, NoPaging} from './noPaging.interface';
import {GRID_PLUGIN_INSTANCES, PAGING_OPTIONS} from '../../../misc/tokens';
import {GridPluginInstances} from '../../../interfaces';

/**
 * Default options for paging
 */
const defaultOptions: NoPagingOptions =
{
    initialItemsPerPage: NaN,
    initialPage: 1,
    cssClasses: {},
};

/**
 * Component used for no paging
 */
@Component(
{
    selector: 'ng-no-paging',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPagingSAComponent extends PagingAbstractComponent<unknown, NoPagingOptions> implements NoPaging
{
    //######################### public properties - implementation of NoPaging #########################

    /**
     * @inheritdoc
     */
    public firstItemIndex: number = 0;

    /**
     * @inheritdoc
     */
    public page: number = 1;

    /**
     * @inheritdoc
     */
    public itemsPerPage: number = NaN;

    /**
     * @inheritdoc
     */
    public totalCount: number = 0;

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(PAGING_OPTIONS) @Optional() options?: NoPagingOptions,)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);
    }
}