import {ViewContainerRef} from '@angular/core';

/**
 * Object used for sharing view container to its parent content renderer
 */
export interface ContentRendererCurrentViewContainer
{
    /**
     * View container used for rendering content of specific element
     */
    viewContainer: ViewContainerRef|undefined|null;
}