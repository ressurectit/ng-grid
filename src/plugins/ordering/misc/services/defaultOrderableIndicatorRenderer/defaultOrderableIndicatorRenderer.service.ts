import {Renderer2} from '@angular/core';

import {OrderableIndicatorRenderer} from '../../../../../interfaces';

/**
 * Default implementation of orderable indicator renderer
 */
export class DefaultOrderableIndicatorRenderer implements OrderableIndicatorRenderer
{
    //######################### protected properties #########################

    /**
     * Current css classes that are applied to indicator element
     */
    protected currentCssClasses: string[] = [];

    /**
     * Instance of HTML indicator element displaying ordering
     */
    protected element: HTMLElement|undefined|null;

    //######################### public methods - implementation of OrderableIndicatorRenderer #########################

    /**
     * @inheritdoc
     */
    public create(element: HTMLElement, renderer: Renderer2): void
    {
        if(this.element)
        {
            return;
        }

        this.element = renderer.createElement('span');
        renderer.appendChild(element, this.element);
    }

    /**
     * @inheritdoc
     */
    public destroy(element: HTMLElement, renderer: Renderer2): void
    {
        if(!this.element)
        {
            return;
        }

        renderer.removeChild(element, this.element);
        this.element = null;
    }

    /**
     * @inheritdoc
     */
    public apply(cssClasses: string[], renderer: Renderer2): void
    {
        if(!this.element)
        {
            return;
        }
        
        //remove current css classes
        for(const cssClass of this.currentCssClasses)
        {
            for(const cls of cssClass.split(' '))
            {
                renderer.removeClass(this.element, cls);
            }
        }

        this.currentCssClasses = cssClasses;

        for(const cssClass of this.currentCssClasses)
        {
            for(const cls of cssClass.split(' '))
            {
                renderer.addClass(this.element, cls);
            }
        }
    }
}
