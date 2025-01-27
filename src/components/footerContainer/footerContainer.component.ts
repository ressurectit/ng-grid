import {Component, ChangeDetectionStrategy} from '@angular/core';

import {RenderableContentComponent} from '../renderableContent/renderableContent.component';

/**
 * Component that represents footer container
 */
@Component(
{
    selector: '[footerContainer]',
    templateUrl: '../renderableContent/renderableContent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterContainerComponent extends RenderableContentComponent
{
}