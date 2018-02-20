# Changelog

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
