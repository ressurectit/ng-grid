import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, ElementRef, ChangeDetectorRef, forwardRef, HostBinding} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {extend, isArray} from "@jscrpt/common";

import {BasicTableMetadata, BasicTableColumn} from "../../../components/metadata";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {PluginDescription} from "../../../misc";
import {CONTENT_RENDERER_OPTIONS} from "../types";
import {ContentRendererAbstractComponent} from "../contentRendererAbstract.component";
import {CssDivsContentRendererOptions} from "./cssDivsContentRenderer.interface";
import {CssDivsBodyContentRendererComponent} from "./body/cssDivsBodyContentRenderer.component";
import {CssDivsHeaderContentRendererComponent} from "./header/cssDivsHeaderContentRenderer.component";

/**
 * Default options for 'CssDivsContentRendererComponent'
 * @internal
 */
const defaultOptions: CssDivsContentRendererOptions =
{
    cssClasses:
    {
        containerDiv: 'css-grid-table'
    },
    plugins:
    {
        bodyRenderer: <PluginDescription<CssDivsBodyContentRendererComponent>>
        {
            type: forwardRef(() => CssDivsBodyContentRendererComponent)
        },
        headerRenderer: <PluginDescription<CssDivsHeaderContentRendererComponent>>
        {
            type: forwardRef(() => CssDivsHeaderContentRendererComponent)
        }
    }
};

/**
 * Component used for 'CssDivsContentRendererComponent'
 */
@Component(
{
    selector: 'div.css-grid-content-renderer',
    templateUrl: 'cssDivsContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        :host.css-grid-table
        {
            display: grid;
        }
    `]
})
export class CssDivsContentRendererComponent<TOrdering = any, TData = any, TMetadata = any> extends ContentRendererAbstractComponent<TOrdering, TData, TMetadata, CssDivsContentRendererOptions> implements OnDestroy
{
    //######################### private properties #########################

    /**
     * Concatenated string with width of all visible columns
     */
    private _gridTemplateColumns: string = "";
    
    //######################### public properties - host bindings #########################

    /**
     * Sanitized value for grid template columns
     */
    @HostBinding('style.grid-template-columns')
    public get gridTemplateColumns(): SafeStyle
    {
        return this._sanitizer.bypassSecurityTrustStyle(this._gridTemplateColumns);
    }

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.containerDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                private _sanitizer: DomSanitizer,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: CssDivsContentRendererOptions,
                private _changeDetector?: ChangeDetectorRef)
    {
        super(pluginElement, gridPlugins);
        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods #########################

    /**
     * Initiliaze Content Renderer plugin
     */
    public initialize()
    {
        super.initialize();

        this._setGridColumnsWidth();

        this._metadataSelector
            .metadataChange
            .subscribe(() =>
                {
                    this._setGridColumnsWidth();
                }
            );
    }

    //######################### private methods #########################

    /**
     * Set grid template column value for visible columns
     */
    private _setGridColumnsWidth()
    {
        let metadata: BasicTableMetadata<BasicTableColumn<TData>> = <any>this._metadataSelector.metadata;

        if (isArray(metadata.columns))
        {
            let gridTemplateColumns: string[] = [];
            metadata.columns.forEach(column => {
                if (column.visible)
                {
                    gridTemplateColumns.push(column.width ? column.width : 'auto');
                }
            });
            this._gridTemplateColumns = gridTemplateColumns.join(" ");
            
            setTimeout(() =>
            {
                this._changeDetector.markForCheck();
            });
        }
    }
}
