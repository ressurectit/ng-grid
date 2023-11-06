# Changelog

## Version 10.0.0 (2023-11-06)

### Bug Fixes

- all buttons now have `type="button"`

### Features

- new `GridPluginType` enum, that holds available plugin types
   - **Values**
      - `ContentRenderer` content renderer used for rendering content area of grid
      - `DataLoader` data loader used for obtaining data for grid
      - `GridInitializer` initializer that is used for obtaining stored initialization data for grid
      - `MetadataSelector` allows selection of metadata that should be displayed
      - `NoDataRenderer` renderer that is used for rendering content when no data are present
      - `Ordering` enables and handles ordering of data
      - `Paging` enables and handles paging of data
      - `RowSelector` handles selection of rows
- new `TableGridBodyCellTemplateSADirective` directive, that is used for obtaining template for table grid body cell
   - **properties**
      - `template` template that is this structural directive used to
- new `TableGridHeaderCellTemplateSADirective` directive, that is used for obtaining template for table grid header cell
   - **properties**
      - `template` template that is this structural directive used to
- new `GridPluginType` enum, that represents available plugin types
   - `ContentRenderer` content renderer used for rendering content area of grid
   - `DataLoader` data loader used for obtaining data for grid
   - `GridInitializer` initializer that is used for obtaining stored initialization data for grid
   - `MetadataSelector` allows selection of metadata that should be displayed
   - `NoDataRenderer` renderer that is used for rendering content when no data are present
   - `Paging` enables paging of data
   - `RowSelector` handles selection of rows
- new `Ordering` interface, that is public API for ordering
   - **properties**
      - `ordering` current ordering value
      - `orderingChange` occurs when current ordering has changed
   - **method**
      - `orderByColumn` marks column for odering
      - `setOrdering` sets ordering to ordering plugin
      - `getCssClassesForColumn` obtains css classes for column
- new `OrderingOptions` interface, that represents ordering options allow configuring ordering plugin
   - **properties**
      - `indicatorRenderer` type of orderable indicator renderer
- new `CssClassesOrdering` interface, that represents css classes that are used for ordering
   - **properties**
      - `orderable` indication that column is orderable
      - `none` no ordering
      - `asc` ordering is ascending
      - `desc` ordering is descending
- new `SingleOrderingOptions` interface, that are ordering options for single ordering
- new `SingleOrdering` interface, that is public API for single ordering
- new `SingleOrderingSAComponent` component, that is component used for single ordering, used for ordering using single column
   - **implements**
      - `SingleOrdering`
- new `NoOrderingOptions` interface, that is no ordering options for ordering
- new `NoOrdering` interface, that is public API for no ordering
- new `NoOrderingSAComponent` component, that is component used for no ordering
   - **implements**
      - `NoOrdering`
- new `ORDERING_TYPE` injection token for 'Ordering' implementation
- new `ORDERING_OPTIONS` injection token for injecting options for ordering
- new `ResolveForwardRefSAPipe` pipe, that resolves forwardRef type into type
- new `ReadValueSAPipe` pipe, that reads value from object and returns it, can address nested objects using '.' notation
- new `CellTemplateContext` interface, that is context for cell template
   - **propertie**
      - `column` object of column metadata itself
- new `CellContextFactoryFn` type, that represents factory function signature for obtaining cell context
- new `DataCellContextFactoryFn` type, that represents factory function signature for obtaining data cell context
- new `CELL_CONTEXT_FN` injection token for obtaining cell context factory function
- new `DATA_CELL_CONTEXT_FN` injection token for obtaining data cell context factory function
- new `GRID_INSTANCE` injection token for obtaining grid instance inside grid plugins and nested types
- new `DEFAULT_OPTIONS` injection token used for injecting default options
- new `CONTENT_RENDERER_CURRENT_VIEW_CONTAINER` injection token used for sharing content renderers current view container for rendering into 'container' elements
- new `ORDERABLE_CELL` injection token used for obtaining orderable directive from cell
- new `cellContextFactory` function, that creates context object for cell in grid
- new `dataCellContextFactory` function, that creates context object for data cell in grid
- new `CellContextSAPipe` pipe, that obtains cell context for template
- new `DataCellContextSAPipe` pipe, that obtains data cell context for template
- new `provideCellContextFactoryFn` function, that provides factory function for cell context
- new `provideDataCellContextFactoryFn` function, that provides factory function for data cell context
- new `OrderableSADirective` directive, that is used for handling ordering of column
   - **inputs**
      - `orderable` gets or sets indication whether is column orderable or not
      - `orderById` id of column which should be used for order by
- new `MatrixGridSAComponent` component, that represents grid component used for rendering grid, configured with special content renderer and metadata gatherer
   - **extends** `GridSAComponent`
   - **implements**
      - `Grid`
      - `MetadataGatherer`
      - `AfterContentInit`
- new `RenderableContentComponent` component, that is base class for all renderable content components
   - **implements**
      - `OnInit`
- new `GridContainerSAComponent` component, that represents grid container
   - **extends** `RenderableContentComponent`
- new `HeaderContainerSAComponent` component, that represents header container
   - **extends** `RenderableContentComponent`
- new `ContentContainerSAComponent` component, that represents content container
   - **extends** `RenderableContentComponent`
- new `FooterContainerSAComponent` component, that represents footer container
   - **extends** `RenderableContentComponent`
- new `HeaderRowContainerSAComponent` component, that represents header row container
   - **extends** `RenderableContentComponent`
- new `ContentRowContainerSAComponent` component, that represents content row container
   - **extends** `RenderableContentComponent`
