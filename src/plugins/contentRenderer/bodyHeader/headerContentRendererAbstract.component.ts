import {ChangeDetectorRef, ElementRef, Directive} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';

import {HeaderContentRenderer, BasicOrderableColumn, HeaderContentRendererOptions, CssClassesHeaderContentRenderer} from './bodyHeaderContentRenderer.interface';
import {GridPlugin} from '../../../interfaces';
import {TableGridMetadata} from '../../../components';
import {GridPluginInstances} from '../../../misc/types';

/**
 * Abstract component for header content renderer
 */
@Directive()
export abstract class HeaderContentRendererAbstractComponent<TData = unknown, TOptions extends HeaderContentRendererOptions<CssClassesHeaderContentRenderer> = HeaderContentRendererOptions<CssClassesHeaderContentRenderer>> implements HeaderContentRenderer<TableGridMetadata<BasicOrderableColumn<TData>>>, GridPlugin<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options for header content renderer
     */
    protected ɵoptions: TOptions;

    //######################### public properties - implementation of TableHeaderContentRenderer #########################

    /**
     * Options for header content renderer
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
     * Metadata used for rendering
     */
    public metadata: TableGridMetadata<BasicOrderableColumn<TData>>|undefined|null;

    //######################### constructor #########################
    constructor(public pluginElement: ElementRef<HTMLElement>,
                public gridPlugins: GridPluginInstances|undefined|null,
                protected changeDetector: ChangeDetectorRef,
                defaultOptions: TOptions,
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