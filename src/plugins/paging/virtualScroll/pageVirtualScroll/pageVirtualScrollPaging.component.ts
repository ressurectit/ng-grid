import {Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Inject, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {extend} from '@jscrpt/common';

import {GridPluginInstances} from '../../../../components/grid';
import {GRID_PLUGIN_INSTANCES} from '../../../../components/grid/types';
import {BodyContentRenderer} from '../../../contentRenderer';
import {BODY_CONTENT_RENDERER} from '../../../contentRenderer/types';
import {PAGING_OPTIONS} from '../../types';
import {VirtualScrollPagingAbstractComponent} from '../virtualScrollPagingAbstract.component';
import {PageVirtualScrollPagingOptions, PageVirtualScrollPaging} from './pageVirtualScrollPaging.interface';

/**
 * Default options for paging
 * @internal
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageVirtualScrollPagingComponent extends VirtualScrollPagingAbstractComponent<PageVirtualScrollPagingOptions> implements PageVirtualScrollPaging
{
    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(DOCUMENT) private _document: any,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins?: GridPluginInstances,
                @Inject(PAGING_OPTIONS) @Optional() options?: PageVirtualScrollPagingOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods #########################

    /**
     * Method that initialize paging component, this method can be used for initialization if paging used dynamicaly
     */
    public initialize()
    {
        super.initialize();

        let bodyRenderer: BodyContentRenderer<any, any> = this.gridPlugins[BODY_CONTENT_RENDERER] as BodyContentRenderer<any, any>;

        this._initEvents(<any>this._document.scrollingElement, bodyRenderer.pluginElement.nativeElement, this._document);
    }
}