- new `FooterRowContainerSAComponent` component, that represents footer row container
   - **extends** `RenderableContentComponent`
- new `GridContainerTemplateSADirective` directive, that is used for obtaining template for grid content renderer container
   - **properties**
      - `template` obtained template by this directive
- new `HeaderContainerTemplateSADirective` directive, that is used for obtaining template for grid content renderer header container
   - **properties**
      - `template` obtained template by this directive
- new `ContentContainerTemplateSADirective` directive, that is used for obtaining template for grid content renderer content (body) container
   - **properties**
      - `template` obtained template by this directive
- new `FooterContainerTemplateSADirective` directive, that is used for obtaining template for grid content renderer footer container
   - **properties**
      - `template` obtained template by this directive
- new `HeaderRowContainerTemplateSADirective` directive, that is used for obtaining template for grid content renderer header row container
   - **properties**
      - `template` obtained template by this directive
   - **inputs**
      - `predicate` predicate which controls rendering of row template, if not specified row is rendered
      - `headerRowContainerTemplate` array of column ids to be rendered in this row, if not specified or null all available columns will be rendered
- new `ContentRowContainerTemplateSADirective` directive, that is used for obtaining template for grid content renderer content (body) row container
   - **properties**
      - `template` obtained template by this directive
   - **inputs**
      - `predicate` predicate which controls rendering of row template, if not specified row is rendered
      - `contentRowContainerTemplate` array of column ids to be rendered in this row, if not specified or null all available columns will be rendered
- new `FooterRowContainerTemplateSADirective` directive, that is used for obtaining template for grid content renderer footer row container
   - **properties**
      - `template` obtained template by this directive
   - **inputs**
      - `predicate` predicate which controls rendering of row template, if not specified row is rendered
      - `footerRowContainerTemplate` array of column ids to be rendered in this row, if not specified or null all available columns will be rendered
- new `MatrixGridColumnSADirective` directive, that is used for gathering information about matrix grid column
   - **implements**
      `MatrixGridColumn`
- new `HeaderCellTemplateSADirective` directive, that is used for obtaining template for header cell
   - **properties**
      - `template` obtained template by this directive
- new `ContentCellTemplateSADirective` directive, that is used for obtaining template for content cell
   - **properties**
      - `template` obtained template by this directive
- new `FooterCellTemplateSADirective` directive, that is used for obtaining template for footer cell
   - **properties**
      - `template` obtained template by this directive
- new `CssClassesMatrixContentRenderer` interface, that are css classes for matrix content renderer
   - **extends**
      - `CssClassesContentRenderer`
   - **properties**
      - `gridContainerClass` css class for grid container
      - `headerContainerClass` css class for header container
      - `contentContainerClass` css class for content (body) container
      - `footerContainerClass` css class for footer container
      - `headerRowContainerClass` css class for header row containers
      - `contentRowContainerClass` css class for content (body) row containers
      - `footerRowContainerClass` css class for footer row containers
- new `MatrixContentRendererOptions` interface, that are matrix content renderer options
   - **extends**
      - `ContentRendererOptions`
   - **properties**
      - `defaults` type used for creating component containing default templates
- new `MatrixContentRenderer` interface, that is public API for matrix content renderer
   - **extends**
      - `ContentRenderer`
- new `MatrixGridMetadata` interface, that is matrix grid metadata, contains templates for each rendered element
   - **extends**
      - `TableGridMetadata`
   - **properties**
      - `gridContainer` template for grid container, with metadata
      - `headerContainer` template for grid header, with metadata
      - `contentContainer` template for grid content (body), with metadata
      - `footerContainer` template for grid footer, with metadata
      - `headerRowContainer` templates for header rows, with metadata
      - `contentRowContainer` templates for content rows (each data row can be rendered as multiple rows), with metadata
      - `footerRowContainer` templates for footer rows, with metadata
- new `MatrixContentRendererSAComponent` component, that is used for rendering content using new 'matrix' metadata gatherer
   - **implements**
      - `MatrixContentRenderer`
      - `GridPlugin`
      - `OnDestroy`
- new `CurrentViewContainer` interface, that is type that allows storing and sharing view container of 'container' element
   - **properties**
      - `viewContainer` view container that is used for rendering content of 'container' element
- new `GridContext` interface, that represents context that is available in content renderer top levels, outside of data scope
   - **properties**
      - `grid` instance of grid itself
      - `plugins` instance of grid plugins
      - `data` all data that are currently rendered
      - `columns` all currently rendered columns metadata
      - `contentCssClasses` css classes used for rendering content
- new `GridRowContext` interface, that represents context that is available in content renderer at row level (any type of row)
   - **extends**
      - `GridContext`
    - **properties**
      - `index` index of rendered low in current page
      - `rowColumns` all currently rendered columns metadata
- new `GridDataRowContext` interface, that represents context that is available in content renderer at row level (content data rows only)
   - **extends**
      - `GridRowContext`
    - **properties**
      - `datum` instance of datum for current row
      - `startingIndex` starting index of currently displayed items
      - `rowIndex` row index of displayed item
      - `isSelected` indication whether is row item selected
- new `GridCellContext` interface, that represents context that is available in content renderer at cell level (any type of cell)
   - **extends**
      - `GridRowContext`
   - **properties**
      - `metadata` metadata for current cell (column)
      - `isSelected` indication whether is row item selected
- new `GridDataCellContext` interface, that represents context that is available in content renderer at cell level (content data cells only)
   - **extends**
      - `GridDataRowContext`
   - **properties**
      - `metadata` metadata for current cell (column)
