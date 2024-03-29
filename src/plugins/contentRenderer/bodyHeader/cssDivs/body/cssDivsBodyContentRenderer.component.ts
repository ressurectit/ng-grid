import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, HostBinding, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MergeCssClassesSAPipe} from '@anglr/common';

import {CssDivsBodyContentRendererOptions, CssClassesCssDivsBodyContentRenderer} from '../cssDivsContentRenderer.interface';
import {BodyContentRendererAbstractComponent} from '../../bodyContentRendererAbstract.component';
import {GridPluginInstances, TableGridColumn, TableGridMetadata} from '../../../../../interfaces';
import {BODY_CONTENT_RENDERER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../../../misc/tokens';
import {DataCellContextSAPipe, ReadValueSAPipe} from '../../../../../pipes';
import {provideDataCellContextFactoryFn} from '../../../../../misc/providers';
import {dataCellContextFactory} from '../../../../../misc/utils';

/**
 * Default options for 'CssDivsBodyContentRendererComponent'
 */
const defaultOptions: CssDivsBodyContentRendererOptions =
{
    rowClick: null,
    rowCssClass: null,
    cssClasses:
    {
        bodyDiv: 'body-div-contents',
        rowDiv: 'body-row-contents',
        cellDiv: 'body-cell'
    }
};

/**
 * Component used for rendering body for 'CssDivsContentRenderer'
 * @deprecated use new MatrixGrid with MatrixContentRenderer instead
 */
@Component(
{
    selector: 'div.content-renderer-body',
    templateUrl: 'cssDivsBodyContentRenderer.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        ReadValueSAPipe,
        DataCellContextSAPipe,
        MergeCssClassesSAPipe,
    ],
    providers:
    [
        provideDataCellContextFactoryFn(dataCellContextFactory),
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
