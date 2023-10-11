import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CssDivsHeaderContentRendererOptions} from '../cssDivsContentRenderer.interface';
import {HeaderContentRendererAbstractComponent} from '../../headerContentRendererAbstract.component';
import {GRID_PLUGIN_INSTANCES, HEADER_CONTENT_RENDERER_OPTIONS} from '../../../../../misc/tokens';
import {GridPluginInstances} from '../../../../../misc/types';

/**
 * Default options for 'CssDivsHeaderContentRendererComponent'
 */
const defaultOptions: CssDivsHeaderContentRendererOptions =
{
    cssClasses:
    {
        headerDiv: 'header-row-contents',
        headerCellDiv: 'header-cell',
        headerCellOrderableDiv: 'header-orderable',
        spanContent: 'header-content',
        spanOrdering: 'header-ordering',
        headerRowDiv: '',
    }
};

/**
 * Component used for rendering css grid header in css grid content renderer
 */
@Component(
{
    selector: 'div.content-renderer-header',
    templateUrl: 'cssDivsHeaderContentRenderer.component.html',
    styleUrls: ['cssDivsHeaderContentRenderer.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssDivsHeaderContentRendererSAComponent<TData = unknown> extends HeaderContentRendererAbstractComponent<TData, CssDivsHeaderContentRendererOptions>
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this.ɵoptions.cssClasses.headerDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsHeaderContentRendererOptions,)
    {
        super(pluginElement, gridPlugins, changeDetector, defaultOptions, options);
    }
}
