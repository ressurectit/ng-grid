import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents header container
 */
@Component(
{
    selector: '[headerContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerSAComponent extends RenderableContentComponent implements OnInit
{
    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.contentRendererInnerStructure.headerContainer.renderableContent = this;
    }
}