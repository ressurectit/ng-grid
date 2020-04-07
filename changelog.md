# Changelog

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
