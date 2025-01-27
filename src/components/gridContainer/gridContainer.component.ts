import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents grid container
 */
@Component(
{
    selector: '[gridContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContainerComponent extends RenderableContentComponent
{
}
