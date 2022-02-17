import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject, HostBinding, ElementRef} from '@angular/core';
import {extend} from '@jscrpt/common';

import {CssDivsBodyContentRendererOptions, CssClassesCssDivsBodyContentRenderer} from '../cssDivsContentRenderer.interface';
import {BasicTableMetadata, BasicTableColumn} from '../../../../components/metadata';
import {GridPluginInstances} from '../../../../components/grid';
import {GRID_PLUGIN_INSTANCES} from '../../../../components/grid/types';
import {BODY_CONTENT_RENDERER_OPTIONS} from '../../types';
import {BodyContentRendererAbstractComponent} from '../../bodyContentRendererAbstract.component';

/**
 * Default options for 'CssDivsBodyContentRendererComponent'
 * @internal
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
    templateUrl: 'CssDivsBodyContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `:host.body-div-contents
        {
            display: contents;
        }

        .body-row-contents
        {
            display: contents;
        }

        .body-row:nth-of-type(2n+0) > .body-cell
        {
            background-color: #f9f9f9;
        }

        .body-row:hover > .body-cell
        {
            background-color: #f5f5f5;
        }

        .body-cell
        {
            padding: 3px;
            line-height: 1.42857143;
            vertical-align: middle;
            border-top: 1px solid #ddd;
        }
        `
    ]
})
export class CssDivsBodyContentRendererComponent<TData = any> extends BodyContentRendererAbstractComponent<TData, CssDivsBodyContentRendererOptions, BasicTableMetadata<BasicTableColumn<TData>>, CssClassesCssDivsBodyContentRenderer>
{
    //######################### public properties - host bindings #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.bodyDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsBodyContentRendererOptions)
    {
        super(pluginElement, changeDetector, gridPlugins);

        this._options = extend(true, {}, defaultOptions, options);
    }
}
