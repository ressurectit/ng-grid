import {Component, ChangeDetectionStrategy, ViewContainerRef, ViewChild} from '@angular/core';

/**
 * Component that represents grid container
 */
@Component(
{
    selector: '[gridContainer]',
    templateUrl: 'gridContainer.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContainerSAComponent
{
    //######################### protected properties - children #########################

    /**
     * Instance of view container for grid container content
     */
    @ViewChild('container', {static: true, read: ViewContainerRef})
    protected contentViewContainer!: ViewContainerRef;
}