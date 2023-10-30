import {ChangeDetectorRef, ElementRef, Directive} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';

import {BodyContentRenderer, BodyContentRendererOptions} from './bodyHeaderContentRenderer.interface';
import {GridPlugin, GridPluginInstances} from '../../../interfaces';

/**
 * Abstract component for body content renderer
 * @deprecated use new MatrixGrid with MatrixContentRenderer instead
 */
@Directive()
export class BodyContentRendererAbstractComponent<TData = unknown, TCssClasses = unknown, TOptions extends BodyContentRendererOptions<TData, TCssClasses> = BodyContentRendererOptions<TData, TCssClasses>, TMetadata = unknown> implements BodyContentRenderer<TData, TMetadata>, GridPlugin<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for body content renderer
     */
    protected ɵoptions: TOptions;

    //######################### public properties - implementation of BodyContentRenderer #########################

    /**
     * @inheritdoc
     */
    public get options(): TOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<TOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
    }

    /**
     * @inheritdoc
     */
    public data: TData[] = [];

    /**
     * @inheritdoc
     */
    public metadata: TMetadata|undefined|null;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef,
                protected _changeDetector: ChangeDetectorRef,
                public gridPlugins: GridPluginInstances|undefined|null,
                defaultOptions: TOptions,
                options?: TOptions,)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of CssDivsBodyContentRenderer<TData, BasicTableColumn> #########################

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

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}