import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents grid container
 */
@Component(
{
    selector: '[gridContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContainerSAComponent extends RenderableContentComponent
{
}