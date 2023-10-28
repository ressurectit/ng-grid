import {Component, ChangeDetectionStrategy} from '@angular/core';

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
export class HeaderContainerSAComponent extends RenderableContentComponent
{
}