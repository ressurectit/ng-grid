import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, HostBinding, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CssDivsBodyContentRendererOptions, CssClassesCssDivsBodyContentRenderer} from '../cssDivsContentRenderer.interface';
import {BodyContentRendererAbstractComponent} from '../../bodyContentRendererAbstract.component';
import {TableGridMetadata} from '../../../../../components/tableGridMetadataGatherer/tableGridMetadataGatherer.interface';
import {TableGridColumn} from '../../../../../interfaces';
import {BODY_CONTENT_RENDERER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../../../misc/tokens';
import {GridPluginInstances} from '../../../../../misc/types';

/**
 * Default options for 'CssDivsBodyContentRendererComponent'
 */
const defaultOptions: CssDivsBodyContentRendererOptions =
{
    cssClasses:
    {
        bodyDiv: 'body-div-contents',
        rowDiv: 'body-row-contents',
        cellDiv: 'body-cell'
    }
};

/**
 * Component used for rendering body for 'CssDivsContentRenderer'
 */
@Component(
{
    selector: 'div.content-renderer-body',
    templateUrl: 'cssDivsBodyContentRenderer.component.html',
    styleUrl: 'cssDivsBodyContentRenderer.component.css',
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CssDivsBodyContentRendererSAComponent<TData = unknown> extends BodyContentRendererAbstractComponent<TData, CssClassesCssDivsBodyContentRenderer, CssDivsBodyContentRendererOptions, TableGridMetadata<TableGridColumn<TData>>>
{
    //######################### public properties - host bindings #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this.ɵoptions.cssClasses.bodyDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins, defaultOptions, options);
    }
}
