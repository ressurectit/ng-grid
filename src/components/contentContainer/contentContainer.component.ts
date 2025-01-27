import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents content container
 */
@Component(
{
    selector: '[contentContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentContainerComponent extends RenderableContentComponent
{
}
