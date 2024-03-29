// import {Component, ChangeDetectionStrategy, Inject, Optional, HostBinding, forwardRef, ElementRef, ViewChild} from '@angular/core';
// import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
// import {GridPluginInstances, GRID_PLUGIN_INSTANCES, CONTENT_RENDERER_OPTIONS, PluginDescription, ContentRendererAbstractComponent, BodyContentRenderer, HeaderContentRenderer, GridMetadata} from '@anglr/grid';
// import {extend} from '@jscrpt/common';

// import {VirtualScrollTableContentRendererOptions, VirtualScrollTableContentRenderer} from './virtualScrollTableContentRenderer.interface';
// import {VirtualScrollTableHeaderContentRendererComponent} from './header/virtualScrollTableHeaderContentRenderer.component';
// import {VirtualScrollTableBodyContentRendererComponent} from './body/virtualScrollTableBodyContentRenderer.component';

// /**
//  * Default options for 'VirtualScrollTableContentRendererComponent'
//  * @internal
//  */
// const defaultOptions: VirtualScrollTableContentRendererOptions =
// {
//     itemSize: 28,
//     cssClasses:
//     {
//         table: 'table table-condensed table-striped table-hover',
//         containerDiv: 'table-container',
//         virtualScrollViewport: 'viewport-container thin-scrollbar'
//     },
//     plugins:
//     {
//         bodyRenderer: <PluginDescription<BodyContentRenderer>>
//         {
//             type: forwardRef(() => VirtualScrollTableBodyContentRendererComponent)
//         },
//         headerRenderer: <PluginDescription<HeaderContentRenderer>>
//         {
//             type: forwardRef(() => VirtualScrollTableHeaderContentRendererComponent)
//         }
//     }
// };

// /**
//  * Component used for 'VirtualScrollTableContentRendererComponent'
//  */
// @Component(
// {
//     selector: 'div.virtual-scroll-table-content-renderer',
//     templateUrl: 'VirtualScrollTableContentRenderer.component.html',
//     styleUrls: ['virtualScrollTableContentRenderer.component.css'],
//     changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class VirtualScrollTableContentRendererComponent<TOrdering = any, TData = any, TMetadata extends GridMetadata = any> extends ContentRendererAbstractComponent<TOrdering, TData, TMetadata, VirtualScrollTableContentRendererOptions> implements VirtualScrollTableContentRenderer<TOrdering>
// {
//     //######################### public properties - hosts #########################

//     /**
//      * Css class applied to grid itself
//      * @internal
//      */
//     @HostBinding('class')
//     public override get cssClass(): string
//     {
//         return this._options.cssClasses.containerDiv;
//     }

//     //######################### public properties - children #########################

//     /**
//      * Instance of angular CDK virtual scroll viewport
//      */
//     @ViewChild(CdkVirtualScrollViewport)
//     public scrollViewport: CdkVirtualScrollViewport;

//     //######################### constructor #########################
//     constructor(pluginElement: ElementRef,
//                 @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
//                 @Inject(CONTENT_RENDERER_OPTIONS) @Optional() options?: VirtualScrollTableContentRendererOptions)
//     {
//         super(pluginElement, gridPlugins);

//         this._options = extend(true, {}, defaultOptions, options);
//     }
// }