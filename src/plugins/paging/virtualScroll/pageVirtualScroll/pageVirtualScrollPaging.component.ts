import {Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {VirtualScrollPagingAbstractComponent} from '../virtualScrollPagingAbstract.component';
import {PageVirtualScrollPagingOptions, PageVirtualScrollPaging} from './pageVirtualScrollPaging.interface';
import {GRID_PLUGIN_INSTANCES, PAGING_OPTIONS} from '../../../../misc/tokens';
import {GridPluginType} from '../../../../misc/enums';
import {BodyContentRenderer} from '../../../contentRenderer/bodyHeader/bodyHeaderContentRenderer.interface';
import {GridPluginInstances} from '../../../../interfaces';

/**
 * Default options for paging
 */
const defaultOptions: PageVirtualScrollPagingOptions =
{
    initialItemsPerPage: 10,
    initialPage: 1,
    loadOffsetTreshold: 0.75,
    cssClasses:
    {
    }
};

/**
 * Paging that uses scrolling to load data
 */
@Component(
{
    selector: 'page-virtual-scroll-paging',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageVirtualScrollPagingSAComponent extends VirtualScrollPagingAbstractComponent<PageVirtualScrollPagingOptions> implements PageVirtualScrollPaging
{
    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(DOCUMENT) protected document: Document,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(PAGING_OPTIONS) @Optional() options?: PageVirtualScrollPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);
    }

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public override async initialize(force: boolean): Promise<void>
    {
        if(!this.gridPlugins)
        {
            throw new Error('PageVirtualScrollPagingSAComponent: missing gridPlugins!');
        }

        await super.initialize(force);

        const bodyRenderer: BodyContentRenderer = this.gridPlugins['BODY_CONTENT_RENDERER' as unknown as GridPluginType] as BodyContentRenderer;

        if(!this.document.scrollingElement)
        {
            throw new Error('PageVirtualScrollPagingSAComponent: missing scrolling element!');
        }

        this.initEvents(this.document.scrollingElement, bodyRenderer.pluginElement.nativeElement, this.document);
    }
}