- new `MatrixGridColumn` interface, that represents matrix grid column definition
   - **extends**
      - `GridColumn`
   - **properties**
      - `width` width as style string including units, not used in renderer, but can be used by user later for automation
      - `headerTemplate` template that is used for rendering of cell in header row
      - `bodyTemplate` template that is used for rendering of cell in content (body) row
      - `footerTemplate` template that is used for rendering of cell in footer row
- new `MatrixContentRendererDefautTemplates` interface, that are default templates for matrix content renderer
   - **properties**
      - `gridContainer` default template for grid container
      - `headerContainer` default template for grid header
      - `contentContainer` default template for grid content (body)
      - `footerContainer` default template for grid footer
      - `headerRowContainer` default templates for header rows
      - `contentRowContainer` default templates for content rows (each data row can be rendered as multiple rows)
      - `footerRowContainer` default templates for footer rows
- new `BaseDefaultTemplatesSAComponent` component, that represents base component that stores default templates for content renderig
   - **implements**
      - `MatrixContentRendererDefautTemplates`
- new `CssGridDefaultTemplatesSAComponent` component, that represents component that stores default templates for css grid content renderig
   - **extends** `BaseDefaultTemplatesSAComponent`
   - **implements**
      - `MatrixContentRendererDefautTemplates`
- new `TableDefaultTemplatesSAComponent` component, that represents component that stores default templates for table content renderig
   - **extends** `BaseDefaultTemplatesSAComponent`
   - **implements**
      - `MatrixContentRendererDefautTemplates`
- new `NoRowSelectorOptions` interface, that is no row selector options
   - **extends**
      - `RowSelectorOptions`
- new `NoRowSelector` interface, that is public API for no row selector
   - **extends**
      - `RowSelector`
- new `NoRowSelectorSAComponent` component, that is component used for handling no row selection
   - **implements**
      - `NoRowSelector`
      - `GridPlugin`
- new `GridOrderableCell` interface, that represents class used for storing orderable directive instance
   - **properties**
      - `orderable` instance of orderable directive
- new `rowColumnsAttribute` function, that transforms row columns attribute value into row columns value
- new `CssGridTemplateColumnsSAPipe` pipe, that creates css value for 'grid-template-columns' property
- new `OrderableIndicatorRenderer` interface, that represents definition of renderer that should render orderable indicator
   - **methods**
      - `create` creates indicator html
      - `destroy` destroys indicator html
      - `apply` applies css classes to orderable indicator
- new `DefaultOrderableIndicatorRenderer` class, that is default implementation of orderable indicator renderer
   - **implements**
      - `OrderableIndicatorRenderer`
- new `UseTableSADirective` directive, that configures MatrixContentRenderer to use TableDefaultTemplates
- new `MatrixGridModule` module for matrix grid components and directives
- new `GridPluginInstancesDef` class, that is implementation of GridPluginInstances
- new `InfinityNaNSAPipe` pipe, that transforms NaN value into inifinity symbol
- new `AttachPlugins` interface, that is definition of plugin instances that can be attached to grid
   - **properties**
      - `contentRenderer` instance of content renderer plugin
      - `dataLoader` instance of data loader plugin
      - `gridInitializer` instance of grid initializer plugin
      - `metadataSelector` instance of metadata selector plugin
      - `noDataRenderer` instance of no data renderer plugin
      - `ordering` instance of ordering plugin
      - `paging` instance of paging plugin
      - `rowSelector` instance of row selector plugin
- new `AttachPluginsSADirective` directive, that is used for attaching external plugins to grid
   - **implements**
      - `OnChanges`
   - **inputs**
      - `attachPlugins` object storing external plugins
      - `autoInitialize` automatically initialize grid after new instances are set
      - `forceReinitialization` indication whether perform force reinitialization
- new `ShowMetadataSelectorForSADirective` directive, that shows metadata selector on click for provided grid
   - **inputs**
      - `showMetadataSelectorFor` grid which metadata selector will be displayed
- updated `TableGridColumnSAComponent` component
   - now supports also obtaining template using directives `TableGridBodyCellTemplateSADirective`, `TableGridHeaderCellTemplateSADirective`
- updated `Grid` interface
   - **new properties**
      - `pluginsOptionsInitialized` occurs everytime when plugins options initialization changes, if value is false plugins options were not initialized yet, or are being reinitialized
- updated `GridSAComponent` component
   - updated implementation to correspond with new interface
- updated `BodyContentRendererOptions` interface
   - **new properties**
      - `rowClick` callback allows handle click on the row
      - `rowCssClass` callback called for each row with data for row returning css class, that will be applied to row element
- updated `GridPluginInstances` interface
   - **new properties**
      - `contentRenderer` instance of content renderer that renders obtained data
      - `dataLoader` instance of data loader that is used for obtaining data that will be displayed
      - `gridInitializer` instance of grid initializer that is used for obtaining stored grid data
      - `metadataSelector` instance of metadata selector used for gathering and manipulation with metadata
      - `noDataRenderer` instance of no data renderer used for rendering information that there are no data currently
      - `ordering` instance of ordering used for applying ordering to data
      - `paging` instance of paging used for applying paging to data
      - `rowSelector` instance of row selector used for handling row selection
- *subpackage* `@anglr/grid/extensions`
   - new `getSelectedIds` function, that gets currently selected ids
   - new `invalidateContent` function, that invalidates content renderer view, redraws content
   - new `isSelectedAnyOnPage` function, that gets indication whether is selected any row on current page
   - new `areSelectedAllOnPageLimited` function, that gets indication whether are all currently displayed items on page selected or not, works with DataResponse DataLoader
   - new `patchPluginsOptions` function, that is used to patch plugins options only
   - new `reinitialize` function, that reinitializes grid
   - updated `reinitializeOptions`, new signatures supporting `force` parameter

