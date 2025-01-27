import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents header container
 */
@Component(
{
    selector: '[headerContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerComponent extends RenderableContentComponent
{
}
