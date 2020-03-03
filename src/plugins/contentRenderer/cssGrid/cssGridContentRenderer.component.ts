import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, ElementRef, ChangeDetectorRef, forwardRef, HostBinding, SkipSelf} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {extend, isArray} from "@jscrpt/common";

import {BasicTableMetadata, BasicTableColumn} from "../../../components/metadata";
import {GridPluginInstances} from "../../../components/grid";
import {GRID_PLUGIN_INSTANCES} from "../../../components/grid/types";
import {PluginDescription} from "../../../misc";
import {CONTENT_RENDERER_OPTIONS} from "../types";
import {ContentRendererAbstractComponent} from "../contentRendererAbstract.component";
import {CssGridContentRendererOptions} from "./cssGridContentRenderer.interface";
import {CssGridBodyContentRendererComponent} from "./body/cssGridBodyContentRenderer.component";
import {CssGridHeaderContentRendererComponent} from "./header/cssGridHeaderContentRenderer.component";

/**
 * Default options for 'CssGridContentRendererComponent'
 * @internal
 */
const defaultOptions: CssGridContentRendererOptions =
{
    cssClasses:
    {
        gridDiv: 'css-grid-table'
    },
    plugins:
    {
        bodyRenderer: <PluginDescription<CssGridBodyContentRendererComponent<any>>>
        {
            type: forwardRef(() => CssGridBodyContentRendererComponent)
        },
        headerRenderer: <PluginDescription<CssGridHeaderContentRendererComponent<any>>>
        {
            type: forwardRef(() => CssGridHeaderContentRendererComponent)
        }
    }
};

/**
 * Component used for 'CssGridContentRendererComponent'
 */
@Component(
{
    selector: 'div.css-grid-content-renderer',
    templateUrl: 'cssGridContentRenderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        :host
        {
            display: grid;
        }
    `]
})
export class CssGridContentRendererComponent<TOrdering, TData, TMetadata> extends ContentRendererAbstractComponent<TOrdering, TData, TMetadata, CssGridContentRendererOptions> implements OnDestroy
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

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                private _sanitizer: DomSanitizer,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: CssGridContentRendererOptions,
                @SkipSelf() private _gridChangeDetector?: ChangeDetectorRef)
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
        this._gridChangeDetector.detectChanges();

        this._metadataSelector
            .metadataChange
            .subscribe(() =>
                {
                    this._setGridColumnsWidth();
                    this._gridChangeDetector.detectChanges();
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
        }
    }
}