### BREAKING CHANGES
- minimal supported version of `@angular` is `17.0.0`
- minimal supported version of `@jscrpt/common` is `4.1.0`
- minimal supported version of `@anglr/common` is `18.1.0`
- minimal supported version of `@rxjs` is `7.5.7`
- minimal supported version of `tslib` is `2.6.1`
- no longer depends on `scrollmagic`
- removed `@anglr/grid/scrollmagic` subpackage, it was not used, can be implemented using pure css
- dropped support of `NodeJs` lower than `18.13`
- all `any` generic defaults changed to `unknown` or extended type
- all components, directives, pipes are now standalone
- strict null checks and types
- renamed `GatheredMetadata` to `GridMetadata`
- renamed `BasicTableColumn` to `TableGridColumn`
- renamed `BasicTableMetadata` to `TableGridMetadata`
- renamed `BasicTableMetadataGathererComponent` to `TableGridMetadataGathererSAComponent`
- renamed `BasicTableColumnComponent` to `TableGridColumnSAComponent`
- renamed `BasicTableColumnContext` to `DataCellTemplateContext` and changed to interface and extended with `rowSelected` inidication
- renamed `GridComponent` to `GridSAComponent`
- renamed `SimpleNoDataRendererComponent` to `SimpleNoDataRendererSAComponent`
- renamed `BasicRowSelectorComponent` to `BasicRowSelectorSAComponent`
- renamed `LimitedRowSelectorComponent` to `LimitedRowSelectorSAComponent`
- renamed `NoMetadataSelectorComponent` to `NoMetadataSelectorSAComponent`
- renamed `AdvancedMetadataSelectorComponent` to `AdvancedMetadataSelectorSAComponent`
- renamed `NoGridInitializerComponent` to `NoGridInitializerSAComponent`
- renamed `QueryGridInitializerComponent` to `QueryGridInitializerSAComponent`
- renamed `SyncDataLoaderComponent` to `SyncDataLoaderSAComponent`
- renamed `AsyncDataLoaderComponent` to `AsyncDataLoaderSAComponent`
- renamed `NoPagingComponent` to `NoPagingSAComponent`
- renamed `BasicPagingComponent` to `BasicPagingSAComponent`
- renamed `LoadMorePagingComponent` to `LoadMorePagingSAComponent`
- renamed `PreviousNextPagingComponent` to `PreviousNextPagingSAComponent`
- renamed `PageVirtualScrollPagingComponent` to `PageVirtualScrollPagingSAComponent`
- renamed `ContentVirtualScrollPagingComponent` to `ContentVirtualScrollPagingSAComponent`
- renamed `TableContentRendererComponent` to `TableContentRendererSAComponent`
- renamed `AdvancedTableBodyContentRendererComponent` to `AdvancedTableBodyContentRendererSAComponent`
- renamed `TableBodyContentRendererComponent` to `TableBodyContentRendererSAComponent`
- renamed `CssDivsContentRendererComponent` to `CssDivsContentRendererSAComponent`
- renamed `CssDivsBodyContentRendererComponent` to `CssDivsBodyContentRendererSAComponent`
- renamed `CssDivsHeaderContentRendererComponent` to `CssDivsHeaderContentRendererSAComponent`
- renamed `TableHeaderContentRendererComponent` to `TableHeaderContentRendererSAComponent`
- renamed `QueryPermanentStorageGridInitializerComponent` to `QueryPermanentStorageGridInitializerSAComponent`
- removed `GridPluginGeneric`, now `GridPlugin` is generic with default value
- removed `AdvancedTableBodyContentRendererSAComponent` component, now standard `TableBodyContentRendererSAComponent` has same functionality
- removed `AdvancedTableBodyContentRendererOptions` interface, now standard `TableBodyContentRendererOptions` has same functionality
- removed `AdvancedTableBodyContentRenderer` interface, now standard `BodyContentRenderer` has same functionality
- removed `BasicOrderableColumn` interface
- removed `VirtualScrollPagingAbstractComponent` component, not used, old implementation
- removed `PageVirtualScrollPagingSAComponent` component, not used, old implementation
- removed `ContentVirtualScrollPagingSAComponent` component, not used, old implementation
- removed `CdkVirtualScrollPagingComponent` component, not used, old implementation
- removed `VirtualScrollTableContentRendererComponent` component, not used, based on old renderer
- removed `VirtualScrollTableHeaderContentRendererComponent` component, not used, based on old renderer
- removed `VirtualScrollTableBodyContentRendererComponent` component, not used, based on old renderer
- removed `VirtualScrollPaging` interface, not used, old implementation
- removed `VirtualScrollPagingOptions` interface, not used, old implementation
- removed `CssClassesVirtualScrollPaging` interface, not used, old implementation
- removed `PageVirtualScrollPaging` interface, not used, old implementation
- removed `PageVirtualScrollPagingOptions` interface, not used, old implementation
- removed `ContentVirtualScrollPaging` interface, not used, old implementation
- removed `ContentVirtualScrollPagingOptions` interface, not used, old implementation
- removed `CdkVirtualScrollPaging` interface, not used, old implementation
- removed `CdkVirtualScrollPagingOptions` interface, not used, old implementation
- removed `CssClassesCdkVirtualScrollPaging` interface, not used, old implementation
- removed `VirtualScrollTableHeaderContentRenderer` interface, not used, based on old renderer
- removed `VirtualScrollTableHeaderContentRendererOptions` interface, not used, based on old renderer
- removed `CssClassesVirtualScrollTableHeaderContentRenderer` interface, not used, based on old renderer
- removed `VirtualScrollTableBodyContentRenderer` interface, not used, based on old renderer
- removed `VirtualScrollTableBodyContentRendererOptions` interface, not used, based on old renderer
- removed `VirtualScrollTableContentRenderer` interface, not used, based on old renderer
- removed `VirtualScrollTableContentRendererOptions` interface, not used, based on old renderer
- removed `CssClassesVirtualScrollTableContentRenderer` interface, not used, based on old renderer
- removed `PagingPosition` enum, not used, if you need to place paging above grid, just place it outside and use instance
- old `ContentRendererOptions` renamed to `HeaderBodyContentRendererOptions`
- new `ContentRendererOptions` without `plugins`
- removed grouped table definition, use new syntax to achieve grouped header columns
   - removed `HeaderTableGroupColumn` interface
   - removed `HeaderTableGroup` interface
   - removed `GroupedTableMetadata` interface
   - removed `HeaderTableGroupContext` class
   - removed `GroupedTableMetadataGathererComponent` component
   - removed `HeaderTableGroupComponent` component
   - removed `HeaderTableGroupColumnComponent` component
   - removed `GroupedTableHeaderContentRendererComponent` component
   - removed `GroupedGridModule` module
