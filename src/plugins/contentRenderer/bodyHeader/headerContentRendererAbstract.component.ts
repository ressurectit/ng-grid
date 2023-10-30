import {ChangeDetectorRef, ElementRef, Directive, inject} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';

import {HeaderContentRenderer, HeaderContentRendererOptions, CssClassesHeaderContentRenderer} from './bodyHeaderContentRenderer.interface';
import {GridPlugin, GridPluginInstances, TableGridColumn, TableGridMetadata} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES} from '../../../misc/tokens';

/**
 * Abstract component for header content renderer
 * @deprecated use new MatrixGrid with MatrixContentRenderer instead
 */
@Directive()
export abstract class HeaderContentRendererAbstractComponent<TData = unknown, TOptions extends HeaderContentRendererOptions<CssClassesHeaderContentRenderer> = HeaderContentRendererOptions<CssClassesHeaderContentRenderer>> implements HeaderContentRenderer<TableGridMetadata<TableGridColumn<TData>>>, GridPlugin<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for header content renderer
     */
    protected ɵoptions: TOptions;

    /**
     * Instance of change detector
     */
    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    //######################### public properties - implementation of TableHeaderContentRenderer #########################

    /**
     * @inheritdoc
     */
    public get options(): TOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<TOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options) as TOptions;
    }

    /**
     * @inheritdoc
     */
    public metadata: TableGridMetadata<TableGridColumn<TData>>|undefined|null;

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null = inject(GRID_PLUGIN_INSTANCES, {optional: true});

    //######################### constructor #########################
    constructor(defaultOptions: TOptions,
                options?: TOptions,)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of TableHeaderContentRenderer #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.detectChanges();
    }

    /**
     * @inheritdoc
     */
    public initialize(_force: boolean): void
    {
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
    }
}