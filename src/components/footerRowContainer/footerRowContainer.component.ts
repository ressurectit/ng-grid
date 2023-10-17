import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents footer row container
 */
@Component(
{
    selector: '[footerRowContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterRowContainerSAComponent extends RenderableContentComponent implements OnInit
{
    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.contentRendererInnerStructure.footerRowContainer[this.contentRendererInnerStructure.footerRowContainer.length - 1].renderableContent = this;
    }
}