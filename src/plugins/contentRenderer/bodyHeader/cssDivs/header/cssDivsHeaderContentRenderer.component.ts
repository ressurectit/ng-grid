import {Component, ChangeDetectionStrategy, Inject, Optional, HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MergeCssClassesPipe} from '@anglr/common';

import {CssDivsHeaderContentRendererOptions} from '../cssDivsContentRenderer.interface';
import {HeaderContentRendererAbstractComponent} from '../../headerContentRendererAbstract.component';
import {HEADER_CONTENT_RENDERER_OPTIONS} from '../../../../../misc/tokens';
import {CellContextPipe} from '../../../../../pipes';
import {provideCellContextFactoryFn} from '../../../../../misc/providers';
import {cellContextFactory} from '../../../../../misc/utils';
import {OrderableDirective} from '../../../../../directives';

/**
 * Default options for 'CssDivsHeaderContentRendererComponent'
 */
const defaultOptions: CssDivsHeaderContentRendererOptions =
{
    cssClasses:
    {
        headerDiv: 'header-row-contents',
        headerCellDiv: 'header-cell',
        spanContent: 'header-content',
        headerRowDiv: '',
    }
};

/**
 * Component used for rendering css grid header in css grid content renderer
 * @deprecated use new MatrixGrid with MatrixContentRenderer instead
 */
@Component(
{
    selector: 'div.content-renderer-header',
    templateUrl: 'cssDivsHeaderContentRenderer.component.html',
    imports:
    [
        CommonModule,
        CellContextPipe,
        MergeCssClassesPipe,
        OrderableDirective,
    ],
    providers:
    [
        provideCellContextFactoryFn(cellContextFactory),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssDivsHeaderContentRendererComponent<TData = unknown> extends HeaderContentRendererAbstractComponent<TData, CssDivsHeaderContentRendererOptions>
{
    //######################### public properties - hosts #########################

    /**
     * Css class applied to grid itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this.ɵoptions.cssClasses.headerDiv;
    }

    //######################### constructor #########################
    constructor(@Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: CssDivsHeaderContentRendererOptions,)
    {
        super(defaultOptions, options);
    }
}