- removed all plugin identifier contants, use `GridPluginType` enum instead
- ordering was completely refactored and moved into new plugin, removed from content renderer
- updated `Grid` interface
   - no longer implements `Invalidatable`, no use for this method does nothing
   - `initialize` has new `force` parameter
- updated `GridPlugin` interface
   - `initialize` has new `force` parameter
- updated `GridOptions` interface
   - removed `pagingPosition` property
- updated `Paging` interface
   - now using signals for `page` and `itemsPerPage`
   - now setting `page` and `itemsPerPage` using functions
   - removed totalCount, paging obtains totalCount from `DataLoader`
- updated all paging plugins to correspond with new `Paging` interface
- updated all plugins to be in line with new `GridPlugin` interface
- *subpackage* `@anglr/grid/extensions`
   - updated `setOrdering` function, is now async function and no longer refresh data
   - updated `setPage` function, is now async function and no longer refresh data
- *subpackage* `@anglr/grid/material`
   - renamed `VerticalDragNDropSelectionComponent` to `VerticalDragNDropSelectionSAComponent`
   - renamed `DialogMetadataSelectorComponent` to `DialogMetadataSelectorSAComponent`

## Version 9.0.4 (2023-01-14)

### Bug Fixes

- fixed typings for metadata selectors, now correctly generic type extends `GatheredMetadata` also for material subpackage

## Version 9.0.3 (2023-01-14)

### Bug Fixes

- fixed typings for metadata selectors, now correctly generic type extends `GatheredMetadata`

## Version 9.0.2 (2022-02-28)

### Bug Fixes

- fixed check for changes in async loader

## Version 9.0.1 (2022-02-22)

### Bug Fixes

- fixed typings, not using rolled up typings for now

## Version 9.0.0 (2022-02-21)

### BREAKING CHANGES

- minimal supported version of *Angular* is `13.1.0`
- minimal supported version of `@jscrpt/common` is `2.2.0`
- minimal supported version of `@anglr/common` is `10.0.0`
- compiled as *Angular IVY* **only** with new *APF*
- removed support of *es5* target and using latest package.json features
- removed dependency `@anglr/types`, all mising types used directly here
- dropped support of `Node.js <= 12.20`

## Version 8.0.4 (2021-02-12)

### Bugfixes

- `TableHeaderContentRendererComponent` and `GroupedTableHeaderContentRendererComponent` now supports fallback for `undefined` title, now using column *title*

## Version 8.0.3 (2020-09-09)

### Bugfixes

- `serializeSimpleOrdering` and `deserializeSimpleOrdering` are now using uri *decoding/encoding*

## Version 8.0.2 (2020-06-17)

### Bugfixes

- `LoadMorePagingComponent` fixed static load more button text

## Version 8.0.1 (2020-06-17)

### Bugfixes

- `HeaderContentRendererAbstractComponent` fixed initial setup of ordering css classes when using stored ordering

## Version 8.0.0 (2020-04-08)

### Features

- `QueryPermanentStorageGridInitializerComponent` now using `PermanentStorage` to store state instead of `CookieService`
- `DialogMetadataSelectorComponent` now using `PermanentStorage` to store state instead of `CookieService`
- all generic types are now optional, all defaults to `any`
- moved logic from `PagingInitializer` to `GridInitializer`
   - from `NoPagingInitializerComponent` to `NoGridInitializerComponent`
   - from `QueryPagingInitializerComponent` to `QueryGridInitializerComponent`
   - from `QueryCookiePagingInitializerComponent` to `QueryCookieGridInitializerComponent`

### BREAKING CHANGES

- removed deprecated `PagingInitializer` plugin
- renamend `QueryCookieGridInitializerComponent` to `QueryPermanentStorageGridInitializerComponent`
- renamend `QueryCookieGridInitializerOptions` to `QueryPermanentStorageGridInitializerOptions`
- `DialogMetadataSelectorOptions` property `cookieName` renamed to `storageName`
- `QueryPermanentStorageGridInitializerOptions` property `cookieIppName` renamed to `storageIppName`
- now depends on `@anglr/common` *7.3.0* version minimum

