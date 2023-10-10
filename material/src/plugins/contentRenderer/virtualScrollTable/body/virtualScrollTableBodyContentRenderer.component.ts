// import {Component, ChangeDetectorRef, Optional, Inject, ElementRef} from '@angular/core';
// import {TableGridColumn, TableGridMetadata, GridPluginInstances, GRID_PLUGIN_INSTANCES, BODY_CONTENT_RENDERER_OPTIONS, BodyContentRendererAbstractComponent} from '@anglr/grid';
// import {extend} from '@jscrpt/common';

// import {VirtualScrollTableBodyContentRendererOptions, VirtualScrollTableBodyContentRenderer} from '../virtualScrollTableContentRenderer.interface';

// /**
//  * Default options for 'VirtualScrollTableBodyContentRendererComponent'
//  * @internal
//  */
// const defaultOptions: VirtualScrollTableBodyContentRendererOptions =
// {
// };

// /**
//  * Component used for rendering tbody for 'TableContentRenderer'
//  */
// @Component(
// {
//     selector: 'tbody.content-renderer',
//     templateUrl: 'virtualScrollTableBodyContentRenderer.component.html'
// })
// export class VirtualScrollTableBodyContentRendererComponent<TData = any> extends BodyContentRendererAbstractComponent<TData, VirtualScrollTableBodyContentRendererOptions, TableGridMetadata<TableGridColumn<TData>>, any> implements VirtualScrollTableBodyContentRenderer<TData, TableGridMetadata<TableGridColumn<TData>>>
// {
//     //######################### constructor #########################
//     constructor(pluginElement: ElementRef,
//                 changeDetector: ChangeDetectorRef,
//                 @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances,
//                 @Inject(BODY_CONTENT_RENDERER_OPTIONS) @Optional() options: VirtualScrollTableBodyContentRendererOptions)
//     {
//         super(pluginElement, changeDetector, gridPlugins);

//         this._options = extend(true, {}, defaultOptions, options);
//     }
// }