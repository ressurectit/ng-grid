import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents content row container
 */
@Component(
{
    selector: '[contentRowContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentRowContainerComponent extends RenderableContentComponent
{
}
