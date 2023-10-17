import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents content row container
 */
@Component(
{
    selector: '[contentRowContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentRowContainerSAComponent extends RenderableContentComponent implements OnInit
{
    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        const lastRow = this.contentRendererInnerStructure.contentRowContainer.length - 1;
        this.contentRendererInnerStructure.contentRowContainer[lastRow][this.contentRendererInnerStructure.contentRowContainer[lastRow].length - 1].renderableContent = this;
    }
}