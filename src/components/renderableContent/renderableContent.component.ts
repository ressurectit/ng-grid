import {ViewContainerRef, ViewChild, inject, Directive, OnInit} from '@angular/core';

import {CurrentViewContainer} from '../../interfaces';
import {CONTENT_RENDERER_CURRENT_VIEW_CONTAINER} from '../../misc/tokens';

/**
 * Base class for all renderable content components
 */
@Directive()
export abstract class RenderableContentComponent implements OnInit
{
    //######################### protected fields #########################

    /**
     * Instance of class that is used for sharing content renderers current view container
     */
    protected currentViewContainer: CurrentViewContainer = inject(CONTENT_RENDERER_CURRENT_VIEW_CONTAINER);

    //######################### protected properties - children #########################

    /**
     * View container available for container element
     */
    @ViewChild('container', {static: true, read: ViewContainerRef})
    protected viewContainer!: ViewContainerRef;

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.currentViewContainer.viewContainer = this.viewContainer;
    }
}