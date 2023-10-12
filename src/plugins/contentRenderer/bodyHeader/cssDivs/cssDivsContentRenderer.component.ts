import {Component, ChangeDetectionStrategy, Inject, Optional, OnDestroy, ElementRef, ChangeDetectorRef, forwardRef, HostBinding} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {CommonDynamicModule} from '@anglr/common';
import {isArray} from '@jscrpt/common';

import {BodyHeaderContentRendererAbstractComponent} from '../bodyHeaderContentRendererAbstract.component';
import {CssDivsContentRendererOptions} from './cssDivsContentRenderer.interface';
import {GridMetadata, TableGridColumn} from '../../../../interfaces';
import {CONTENT_RENDERER_OPTIONS, GRID_PLUGIN_INSTANCES} from '../../../../misc/tokens';
import {GridPluginInstances} from '../../../../misc/types';
import {TableGridMetadata} from '../../../../components/tableGridMetadataGatherer/tableGridMetadataGatherer.interface';
import {CssDivsBodyContentRendererSAComponent} from './body/cssDivsBodyContentRenderer.component';
import {CssDivsHeaderContentRendererSAComponent} from './header/cssDivsHeaderContentRenderer.component';
import {ResolveForwardRefSAPipe} from '../../../../pipes';

/**
 * Default options for 'CssDivsContentRendererComponent'
 */
const defaultOptions: CssDivsContentRendererOptions =
{
    cssClasses:
    {
        containerDiv: 'css-grid-table'
    },
    plugins:
    {
        bodyRenderer:
        {
            type: forwardRef(() => CssDivsBodyContentRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
        },
        headerRenderer:
        {
            type: forwardRef(() => CssDivsHeaderContentRendererSAComponent),
            instance: null,
            instanceCallback: null,
            options: null,
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
    styleUrl: 'cssDivsContentRenderer.component.css',
    standalone: true,
    imports:
    [
        CommonDynamicModule,
        ResolveForwardRefSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CssDivsContentRendererSAComponent<TData = unknown, TMetadata extends GridMetadata = GridMetadata> extends BodyHeaderContentRendererAbstractComponent<TData, TMetadata, CssDivsContentRendererOptions> implements OnDestroy
{
    //######################### protected properties #########################

    /**
     * Concatenated string with width of all visible columns
     */
    protected ɵgridTemplateColumns: string = '';
    
    //######################### public properties - host bindings #########################

    /**
     * Sanitized value for grid template columns
     */
    @HostBinding('style.grid-template-columns')
    public get gridTemplateColumns(): SafeStyle
    {
        return this._sanitizer.bypassSecurityTrustStyle(this.ɵgridTemplateColumns);
    }

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public override get cssClass(): string
    {
        return this.ɵoptions.cssClasses.containerDiv;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                protected _sanitizer: DomSanitizer,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances|undefined|null,
                @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: CssDivsContentRendererOptions,
                protected changeDetector?: ChangeDetectorRef)
    {
        super(pluginElement, gridPlugins, defaultOptions, options);
    }

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public override initialize(force: boolean): void
    {
        super.initialize(force);

        this.setGridColumnsWidth();

        this.metadataSelector
            ?.metadataChange
            .subscribe(() =>
                {
                    this.setGridColumnsWidth();
                }
            );
    }

    //######################### protected methods #########################

    /**
     * Set grid template column value for visible columns
     */
    protected setGridColumnsWidth(): void
    {
        const metadata: TableGridMetadata<TableGridColumn<TData>> = <unknown>this.metadataSelector?.metadata as TableGridMetadata<TableGridColumn<TData>>;

        if (isArray(metadata.columns))
        {
            const gridTemplateColumns: string[] = [];

            metadata.columns.forEach(column => 
            {
                if (column.visible)
                {
                    gridTemplateColumns.push(column.width ? column.width : 'auto');
                }
            });
            
            this.ɵgridTemplateColumns = gridTemplateColumns.join(' ');
            
            setTimeout(() =>
            {
                this.changeDetector?.markForCheck();
            });
        }
    }
}
