import {Directive, OnInit, Renderer2, Inject, Input, Injector, InjectionToken} from '@angular/core';
import {GridSAComponent, BODY_CONTENT_RENDERER, HEADER_CONTENT_RENDERER, Grid} from '@anglr/grid';
import {APP_STABLE} from '@anglr/common';
import {Subscription} from 'rxjs';
import * as scrollmagic from 'scrollmagic';

/**
 * Token used for obtaining scrollmagic controller instance
 */
export const SCROLL_MAGIC_CONTROLLER: InjectionToken<ScrollMagic.Controller> = new InjectionToken<ScrollMagic.Controller>('SCROLL_MAGIC_CONTROLLER');

/**
 * Directive that applies fixed header to grid
 */
@Directive(
{
    selector: '[fixedHeader]'
})
export class FixedGridHeaderDirective implements OnInit
{
    //######################### private fields #########################

    /**
     * Array of original widths
     */
    private _originalWidths: string[] = [];

    /**
     * Subscription for grid initialization
     */
    private _gridInitializedSubscription: Subscription;

    /**
     * Scrollmagic scene
     */
    private _scene: ScrollMagic.Scene;

    /**
     * Mutation observer for checking for changes in header
     */
    private _headerObserver: MutationObserver;

    /**
     * Mutation observer for checking for changes in body
     */
    private _bodyObserver: MutationObserver;

    /**
     * Scrollmagic controller that is used for handling scene
     */
    private _controller: scrollmagic.Controller;

    //######################### public properties - inputs #########################

    /**
     * Css class applied when header is set as "fixed"
     */
    @Input()
    public fixedCssClass: string = 'fixed-header';

    //######################### constructor #########################
    constructor(@Inject(GridSAComponent) private _grid: Grid,
                @Inject(APP_STABLE) private _appStable: any,
                private _injector: Injector,
                private _renderer: Renderer2)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._appStable.then(() =>
        {
            this._controller = this._injector.get(SCROLL_MAGIC_CONTROLLER);

            if(!this._controller)
            {
                console.warn('Missing "scrollmagic.Controller", you must provide it using "SCROLL_MAGIC_CONTROLLER"!');

                return;
            }

            this._gridInitializedSubscription = this._grid.initialized.subscribe(initialized =>
            {
                if(!initialized)
                {
                    return;
                }

                this.ngOnDestroy();

                const headerPlugin = this._grid.getPlugin(HEADER_CONTENT_RENDERER);
                const header = headerPlugin.pluginElement.nativeElement as HTMLElement;
                const tr = header.firstElementChild;
                const body = this._grid.getPlugin(BODY_CONTENT_RENDERER).pluginElement.nativeElement as HTMLElement;
                const tmpTr = this._renderer.createElement('tr');

                this._renderer.setStyle(tmpTr, 'display', 'none');
                this._renderer.appendChild(header, tmpTr);

                this._headerObserver = new MutationObserver(() =>
                {
                    if(this._scene)
                    {
                        this._scene.offset(tr.getBoundingClientRect().bottom);
                        this._scene.refresh();
                        this._renderer.setStyle(tmpTr, 'height', `${tr.getBoundingClientRect().height}px`);

                        this._headerObserver.disconnect();
                    }
                });

                this._headerObserver.observe(tr, 
                {
                    childList: true
                });

                this._bodyObserver = new MutationObserver(() =>
                {
                    this._scene.duration(body.getBoundingClientRect().height);
                    this._scene.refresh();
                });

                this._bodyObserver.observe(body,
                {
                    childList: true
                });

                this._scene = new scrollmagic.Scene(
                {
                    offset: tr.getBoundingClientRect().bottom,
                    duration: 0
                }).
                    on('enter leave', event =>
                    {
                        const cols = tr.children;

                        if(event.type == 'enter')
                        {
                            this._originalWidths = [];
                        }

                        for(let x = 0; x < cols.length; x++)
                        {
                            const col = cols[x] as HTMLElement;

                            if(event.type == 'enter')
                            {
                                this._originalWidths.push(col.style.width);
                                col.style.width = `${col.clientWidth}px`;
                                const th = this._renderer.createElement('th');
                                this._renderer.setStyle(th, 'width', `${col.clientWidth}px`);
                                this._renderer.appendChild(tmpTr, th);
                            }
                            else
                            {
                                col.style.width = this._originalWidths[x];

                                while (tmpTr.firstChild) 
                                {
                                    tmpTr.removeChild(tmpTr.firstChild);
                                }
                            }
                        }
                        if(event.type == 'enter')
                        {
                            this._renderer.setStyle(tmpTr, 'display', '');
                        }
                        else
                        {
                            this._renderer.setStyle(tmpTr, 'display', 'none');
                        }
                        
                        tr.classList.toggle(this.fixedCssClass);
                    })
                    // .addIndicators()
                    .addTo(this._controller);
            });
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._gridInitializedSubscription)
        {
            this._gridInitializedSubscription.unsubscribe();
            this._gridInitializedSubscription = null;
        }

        if(this._scene)
        {
            this._scene.remove()
                .destroy();
            this._scene = null;
        }

        if(this._headerObserver)
        {
            this._headerObserver.disconnect();
            this._headerObserver = null;
        }

        if(this._bodyObserver)
        {
            this._bodyObserver.disconnect();
            this._bodyObserver = null;
        }
    }
}