## Version 7.1.1

- fixed `NoGridInitializerComponent` which now using existing `PagingInitializer` to be backward compatible until next major version

## Version 7.1.0

- added new `CssDivsContentRendererComponent` as `ContentRenderer` plugin (using css grid)
- added new `CssDivsHeaderContentRendererComponent` as `HeaderContentRenderer` plugin (using css grid)
- added new `CssDivsBodyContentRendererComponent` as `BodyContentRenderer` plugin (using css grid)
- deprecated `PagingInitializer` plugin, use new `GridInitializer` (in next major version `PagingInitializer` will be removed)
- added new `GridInitializer` plugin allowing obtaining obtaining and storing state of grid to *external* storage
- for now `GridInitializer` is internally using `PagingInitializer` (in next major version this logic will be moved directly into `GridInitializer`)
- all built-in `Paging` plugins are using `GridInitializer`, custom `Paging` plugins should do same
- `GridInitializer` has same functionality as `PagingInitializer` extended with storing of *ordering*
- added new `NoGridInitializerComponent` as `GridInitializer` plugin that does nothing
- added new `QueryGridInitializerComponent` as `GridInitializer` plugin that is using query string for storing data
- added new `QueryCookieGridInitializerComponent` as `GridInitializer` plugin that extends `QueryGridInitializerComponent` and allows to store *items per page* also in cookie
- added `serializeSimpleOrdering`, `deserializeSimpleOrdering` helper functions for transformation of `SimpleOrdering` to and out of `string`
- added new `LimitedRowSelectorComponent` as `RowSelector` plugin that allows limitation of selected rows
- added `applyRowSelectionBlock` helper function that applies block of change event to *checkbox* inputs
- method `resetMetadata` of `HeaderContentRenderer` now have optional parameter `force` indicating whether forcibly reset metadata
- added extension method `setOrdering` which allows setting ordering from code

## Version 6.2.4

- fixed `BasicRowSelectorComponent` `selectItem` method, now correctly changes state of selected row

## Version 7.0.0

- added `CssClassesContentRenderer` for `ContentRenderer` that allows to use css class on content renderer
- updated to latest stable *Angular* 9
- added generating of API doc

## Version 6.2.3

- added extension method `patchOptions` which patches options without running initialization of grid, only initialize options

## Version 6.2.2

- extension method `areSelectedAllOnPage` extended with optional parameter `predicate` which allows conditionally return info whether selected all

## Version 6.2.1

- extension method `selectAllOnPage` extended with optional parameter `predicate` which allows conditionally select all

## Version 6.2.0

- `GridComponent` now renders without *wrapper* div around plugins
- *subpackage* `@anglr/grid/material`
   - added new `VirtualScrollTableContentRendererModule` that allows usage of *VirtualScrollContentRenderer* (experimental, needs optimalization)
   - added new `VirtualScrollTableContentRendererComponent` as `ContentRenderer` plugin (using angular cdk virtual scroll)
   - added new `VirtualScrollTableHeaderContentRendererComponent` as `HeaderContentRenderer` plugin (using angular cdk virtual scroll)
   - added new `VirtualScrollTableBodyContentRendererComponent` as `BodyContentRenderer` plugin (using angular cdk virtual scroll)
- refactored `DataLoader`, now holds information about its *state* and emits event when this *state* changes
   - state `DataLoaderState` has 5 values
- `NoDataRenderer` now using these new *states* of `DataLoader` and displays more detail info about state

## Version 6.1.3

 - added missing *title* with tooltip for `TableHeaderContentRendererComponent` and `GroupedTableHeaderContentRendererComponent`

## Version 6.1.2

 - *subpackage* `@anglr/grid/material`
   - fixed compilation error

## Version 6.1.1

 - *subpackage* `@anglr/grid/material`
   - fix `DialogMetadataSelectorComponent` export now correctly exported as stated
   - added missing import `MatDialogModule` to `DialogMetadataSelectorModule`
   - `VerticalDragNDropSelectionComponent`
      - added padding to component
      - added icon for dragging

## Version 6.1.0

 - created *subpackage* `@anglr/grid/material` containing all `@angular/material` dependent code
   - added new `DialogMetadataSelectorComponent` as `MetadataSelector` plugin (using angular material dialog)
   - added new `VerticalDragNDropSelectionComponent` that is used as default content of `DialogMetadataSelectorComponent`
 - created *subpackage* `@anglr/grid/extensions` containing all `extensions` methods (moved sources to this folder)
   - added new extension method `showMetadataSelector` allowing to display metadata selector
 - added method `show` to `MetadataSelector`
 - removed `TextsLocator` plugin and everything about it, replaced with `@anglr/common` `StringLocalization`
 - fixed `BasicPagingComponent`, `PreviousNextPagingComponent` initialization

## Version 6.0.0

- Angular IVY ready (APF compliant package)
- added support for ES2015 compilation
- Angular 8
- removed *deprecated* `LegacyGrid` and all its parts
- now if you want to use *Grouped Headers* you have to also use new `GroupedGridModule`
- now if you want to use *Css Grid* (grid composed of divs with css, not table) you have to also use new `CssDivsModule`
- moved functionality from `@anglr/grid-extensions` to subproject `@anglr/grid/scrollmagic`

