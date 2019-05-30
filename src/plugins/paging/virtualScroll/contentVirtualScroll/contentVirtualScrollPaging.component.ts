import {Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional, OnDestroy} from '@angular/core';
import {extend, isPresent} from '@jscrpt/common';

import {GridPluginInstances} from '../../../../components/grid';
import {GRID_PLUGIN_INSTANCES} from '../../../../components/grid/types';
import {ContentRenderer, CONTENT_RENDERER, BodyContentRenderer, BODY_CONTENT_RENDERER} from '../../../contentRenderer';
import {PAGING_OPTIONS} from '../../types';
import {VirtualScrollPagingAbstractComponent} from '../virtualScrollPagingAbstract.component';
import {ContentVirtualScrollPagingOptions, ContentVirtualScrollPaging} from './contentVirtualScrollPaging.interface';

/**
 * Default options for paging
 * @internal
 */
const defaultOptions: ContentVirtualScrollPagingOptions =
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
    selector: 'content-virtual-scroll-paging',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentVirtualScrollPagingComponent extends VirtualScrollPagingAbstractComponent<ContentVirtualScrollPagingOptions> implements ContentVirtualScrollPaging, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Original style that is restored when paging is destroyed
     */
    protected _originalStyle: {overflowY: string, maxHeight: string};

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: ContentVirtualScrollPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._originalStyle)
        {
            let contentRenderer: ContentRenderer<any> = this.gridPlugins[CONTENT_RENDERER] as ContentRenderer<any>;
            let element: HTMLElement = contentRenderer.pluginElement.nativeElement;

            element.style.maxHeight = this._originalStyle.maxHeight;
            element.style.overflowY = this._originalStyle.overflowY;
        }

        super.ngOnDestroy();
    }

    //######################### public methods #########################

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize()
    {
        super.initialize();

        let contentRenderer: ContentRenderer<any> = this.gridPlugins[CONTENT_RENDERER] as ContentRenderer<any>;
        let bodyRenderer: BodyContentRenderer<any, any> = this.gridPlugins[BODY_CONTENT_RENDERER] as BodyContentRenderer<any, any>;
        let element: HTMLElement = contentRenderer.pluginElement.nativeElement;

        this._originalStyle =
        {
            maxHeight: element.style.maxHeight,
            overflowY: element.style.overflowY
        };

        element.style.overflowY = "auto";
        
        if(isPresent(this._options.maxHeight))
        {
            element.style.maxHeight = this._options.maxHeight;
        }

        this._initEvents(element, bodyRenderer.pluginElement.nativeElement);
    }
}