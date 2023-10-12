import {ChangeDetectorRef, ElementRef, Directive} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';

import {BodyContentRenderer, BodyContentRendererOptions} from './bodyHeaderContentRenderer.interface';
import {GridPlugin, Paging} from '../../../interfaces';
import {GridPluginInstances} from '../../../misc/types';
import {GridPluginType} from '../../../misc/enums';

//TODO - compute classes before rendering
//TOOD - mergeClasses as pipe

/**
 * Abstract component for body content renderer
 */
@Directive()
export class BodyContentRendererAbstractComponent<TData = unknown, TCssClasses = unknown, TOptions extends BodyContentRendererOptions<TCssClasses> = BodyContentRendererOptions<TCssClasses>, TMetadata = unknown> implements BodyContentRenderer<TData, TMetadata>, GridPlugin<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for body content renderer
     */
    protected ɵoptions: TOptions;

    //######################### public properties - template bindings #########################

    /**
     * Starting index of currently displayed items
     */
    public startingIndex: number = 0;

    //######################### public properties - implementation of BodyContentRenderer #########################

    /**
     * Options for body content renderer
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
     * Data that are rendered
     */
    public data: TData[] = [];

    /**
     * Metadata used for rendering
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
        if(!this.gridPlugins)
        {
            throw new Error('BodyContentRendererAbstractComponent: missing gridPlugins!');
        }

        this.startingIndex = (this.gridPlugins[GridPluginType.Paging] as Paging).firstItemIndex;
        this._changeDetector.detectChanges();
    }

    //######################### public methods - template bindings #########################

    /**
     * Merges css classes specified as strings
     */
    public mergeStringClasses(...classes: string[]): string[]
    {
        const result: string[] = [];

        classes.forEach(cls => cls ? (result.push(cls)) : null);

        return result;
    }
}