## Version 5.1.0
 - added support for *Grouped Headers*, allowing multiline header with grouping of columns
    - added new `MetadataGatherer` => `GroupedTableMetadataGathererComponent` for obtaining information about header groups (using `<grouped-table-metadata>` html)
    - added new `HeaderTableGroupColumnComponent` and `HeaderTableGroupComponent` allowing definition of header groups (using `<table-group>`, `<table-group-column>` html)
    - added new `GroupedTableHeaderContentRendererComponent` used for rendering grouped headers
    - supporting only one level of grouped headers and each column must be part of group *for now*

## Version 5.0.4
 - refactored `PaginingInitializer`, now used as `GridPlugin`, instead of Paging plugin

## Version 5.0.3
 - added new extension method `invalidateBodyContent`, used for invalidating body content

## Version 5.0.2
 - added new method `setGridPluginInstances` into `GridComponent`

## Version 5.0.1
 - added new extension method `refreshDataToDefaultPage`
 - added new `PagingInitializer` with support of query and cookie for items per page `QueryCookiePagingInitializerComponent`

## Version 5.0.0
 - `@anglr/grid` is now marked as *sideEffects* free
 - stabilized for angular v6

## Version 5.0.0-beta.25
 - aktualizácia balíčkov `Angular` na `6`
 - aktualizácia `Webpack` na verziu `4`
 - aktualizácia `rxjs` na verziu `6`

## Version 5.0.0-beta.24
- added isArray check into `setSyncData`

## Version 5.0.0-beta.23
- added `initText` option to `NoDataRenederer` that is displayed when grid is not initialized
- updated `PreviousNextPagingComponent` and `BasicPagingComponent`, now renders only if grid is initialized

## Version 5.0.0-beta.22
- refactored `MetadataGatherer`, now allows easier extending, returning object instead of array

## Version 5.0.0-beta.21
- changed `ValueProvider` to `FactoryProvider` for `GridComponent`s provider `GRID_PLUGIN_INSTANCES` value provider did not correctly created new instance for every grid
- fixed import paths in extensions moved to package root

## Version 5.0.0-beta.20
- changed path for importing extensions from `@anglr/grid/dist/extensions` to `@anglr/grid/extensions`
- updated `initOptions` method, now correctly initialize options even if only options and no type has changed
- updated all plugins constructors all `GridPluginInstances` are made `Optional` in constructors

## Version 5.0.0-beta.19
- reverted changes in `NoPagingInitializerComponent`

## Version 5.0.0-beta.18
- added default options into `NoPagingComponent` and removed from `PagingAbstractComponent`
- added `setSyncData` extension into index

## Version 5.0.0-beta.17
- bug fix in `SyncDataLoader` when `itemsPerPage` is set to NaN
- added new extension for grid `setSyncData`

## Version 5.0.0-beta.16
- all plugin components added to `exports` of `GridModule`, so can be instantiated outside of grid, allowing custom positioning of visual components

## Version 5.0.0-beta.15
- set default css class `table-container` for `TableContentRendererComponent` wrapping div

## Version 5.0.0-beta.14
- added generated documentation, added few samples, updated `@internal` flags
- added `ContentVirtualScrollPagingComponent` as paging for grid, that allows loading data when content of grid is scrolled passing treshold
- added `PageVirtualScrollPagingComponent` as paging for grid, that allows loading data when page is scrolled passing treshold
- changed `TableContentRendererComponent`, now renders wrapping `<div>` around `<table>`

## Version 5.0.0-beta.13
- added `LoadMorePagingComponent` as paging for new grid allowing click to load more content
- added `PreviousNextPagingComponent` as paging for new grid allowing change pages using next, previous buttons

## Version 5.0.0-beta.12
- added `initOptions` method to `Grid`
- added `invalidateVisuals` method to `Grid`
- changed way how is grid initialized, more consistent behavior, ctor => setOptions => initOptions => createPlugins => setPluginOptions => initPluginOptions => initialize => initializePlugins, same works for nested plugins
- added extension method for reinitialization of grid options `reinitializeOptions`
- all `GridPlugin` extended with method `initOptions`, to be more consistent with grid and plugins lifecycle

## Version 5.0.0-beta.11
- updated `PagingAbstractComponent` and `BasicPagingComponent`, all `private` members changed to `protected`

## Version 5.0.0-beta.10
- updated `Grid.initialized`, now its `Observable<boolean>` and returns true if is grid initialized otherwise false

## Version 5.0.0-beta.9
- added new feature for `Grid`, `EventEmitter` that is called every time grid is initialized called `initialized`

## Version 5.0.0-beta.8
- fixed `QueryPagingInitializerComponent` now correctly sets query string

## Version 5.0.0-beta.7
- changed `QueryPagingInitializerComponent`, now using `replaceState`

## Version 5.0.0-beta.6
- added new feature for paging `PagingInitializer`
- added two implementation of `PagingInitializer`: `QueryPagingInitializerComponent`, `NoPagingInitializerComponent`

## Version 5.0.0-beta.5
- added index.ts for extensions for easier import using `import {} from '@anglr/grid/dist/extesions'`

## Version 5.0.0-beta.4
- added new extensions for grid `areSelectedAllOnPage`, `getSelectedData`, `isSelectedAny`, `resetSelection`, `selectAllOnPage`
- fixed missing z-index for advanced metadata selector
- added title *tooltips* for selected columns in advanced metadata selector
- changed method signature `selectItem`, now second parameter is `select` instead of `deselect` and defaults to `true`
- `SimplenoDataRendererComponent` displayed text centered

## Version 5.0.0-beta.3
- added new tool that correctly updates components to use external html

## Version 5.0.0-beta.2
- added missing external html

