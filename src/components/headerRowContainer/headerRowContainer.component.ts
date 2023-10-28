import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents header row container
 */
@Component(
{
    selector: '[headerRowContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderRowContainerSAComponent extends RenderableContentComponent
{
}