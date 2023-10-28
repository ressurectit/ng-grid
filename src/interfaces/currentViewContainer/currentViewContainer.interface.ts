import {ViewContainerRef} from '@angular/core';

/**
 * Type that allows storing and sharing view container of 'container' element
 */
export interface CurrentViewContainer
{
    /**
     * View container that is used for rendering content of 'container' element
     */
    viewContainer: ViewContainerRef|undefined|null;
}
