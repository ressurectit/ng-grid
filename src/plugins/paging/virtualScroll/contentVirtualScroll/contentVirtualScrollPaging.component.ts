import {Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional, OnDestroy} from '@angular/core';
import {isPresent} from '@jscrpt/common';

import {VirtualScrollPagingAbstractComponent} from '../virtualScrollPagingAbstract.component';
import {ContentVirtualScrollPagingOptions, ContentVirtualScrollPaging} from './contentVirtualScrollPaging.interface';
import {GRID_PLUGIN_INSTANCES, PAGING_OPTIONS} from '../../../../misc/tokens';
import {GridPluginType} from '../../../../misc/enums';
import {ContentRenderer, GridPluginInstances} from '../../../../interfaces';
import {BodyContentRenderer} from '../../../contentRenderer/bodyHeader/bodyHeaderContentRenderer.interface';

/**
 * Default options for paging
 */
const defaultOptions: ContentVirtualScrollPagingOptions =
{
    maxHeight: '70vh',
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
    selector: 'content-virtual-scroll-paging',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentVirtualScrollPagingSAComponent extends VirtualScrollPagingAbstractComponent<ContentVirtualScrollPagingOptions> implements ContentVirtualScrollPaging, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Original style that is restored when paging is destroyed
     */
    protected originalStyle: {overflowY: string, maxHeight: string}|undefined|null;

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(PAGING_OPTIONS) @Optional() options?: ContentVirtualScrollPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public override ngOnDestroy(): void
    {
        if(!this.gridPlugins)
        {
            throw new Error('ContentVirtualScrollPagingSAComponent: missing gridPlugins!');
        }

        if(this.originalStyle)
        {
            const contentRenderer: ContentRenderer = this.gridPlugins[GridPluginType.ContentRenderer] as ContentRenderer;
            const element: HTMLElement = contentRenderer.pluginElement.nativeElement;

            element.style.maxHeight = this.originalStyle.maxHeight;
            element.style.overflowY = this.originalStyle.overflowY;
        }

        super.ngOnDestroy();
    }

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public override async initialize(force: boolean): Promise<void>
    {
        if(!this.gridPlugins)
        {
            throw new Error('ContentVirtualScrollPagingSAComponent: missing gridPlugins!');
        }

        await super.initialize(force);

        const contentRenderer: ContentRenderer = this.gridPlugins[GridPluginType.ContentRenderer] as ContentRenderer;
        const bodyRenderer: BodyContentRenderer = this.gridPlugins['BODY_CONTENT_RENDERER' as unknown as GridPluginType] as BodyContentRenderer;
        const element: HTMLElement = contentRenderer.pluginElement.nativeElement;

        this.originalStyle =
        {
            maxHeight: element.style.maxHeight,
            overflowY: element.style.overflowY
        };

        element.style.overflowY = 'auto';
        
        if(isPresent(this.ɵoptions.maxHeight))
        {
            element.style.maxHeight = this.ɵoptions.maxHeight;
        }

        this.initEvents(element, bodyRenderer.pluginElement.nativeElement);
    }
}