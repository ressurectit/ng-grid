// import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
// import {ContentRenderer, HeaderContentRenderer, BodyContentRenderer, BodyContentRendererOptions, HeaderBodyContentRendererOptions, ContentRendererPlugins, CssClassesHeaderContentRenderer, HeaderContentRendererOptions} from '@anglr/grid';

// /**
//  * Css classes for virtual scroll table content renderer
//  */
// export interface CssClassesVirtualScrollTableContentRenderer
// {
//     table?: string;
//     containerDiv?: string;
//     virtualScrollViewport?: string;
// }

// /**
//  * Options for virtual scroll table content renderer
//  */
// export interface VirtualScrollTableContentRendererOptions extends HeaderBodyContentRendererOptions<CssClassesVirtualScrollTableContentRenderer, ContentRendererPlugins>
// {
//     /**
//      * Size of item (height), fixed height has to be set, otherwise computation will not work
//      */
//     itemSize?: number;
// }

// /**
//  * Public API for VirtualScrollTableContentRenderer
//  */
// export interface VirtualScrollTableContentRenderer<TOrdering = any> extends ContentRenderer<TOrdering>
// {
//     /**
//      * Instance of angular CDK virtual scroll viewport
//      */
//     scrollViewport: CdkVirtualScrollViewport;
// }

// /**
//  * Options for 'VirtualScrollTableBodyContentRendererComponent'
//  */
// export interface VirtualScrollTableBodyContentRendererOptions extends BodyContentRendererOptions
// {
// }

// /**
//  * Public API for VirtualScrollTableBodyContentRenderer
//  */
// export interface VirtualScrollTableBodyContentRenderer<TData = any, TMetadata = any> extends BodyContentRenderer<TData, TMetadata>
// {
// }

// /**
//  * Css classes for virtual scroll table header content renderer
//  */
// export interface CssClassesVirtualScrollTableHeaderContentRenderer extends CssClassesHeaderContentRenderer
// {
//     thead?: string;
//     thDefault?: string;
//     thOrderable?: string;
//     spanContent?: string;
//     spanOrdering?: string;
// }

// /**
//  * Options for 'VirtualScrollTableHeaderContentRendererComponent'
//  */
// export interface VirtualScrollTableHeaderContentRendererOptions extends HeaderContentRendererOptions<CssClassesVirtualScrollTableHeaderContentRenderer>
// {
// }

// /**
//  * Public API for VirtualScrollTableHeaderContentRenderer
//  */
// export interface VirtualScrollTableHeaderContentRenderer<TOrdering = any, TMetadata = any> extends HeaderContentRenderer<TOrdering, TMetadata>
// {
// }