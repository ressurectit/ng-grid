import {ViewContainerRef, ViewChild, inject, Directive} from '@angular/core';

import {ContentRendererInnerStructure, RenderableContent} from '../../interfaces';
import {CONTENT_RENDERER_INNER_STRUCTURE} from '../../misc/tokens';

/**
 * Base class for all renderable content components
 */
@Directive()
export abstract class RenderableContentComponent implements RenderableContent
{
    //######################### protected fields #########################

    /**
     * Instance of class that is used for sharing content renderers inner structure
     */
    protected contentRendererInnerStructure: ContentRendererInnerStructure = inject(CONTENT_RENDERER_INNER_STRUCTURE);

    //######################### protected properties - children #########################

    /**
     * @inheritdoc
     */
    @ViewChild('container', {static: true, read: ViewContainerRef})
    public viewContainer!: ViewContainerRef;
}