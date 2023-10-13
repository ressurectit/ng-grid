import {ChangeDetectorRef, ElementRef, Directive} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';

import {BodyContentRenderer, BodyContentRendererOptions} from './bodyHeaderContentRenderer.interface';
import {GridPlugin} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';

/**
 * Abstract component for body content renderer
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