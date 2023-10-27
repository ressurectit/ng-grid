import {Renderer2} from '@angular/core';

/**
 * Definition of renderer that should render orderable indicator
 */
export interface OrderableIndicatorRenderer
{
    //######################### methods #########################

    /**
     * Creates indicator html
     * @param element - Instance of element on which is indicator rendered
     * @param renderer - Instance of renderer for changing HTML
     */
    create(element: HTMLElement, renderer: Renderer2): void;

    /**
     * Destroys indicator html
     * @param element - Instance of element on which is indicator rendered
     * @param renderer - Instance of renderer for changing HTML
     */
    destroy(element: HTMLElement, renderer: Renderer2): void;

    /**
     * Applies css classes to orderable indicator
     * @param cssClasses - Array of css classes (could be multiple classes also in one item separated by space)
     * @param renderer - Instance of renderer for changing HTML
     */
    apply(cssClasses: string[], renderer: Renderer2): void;
}