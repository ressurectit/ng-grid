import {Component, ChangeDetectionStrategy, ViewContainerRef, ViewChild, inject, OnInit} from '@angular/core';

import {ContentRendererCurrentViewContainer} from '../../interfaces';
import {CONTENT_RENDERER_CURRENT_VIEW_CONTAINER} from '../../misc/tokens';

/**
 * Component that represents content container
 */
@Component(
{
    selector: '[contentContainer]',
    templateUrl: 'contentContainer.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentContainerSAComponent implements OnInit
{
    //######################### protected fields #########################

    /**
     * Instance of class that is used for sharing current view container
     */
    protected contentRendererViewContainer: ContentRendererCurrentViewContainer = inject(CONTENT_RENDERER_CURRENT_VIEW_CONTAINER);

    //######################### protected properties - children #########################

    /**
     * Instance of view container for content container content
     */
    @ViewChild('container', {static: true, read: ViewContainerRef})
    protected contentViewContainer!: ViewContainerRef;

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.contentRendererViewContainer.viewContainer = this.contentViewContainer;
    }
}