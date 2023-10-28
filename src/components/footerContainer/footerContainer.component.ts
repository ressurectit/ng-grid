import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents footer container
 */
@Component(
{
    selector: '[footerContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterContainerSAComponent extends RenderableContentComponent
{
}