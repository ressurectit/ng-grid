import {Component, ChangeDetectionStrategy, Inject, Optional, HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MergeCssClassesPipe} from '@anglr/common';

import {TableHeaderContentRendererOptions} from '../../tableContentRenderer.interface';
import {HeaderContentRendererAbstractComponent} from '../../../headerContentRendererAbstract.component';
import {HEADER_CONTENT_RENDERER_OPTIONS} from '../../../../../../misc/tokens';
import {CellContextPipe} from '../../../../../../pipes';
import {provideCellContextFactoryFn} from '../../../../../../misc/providers';
import {cellContextFactory} from '../../../../../../misc/utils';
import {OrderableDirective} from '../../../../../../directives';

/**
 * Default options for 'TableHeaderContentRendererComponent'
 */
const defaultOptions: TableHeaderContentRendererOptions =
{
    cssClasses:
    {
        thead: '',
        thDefault: 'header-default',
        spanContent: 'header-content',
    }
};

/**
 * Component used for rendering table header in table content renderer
 * @deprecated use new MatrixGrid with MatrixContentRenderer instead
 */
@Component(
{
    selector: 'thead.content-renderer',
    templateUrl: 'tableHeaderContentRenderer.component.html',
    standalone: true,
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
export class TableHeaderContentRendererSAComponent<TData = unknown> extends HeaderContentRendererAbstractComponent<TData, TableHeaderContentRendererOptions>
{
    //######################### public properties - host #########################

    /**
     * Css class applied to header itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this.ɵoptions.cssClasses.thead;
    }

    //######################### constructor #########################
    constructor(@Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options?: TableHeaderContentRendererOptions,)
    {
        super(defaultOptions, options);
    }
}