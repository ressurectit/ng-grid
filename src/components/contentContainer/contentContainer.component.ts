import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents content container
 */
@Component(
{
    selector: '[contentContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentContainerSAComponent extends RenderableContentComponent
{
}