## Version 5.0.0-beta.1
- added new `GridComponent`
- added new `GridModule`
- added new metadata gatherer `BasicTableMetadataGatherer`
- added grid extensions `refreshData`, `getPage`, `setPage`, `refreshDataToDefaults`
- added `TextsLocator` plugin, `NoTextsLocator`
- added `RowSelector` plugin, `BasicRowSelector`
- added `Paging` plugins, `NoPaging`, `BasicPaging`
- added `NoDataRenderer` plugin, `SimpleNoDataRenderer`
- added `MetadataSelector` plugins, `NoMetadataSelector`, `AdvancedMetadataSelector`
- added `DataLoader` plugins, `SyncDataLoader`, `AsyncDataLoader`
- added `ContentRenderer` plugins, `TableContentRenderer`, `TableBodyContentRenderer`, `TableHeaderContentRenderer`, `AdvancedTableBodyContentRenderer`, `CssDivsContentRenderer`, `CssDivsBodyContentRenderer`, `CssDivsHeaderContentRenderer`

## Version 5.0.0-beta.0
- old grid renamed to `ng-legacy-grid`, `GridLegacyComponent`
- old column component renamed to `ng-legacy-column`, `ColumnLegacyComponent`
- old column group component renamed to `ng-legacy-columnGroup`, `ColumnGroupLegacyComponent`
- old basic paging renamed to `basic-legacy-paging`, `BasicPagingLegacyComponent`
- old basic paging renamed to `load-more-legacy-paging`, `LoadMorePagingLegacyComponent`
- old basic paging renamed to `PagingAbstractLegacyComponent`
- old basic paging renamed to `next-previous-legacy-paging`, `PreviousNextPagingLegacyComponent`
- all classes used by *Legacy* grid are deprecated, will be removed in version 6

## Version 4.0.3
- fixed displaying of column selection for Google Chrome

## Version 3.1.4
- fixed displaying of column selection for Google Chrome

## Version 4.0.2
 - returned typescript version back to 2.4.2 and removed distJit

## Version 4.0.1
 - added compiled outputs for Angular JIT

## Version 4.0.0
 - updated angular to 5.0.0 (final)
 - changed dependencies of project to peerDependencies
 - more strict compilation
 - updated usage of rxjs, now using operators

## Version 4.0.0-beta.0
 - updated angular to >=5.0.0-rc.7

## Version 3.1.3
- fixed properly setting of initial page to paging
- added new method `uninitialize` for `PagingAbstractComponent`

## Version 3.1.2
- changed private methods accessed from template to public

## Version 3.1.1
- `PreviousNextPagingComponent` has been added

## Version 3.1.0
- added `PagingAbstractComponent` base class for paging components
- `PagingComponent` renamed to `BasicPagingComponent`
- `BasicPagingComponent` is now set to OnPush change detection
- `BasicPagingComponent` has new selector `'basic-paging'`
- grid now supports dynamic change of paging component using new `GridOptions`
- `GridOptions` added `pagingOptions` and `pagingType`
- `LoadMorePagingComponent` has been added

## Version 3.0.2
- grid added option for disabling automatic data loading on init

## Version 3.0.1
- grid change detection is set to OnPush
- added method for explicit change detection run `invalidateVisuals()`

## Version 3.0.0
- angular 4.0.0
- stabilized version for AOT and SSR

## Version 3.0.0-beta.5
- angular 4.0.0-rc.5
- cookieService that can be used with SSR


## Version 3.0.0-beta.4
- changes from 2.2.6

## Version 3.0.0-beta.3
- tree shaking enabled (es2015 module)
- angular 4.0.0-rc.2

## Version 3.0.0-beta.2
- all members accessed from templates are now public

## Version 3.0.0-beta.1
- making module angular AOT compliant

## Version 3.0.0-beta.0
- angular 4.0.0-beta.7
- renamed selectors ng2-grid, ng2-column to ng-grid and ng-column

## Version 2.2.6
- fix support to set 'no data found message'

## Version 2.2.5
- fix support to set 'no data found message' (hack)

## Version 2.2.4
- added support to set 'no data found message' (either with default or with custom template)
- fixed grid paging binding bug (page changed after it was checked)

## Version 2.2.3
- updated support for minimal and maximal visible columns

## Version 2.2.1
- added support for minimal and maximal visible columns

## Version 2.2.0
- angular version 2.3.0

## Version 2.1.2
- fixed problem with template rendering for column, different template after event

## Version 2.1.1
 - merge with version 2.0.3

## Version 2.1.0
 - angular version 2.2.0

## Version 2.0.3
 - added option for column selection title

## Version 2.0.2
 - template column header
 - possibility to disable column visibility selection

## Version 2.0.1
 - row selection
 - possibility to use grid without id
 - header tooltip
 - fix column selection

## Version 2.0.0
 - angular version 2.0.1
 - UMD module
 - webpack usage
 - typescript 2 usage

## Version 1.5.0
 - angular version 2.0.0

## Version 1.4.0
 - angular version 2.0.0-rc.6

## Version 1.3.1
 - added `GridModule`

## Version 1.3.0
 - angular version 2.0.0-rc.5

## Version 1.2.4
 - items count correct displaying
 - all items now has active class when clicked

## Version 1.2.3
 - items count not displayed if all items displayed

## Version 1.2.2
 - support for item row number in custom template

## Version 1.2.1
 - support for storing items per page in cookies
 - paging now allows displaying displayedItems/totalCount

## Version 1.2.0

- angular version 2.0.0-rc.4
- column template support
- ordering support
- paging support
- column selection
- column width
- header css class
- cell css class
- columng groups (simple)
- debounced data loading
- css class for whole table div
