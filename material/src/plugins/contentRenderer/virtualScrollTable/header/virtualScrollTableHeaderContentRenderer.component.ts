// import {Component, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from '@angular/core';
// import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
// import {HEADER_CONTENT_RENDERER_OPTIONS, HeaderContentRendererAbstractComponent, SimpleOrdering, TableGridMetadata, BasicOrderableColumn, CONTENT_RENDERER, GridPluginInstances, GRID_PLUGIN_INSTANCES} from '@anglr/grid';
// import {extend} from '@jscrpt/common';

// import {VirtualScrollTableHeaderContentRendererOptions, VirtualScrollTableHeaderContentRenderer, VirtualScrollTableContentRenderer} from '../virtualScrollTableContentRenderer.interface';

// /**
//  * Default options for 'VirtualScrollTableHeaderContentRendererComponent'
//  * @internal
//  */
// const defaultOptions: VirtualScrollTableHeaderContentRendererOptions =
// {
//     cssClasses:
//     {
//         thead: '',
//         thDefault: 'header-default',
//         thOrderable: 'header-orderable',
//         spanContent: 'header-content',
//         spanOrdering: 'header-ordering',
//         spanOrderingDirection:
//         {
//             none: 'fa fa-sort',
//             asc: 'fa fa-sort-up',
//             desc: 'fa fa-sort-down'
//         }
//     }
// };

// /**
//  * Component used for rendering table header in table content renderer
//  */
// @Component(
// {
//     selector: 'thead.virtual-scroll-content-renderer',
//     templateUrl: 'virtualScrollTableHeaderContentRenderer.component.html',
//     styleUrls: ['virtualScrollTableHeaderContentRenderer.component.css']
// })
// export class VirtualScrollTableHeaderContentRendererComponent<TData = any> extends HeaderContentRendererAbstractComponent<TData, VirtualScrollTableHeaderContentRendererOptions> implements VirtualScrollTableHeaderContentRenderer<SimpleOrdering, TableGridMetadata<BasicOrderableColumn<TData>>>
// {
//     //######################### protected fields #########################

//     /**
//      * Instance of angular CDK virtual scroll viewport assigned to parent content renderer
//      */
//     protected _scrollViewport: CdkVirtualScrollViewport;

//     //######################### public properties - template bindings #########################

//     /**
//      * Gets position of header from start after scrolling
//      * @internal
//      */
//     public get fromStart(): number
//     {
//         if(!this._scrollViewport)
//         {
//             return 0;
//         }

//         return -this._scrollViewport.getOffsetToRenderedContentStart();
//     }

//     //######################### public properties - host #########################

//     /**
//      * Css class applied to header itself
//      */
//     @HostBinding('class')
//     public get cssClass(): string
//     {
//         return this._options.cssClasses.thead;
//     }

//     //######################### constructor #########################
//     constructor(pluginElement: ElementRef,
//                 changeDetector: ChangeDetectorRef,
//                 @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
//                 @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: VirtualScrollTableHeaderContentRendererOptions)
//     {
//         super(pluginElement, gridPlugins, changeDetector);

//         this._options = extend(true, {}, defaultOptions, options);
//     }

//     //######################### public methods - implementation of TableHeaderContentRenderer #########################

//     /**
//      * Initialize plugin, to be ready to use, initialize communication with other plugins
//      */
//     public override initialize()
//     {
//         super.initialize();

//         const contentRenderer = this.gridPlugins[CONTENT_RENDERER] as VirtualScrollTableContentRenderer;
//         this._scrollViewport = contentRenderer.scrollViewport;
//     }
// }