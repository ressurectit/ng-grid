[![npm version](https://badge.fury.io/js/%40anglr%2Fgrid.svg)](https://badge.fury.io/js/%40anglr%2Fgrid)
[![Build status](https://ci.appveyor.com/api/projects/status/0qphc2ah63r9isdr?svg=true)](https://ci.appveyor.com/project/kukjevov/ng-grid)

# Angular Grid (`@anglr/grid`)

`@anglr/grid` is a fully customizable, plugin-based Angular library for displaying tabular and tabular-like data. Every visible and non-visible part of the grid (data loading, paging, ordering, row selection, rendering, metadata selection, ...) is implemented as a **plugin** and can be replaced with your own implementation. This allows you to build virtually any grid-like UI – classic tables, CSS-grid tables, list views, galleries, virtual scrolled grids, even completely custom layouts – without forking the library.

The package is shipped in three entry points:

| Entry point | Description |
| --- | --- |
| `@anglr/grid` | Core grid components, directives, plugins and interfaces |
| `@anglr/grid/extensions` | Helper *grid actions* (`refreshData`, `setPage`, `setOrdering`, `getSelectedData`, …) that operate on a `Grid` instance |
| `@anglr/grid/material` | Optional plugins built on top of `@angular/material` and `@angular/cdk` (dialog metadata selector, CDK virtual scroll paging, virtual scroll table renderer) |

## Table of contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Core concepts](#core-concepts)
  - [Grid host components](#grid-host-components)
  - [`GridOptions` and `PluginDescription`](#gridoptions-and-plugindescription)
  - [Plugin lifecycle](#plugin-lifecycle)
  - [Configuring plugins via DI](#configuring-plugins-via-di)
  - [Grid actions and extensions](#grid-actions-and-extensions)
- [Plugin types](#plugin-types)
  - [DataLoader](#dataloader)
  - [Paging](#paging)
  - [Ordering](#ordering)
  - [ContentRenderer](#contentrenderer)
  - [MetadataSelector](#metadataselector)
  - [NoDataRenderer](#nodatarenderer)
  - [RowSelector](#rowselector)
  - [GridInitializer](#gridinitializer)
- [How to write a custom plugin](#how-to-write-a-custom-plugin)
- [Samples](#samples)
  - [Basic asynchronous data (matrix grid)](#basic-asynchronous-data-matrix-grid)
  - [Synchronous (static) data using `GridDataDirective`](#synchronous-static-data-using-griddatadirective)
  - [Global configuration via DI providers](#global-configuration-via-di-providers)
  - [Ordering](#ordering-sample)
  - [Row selection](#row-selection-sample)
  - [Metadata selection (dialog)](#metadata-selection-sample-dialog)
  - [Customized view (list / gallery)](#customized-view-list--gallery)
  - [Rendering as an HTML `<table>`](#rendering-as-an-html-table)
  - [Legacy (table) grid](#legacy-table-grid)
  - [Custom data loader plugin (reactive signals)](#custom-data-loader-plugin-reactive-signals)
  - [Reusable base class for "prehlad" pages](#reusable-base-class-for-prehlad-pages)
  - [Static-data directive shipped by the consumer app](#static-data-directive-shipped-by-the-consumer-app)
- [Useful links](#useful-links)

## Installation

```bash
npm install "@anglr/grid" --save
```

Optional peer dependencies for `@anglr/grid/material`:

```bash
npm install "@angular/material" "@angular/cdk" --save
```

`@anglr/grid` targets Angular `>= 19.1` and requires `@anglr/common` and `@jscrpt/common`.

## Quick start

A minimal *matrix grid* with asynchronous paging and ordering looks like this:

```typescript
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {AsyncDataLoaderOptions, BasicPagingOptions, DataResponse, GridOptions, MatrixGridModule, SimpleOrdering} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {Address, DataService} from './services/data.service';

@Component(
{
    selector: 'addresses',
    templateUrl: 'addresses.component.html',
    imports:
    [
        MatrixGridModule,
    ],
    providers:
    [
        DataService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent
{
    //######################### protected fields #########################

    private readonly _dataSvc: DataService = inject(DataService);

    //######################### protected properties - template bindings #########################

    protected readonly gridOptions: RecursivePartial<GridOptions> =
    {
        plugins:
        {
            dataLoader:
            {
                options: <AsyncDataLoaderOptions<Address, SimpleOrdering>>
                {
                    dataCallback: (page, itemsPerPage, ordering) => this._getData(page, itemsPerPage, ordering),
                },
            },
            paging:
            {
                options: <BasicPagingOptions>
                {
                    itemsPerPageValues: [10, 25, 50],
                    initialItemsPerPage: 10,
                },
            },
        },
    };

    //######################### private methods #########################

    private async _getData(page: number, itemsPerPage: number, ordering: SimpleOrdering): Promise<DataResponse<Address>>
    {
        const result = await lastValueFrom(this._dataSvc.getData({page, size: itemsPerPage}, ordering));

        return {
            data: result?.content ?? [],
            totalCount: result?.totalElements ?? 0,
        };
    }
}
```

```html
<div ngGrid [gridOptions]="gridOptions">
    <ng-container matrixGridColumn="country">
        <div *headerCellTemplate>Country</div>
        <div *contentCellTemplate="let row = datum">{{row.country}}</div>
    </ng-container>

    <ng-container matrixGridColumn="city">
        <div *headerCellTemplate>City</div>
        <div *contentCellTemplate="let row = datum">{{row.city}}</div>
    </ng-container>

    <ng-container matrixGridColumn="zip">
        <div *headerCellTemplate>ZIP</div>
        <div *contentCellTemplate="let row = datum">{{row.zip}}</div>
    </ng-container>
</div>
```

## Core concepts

### Grid host components

There are two grid host components:

- **`MatrixGridComponent`** (`<div ngGrid>` / `<table ngGrid>` etc.) – the modern, "matrix" grid host. It is **template based** – the columns and the row/cell layout are described directly in the host template using directives (`matrixGridColumn`, `*headerCellTemplate`, `*contentCellTemplate`, `*contentRowContainerTemplate`, `*contentContainerTemplate`, …). This is the recommended option for new code. Import `MatrixGridModule` (or the individual standalone directives/components) to use it.
- **`GridComponent`** (`<ng-grid>`) – the older, "legacy" grid. Columns are described via dedicated metadata components (`<basic-table-metadata>`, `<basic-table-column>`). Use `GridModule` to import everything in one go. Both grids share **the same plugin infrastructure** so all examples in this document apply to both, only the column markup is different.

Both grid components expose the same public API defined by the `Grid` interface – `gridOptions`, `initialize()`, `getPlugin()`, `execute()`, `executeAndReturn()`, and the `initialized` observable.

### `GridOptions` and `PluginDescription`

The grid is fully configured through a single `GridOptions` object:

```typescript
interface GridOptions
{
    autoInitialize: boolean;
    plugins: GridPluginTypes;
}
```

`GridPluginTypes` contains one `PluginDescription` per plugin slot (`dataLoader`, `paging`, `ordering`, `contentRenderer`, `metadataSelector`, `noDataRenderer`, `rowSelector`, `gridInitializer`). Each description has four properties:

```typescript
interface PluginDescription<TPlugin, TOptions>
{
    /** Type of plugin that will be dynamically instantiated. */
    type: Type<TPlugin> | null;

    /** Options that will be passed to the plugin once it is instantiated. */
    options: TOptions | null;

    /** Optional callback that receives the live plugin instance. */
    instanceCallback: ((plugin: TPlugin | null) => void) | null;

    /** Existing instance to use instead of creating a new one (mutually exclusive with `type`). */
    instance: TPlugin | null;
}
```

You normally only set `type` (when changing the default implementation) and/or `options` (when configuring the default implementation). Pass a `RecursivePartial<GridOptions>` – the grid deep-merges your options with the defaults.

### Plugin lifecycle

When the grid initializes (during `ngOnInit`, unless `autoInitialize` is `false`), it:

1. For each plugin slot resolves either `instance` or `type`, creates the component (in a hidden `ViewContainerRef`) and stores it in the shared `GridPluginInstances` container.
2. Sets the plugin's `.options`.
3. Calls `initOptions()` on every plugin.
4. Once all plugins are option-initialized it calls `initialize(force)` on every plugin in a defined order (`RowSelector` → `MetadataSelector` → `GridInitializer` → `Ordering` → `Paging` → `ContentRenderer` → `NoDataRenderer` → `DataLoader`).
5. Sets `initialized` to `true`.

All plugins share the `GridPluginInstances` injectable, so they can subscribe to each other (e.g. the data loader reacts to changes in paging and ordering). Plugins access each other either through their injected `gridPlugins` field or via `inject(GRID_PLUGIN_INSTANCES)`.

### Configuring plugins via DI

The library ships `provideXxx` helpers in `@anglr/grid` to globally configure plugins through Angular DI:

```typescript
import {ApplicationConfig} from '@angular/core';
import {BasicPagingOptions, providePagingOptions, provideGridInitializerType, provideMetadataSelectorType, QueryGridInitializerComponent} from '@anglr/grid';
import {DialogMetadataSelectorComponent} from '@anglr/grid/material';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideGridInitializerType(QueryGridInitializerComponent),
        provideMetadataSelectorType(DialogMetadataSelectorComponent),
        providePagingOptions<BasicPagingOptions>(
        {
            itemsPerPageValues: [15, 30, 60],
            initialItemsPerPage: 15,
        }),
    ],
};
```

Available helpers (all return Angular `Provider`):

- **Types** – `provideDataLoaderType`, `providePagingType`, `provideOrderingType`, `provideGridInitializerType`, `provideContentRendererType`, `provideMetadataSelectorType`, `provideNoDataRendererType`, `provideRowSelectorType`.
- **Options** – `provideDataLoaderOptions`, `providePagingOptions`, `provideOrderingOptions`, `provideGridInitializerOptions`, `provideContentRendererOptions`, `provideMetadataSelectorOptions`, `provideNoDataRendererOptions`, `provideRowSelectorOptions`.
- **Misc** – `provideGridOptions`, `provideCellContextFactoryFn`, `provideDataCellContextFactoryFn`, `provideDefaultMatrixColumnWidth`.

DI options/types are merged with the defaults and overridden by the `GridOptions` passed via `[gridOptions]`.

### Grid actions and extensions

Anything you want to *do* to a grid (refresh data, change page, change ordering, read selected rows, invalidate visuals, …) is implemented as a **grid action** – a function `(grid: Grid) => void | Promise<void>`. Actions are executed via `grid.execute(...actions)` or, when they return a value, via `grid.executeAndReturn(action)`. Importing them from `@anglr/grid/extensions` keeps the core small. Frequently used actions:

```typescript
import {areSelectedAllOnPage, getSelectedData, invalidateContent, isSelectedAny, refreshData, refreshDataToDefaults, resetSelection, selectAllOnPage, setOrdering, setPage, setSyncData, showMetadataSelector} from '@anglr/grid/extensions';
```

Example:

```typescript
this.grid.execute(setPage(1), refreshData(true));
const selected = this.grid.executeAndReturn(getSelectedData());
```

## Plugin types

Each plugin type has its own slot in `GridOptions.plugins`. The library ships several built-in implementations; you can pick any of them or write your own.

### DataLoader

Responsible for obtaining data and exposing the current result (and loading state) as a `Signal`.

Built-in implementations:

- **`AsyncDataLoaderComponent`** *(default)* – pulls data via an async `dataCallback(page, itemsPerPage, ordering)` and is recommended for server-paged data. Options: `AsyncDataLoaderOptions`.
- **`SyncDataLoaderComponent`** – holds a static `TData[]` array and slices/orders it locally. Options: `SyncDataLoaderOptions` (`data`, `orderData(data, ordering)`).

Common options live in `DataLoaderOptions`: `autoLoadData`, `accumulateData` (append new pages to the existing data – useful for infinite scroll), `debounceDataCallback` (ms).

### Paging

Provides the current `page` and `itemsPerPage` signals and renders a paging UI.

Built-in implementations:

- **`BasicPagingComponent`** *(default)* – classic numbered paging with items-per-page picker. Options: `BasicPagingOptions` (`pagesDispersion`, `itemsPerPageValues`, `initialItemsPerPage`).
- **`PreviousNextPagingComponent`** – `« ‹ › »` style. Options: `PreviousNextPagingOptions`.
- **`LoadMorePagingComponent`** – "Load more" button (works together with `accumulateData: true`). Options: `LoadMorePagingOptions`.
- **`NoPagingComponent`** – disables paging entirely.
- **`CdkVirtualScrollPagingComponent`** (from `@anglr/grid/material`) – integrates with `@angular/cdk/scrolling` for windowed/virtual paging.

### Ordering

Maintains the current ordering and triggers reloads on change.

Built-in implementations:

- **`SingleOrderingComponent`** *(default)* – single-column ordering using `SimpleOrdering` (`{orderBy, orderByDirection}`).
- **`NoOrderingComponent`** – disables ordering.

The visual "orderable" indicator on header cells is provided by the `OrderableDirective` (`orderable` attribute), which talks to the ordering plugin.

### ContentRenderer

Responsible for rendering the grid body (and header/footer) – this is where the visual structure of the grid lives.

Built-in implementations:

- **`MatrixContentRendererComponent`** *(default for `MatrixGridComponent`)* – CSS-grid based renderer driven by the matrix template directives. Highly customizable through the `*gridContainerTemplate`, `*headerContainerTemplate`, `*contentContainerTemplate`, `*headerRowContainerTemplate`, `*contentRowContainerTemplate`, `*footerContainerTemplate`, `*footerRowContainerTemplate`, `*headerCellTemplate`, `*contentCellTemplate` and `*footerCellTemplate` directives. By replacing any of these templates you can render lists, galleries, cards, etc.
- **`TableContentRendererComponent`** *(default for legacy `GridComponent`)* – classic `<table>` based renderer.
- **`CssDivsContentRendererComponent`** – `<div>` based renderer using CSS classes.
- **`VirtualScrollTableContentRendererComponent`** (from `@anglr/grid/material`) – table renderer combined with virtual scroll.

The `UseTableDirective` (`useTable`) instructs the matrix renderer to emit `<table>`/`<thead>`/`<tbody>` etc. instead of `<div>`s.

### MetadataSelector

Allows the user to toggle column visibility / ordering. The default `NoMetadataSelectorComponent` simply forwards the columns declared in the template. The `DialogMetadataSelectorComponent` from `@anglr/grid/material` opens an MD-dialog where users can show/hide and reorder columns. Combined with the `SelectionStoreDirective` (`selectionStore="<name>"`) and `QueryPermanentStorageGridInitializerComponent`, selections are persisted in permanent storage.

### NoDataRenderer

Renders the placeholder shown when no data are loaded. `SimpleNoDataRendererComponent` *(default)* renders configurable texts for `notLoaded`, `loading` and `noData` states.

### RowSelector

Tracks selected rows and exposes them as signals (`selectedIds`, `selectedData`).

Built-in implementations:

- **`NoRowSelectorComponent`** *(default)* – no selection.
- **`BasicRowSelectorComponent`** – multi-row selection. Options: `BasicRowSelectorOptions` (`getRowId`, `getRowData`).
- **`LimitedRowSelectorComponent`** – multi-row selection with a maximum allowed count (`limit`).

### GridInitializer

Provides the *initial* page / ordering / items per page (and optionally persists them between visits). Built-in implementations:

- **`NoGridInitializerComponent`** *(default)* – does nothing.
- **`QueryGridInitializerComponent`** – stores state in URL query params (so reloading the page or sharing the URL keeps the grid state).
- **`QueryPermanentStorageGridInitializerComponent`** – combines query params with a permanent storage backend (`@anglr/common`'s permanent storage). Options: `QueryPermanentStorageGridInitializerOptions` (`storageIppName`).

## How to write a custom plugin

A plugin is a standard Angular component that implements one of the plugin interfaces (`DataLoader`, `Paging`, `Ordering`, `ContentRenderer`, …) – all of which extend the generic `GridPlugin<TOptions>` interface:

```typescript
interface GridPlugin<TOptions = unknown> extends Invalidatable
{
    gridPlugins: GridPluginInstances | undefined | null;
    readonly pluginElement: ElementRef<HTMLElement>;

    get options(): TOptions;
    set options(value: RecursivePartial<TOptions>);

    initialize(force: boolean): PromiseOr<void>;
    initOptions(): PromiseOr<void>;
}
```

Below is a minimal example of a **custom data loader** that runs a user-supplied async callback whenever paging or ordering change. It is the same plugin used in the [reactive data sample](#custom-data-loader-plugin-reactive-signals).

```typescript
import {Component, ChangeDetectionStrategy, ElementRef, Signal, WritableSignal, signal, computed, inject} from '@angular/core';
import {DATA_LOADER_OPTIONS, DataLoader, DataLoaderOptions, DataLoaderState, DataResponse, GRID_PLUGIN_INSTANCES, GridPluginInstances} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';

/**
 * Options for the reactive data loader
 */
export interface ReactiveDataLoaderOptions<TData = unknown, TOrdering = unknown> extends DataLoaderOptions
{
    /**
     * Callback that returns data based on the current state of all other plugins
     */
    data: (plugins: GridPluginInstances) => Promise<DataResponse<TData>>;
}

const DEFAULT_OPTIONS: ReactiveDataLoaderOptions =
{
    autoLoadData: true,
    accumulateData: false,
    debounceDataCallback: 30,
    data: async () => ({data: [], totalCount: 0}),
};

@Component(
{
    selector: 'ng-reactive-data-loader',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveDataLoaderComponent<TData = unknown, TOrdering = unknown>
    implements DataLoader<DataResponse<TData>, ReactiveDataLoaderOptions<TData, TOrdering>>
{
    //######################### protected fields #########################

    protected readonly _result: WritableSignal<DataResponse<TData>> = signal({data: [], totalCount: 0});

    protected readonly _state: WritableSignal<DataLoaderState> = signal(DataLoaderState.NotLoadedYet);

    protected _options: ReactiveDataLoaderOptions<TData, TOrdering> =
        {...DEFAULT_OPTIONS, ...(inject(DATA_LOADER_OPTIONS, {optional: true}) ?? {})} as ReactiveDataLoaderOptions<TData, TOrdering>;

    //######################### public properties - implementation of GridPlugin #########################

    public gridPlugins: GridPluginInstances | null | undefined = inject(GRID_PLUGIN_INSTANCES, {optional: true});

    public readonly pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    public get options(): ReactiveDataLoaderOptions<TData, TOrdering>
    {
        return this._options;
    }
    public set options(value: RecursivePartial<ReactiveDataLoaderOptions<TData, TOrdering>>)
    {
        this._options = {...this._options, ...value} as ReactiveDataLoaderOptions<TData, TOrdering>;
    }

    //######################### public properties - implementation of DataLoader #########################

    public readonly result: Signal<DataResponse<TData>> = computed(() => this._result());

    public get state(): Signal<DataLoaderState>
    {
        return this._state.asReadonly();
    }

    //######################### public methods - implementation of GridPlugin #########################

    public initOptions(): void
    {
    }

    public async initialize(_force: boolean): Promise<void>
    {
        if(this._options.autoLoadData)
        {
            await this.loadData();
        }
    }

    public invalidateVisuals(): void
    {
    }

    //######################### public methods - implementation of DataLoader #########################

    public async loadData(_force?: boolean): Promise<void>
    {
        if(!this.gridPlugins)
        {
            return;
        }

        this._state.set(DataLoaderState.DataLoading);

        const response = await this._options.data(this.gridPlugins);

        this._result.set(response);
        this._state.set(response.data.length ? DataLoaderState.Loaded : DataLoaderState.NoData);
    }
}
```

Plug it into a grid:

```typescript
this.gridOptions =
{
    plugins:
    {
        dataLoader:
        {
            type: ReactiveDataLoaderComponent,
            options: <ReactiveDataLoaderOptions<Address, SimpleOrdering>>
            {
                data: async plugins =>
                {
                    const paging = plugins.Paging;
                    const ordering = plugins.Ordering as Ordering<SimpleOrdering>;

                    return await this._dataSvc.fetch(paging.page() ?? 1,
                                                     paging.itemsPerPage() ?? 15,
                                                     ordering.ordering());
                },
            },
        },
    },
};
```

The same pattern (custom component implementing the plugin interface) applies to all other plugin types (`Paging`, `Ordering`, `ContentRenderer`, `RowSelector`, …). For visual plugins (paging, ordering UI, renderers) you also write a template; the framework calls `initialize()` only after all other plugins are option-initialized, so by then you can safely read their signals.

## Samples

All samples below come from real, working code in the `ressurectit.github.io` demo site (`d:\git\ng\ressurectit.github.io.src`) and other applications. Each sample shows the *minimal interesting piece* – data services and CSS that are not relevant to the grid are omitted for brevity.

### Basic asynchronous data (matrix grid)

```typescript
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {AsyncDataLoaderOptions, DataResponse, GridOptions, MatrixGridModule, SimpleOrdering} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {Address, DataService} from '../../../services/api/data';

@Component(
{
    selector: 'basic-sample',
    templateUrl: 'basicSample.component.html',
    imports:
    [
        MatrixGridModule,
    ],
    providers:
    [
        DataService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSampleComponent
{
    //######################### protected fields #########################

    private readonly _dataSvc: DataService = inject(DataService);

    //######################### protected properties - template bindings #########################

    protected readonly gridOptions: RecursivePartial<GridOptions> =
    {
        plugins:
        {
            dataLoader:
            {
                options: <AsyncDataLoaderOptions<Address, SimpleOrdering>>
                {
                    dataCallback: (page, itemsPerPage, ordering) => this._getData(page, itemsPerPage, ordering),
                },
            },
        },
    };

    //######################### private methods #########################

    private async _getData(page: number, itemsPerPage: number, ordering: SimpleOrdering): Promise<DataResponse<Address>>
    {
        const result = await lastValueFrom(this._dataSvc.getData({page, size: itemsPerPage}, ordering));

        return {
            data: result?.content ?? [],
            totalCount: result?.totalElements ?? 0,
        };
    }
}
```

```html
<div ngGrid [gridOptions]="gridOptions">
    <ng-container matrixGridColumn="country">
        <div *headerCellTemplate>Country</div>
        <div *contentCellTemplate="let row = datum">{{row.country}}</div>
    </ng-container>

    <ng-container matrixGridColumn="city">
        <div *headerCellTemplate>City</div>
        <div *contentCellTemplate="let row = datum">{{row.city}}</div>
    </ng-container>

    <ng-container matrixGridColumn="zip">
        <div *headerCellTemplate>ZIP</div>
        <div *contentCellTemplate="let row = datum">{{row.zip}}</div>
    </ng-container>
</div>
```

### Synchronous (static) data using `GridDataDirective`

`GridDataDirective` ([`[ngGrid][data]`](src/directives/gridData/gridData.directive.ts)) is a one-liner shortcut that swaps the grid to a sync data loader. There is also `SyncDataLoaderComponent` for full control.

```typescript
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {GridDataDirective, MatrixGridModule} from '@anglr/grid';

import {Address} from '../../../services/api/data';

const DATA: Address[] =
[
    {country: 'Australia', city: 'Sydney', zip: '2000', street: 'George Street', houseNumber: '1'},
    {country: 'France', city: 'Paris', zip: '75001', street: 'Rue de Rivoli', houseNumber: '1'},
    {country: 'Japan', city: 'Tokyo', zip: '100-0001', street: 'Chiyoda', houseNumber: '1'},
    {country: 'USA', city: 'New York', zip: '10001', street: 'Broadway', houseNumber: '1'},
];

@Component(
{
    selector: 'basic-sync-sample',
    templateUrl: 'basicSyncSample.component.html',
    imports:
    [
        MatrixGridModule,
        GridDataDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSyncSampleComponent
{
    //######################### protected properties - template bindings #########################

    protected readonly data: Address[] = DATA;
}
```

```html
<div ngGrid [data]="data">
    <ng-container matrixGridColumn="country">
        <div *headerCellTemplate>Country</div>
        <div *contentCellTemplate="let row = datum">{{row.country}}</div>
    </ng-container>

    <ng-container matrixGridColumn="city">
        <div *headerCellTemplate>City</div>
        <div *contentCellTemplate="let row = datum">{{row.city}}</div>
    </ng-container>
</div>
```

### Global configuration via DI providers

Configure plugin defaults app-wide so every grid in the application starts the same way:

```typescript
import {ApplicationConfig} from '@angular/core';
import {BasicPagingOptions, provideContentRendererOptions, provideGridInitializerOptions, provideGridInitializerType, provideMetadataSelectorType, provideNoDataRendererOptions, providePagingOptions, QueryPermanentStorageGridInitializerComponent, QueryPermanentStorageGridInitializerOptions, TableContentRendererOptions} from '@anglr/grid';
import {DialogMetadataSelectorComponent} from '@anglr/grid/material';

export const appConfig: ApplicationConfig =
{
    providers:
    [
        provideGridInitializerType(QueryPermanentStorageGridInitializerComponent),
        provideMetadataSelectorType(DialogMetadataSelectorComponent),
        providePagingOptions<BasicPagingOptions>(
        {
            itemsPerPageValues: [15, 30, 60],
            initialItemsPerPage: 15,
        }),
        provideGridInitializerOptions<QueryPermanentStorageGridInitializerOptions>(
        {
            storageIppName: 'app-grid-ipp',
        }),
        provideNoDataRendererOptions(
        {
            texts:
            {
                loading: 'Loading data…',
                noData: 'No data match the given filter.',
                notLoaded: 'Set the filter and press Search to load data.',
            },
        }),
        provideContentRendererOptions<TableContentRendererOptions>(
        {
            cssClasses:
            {
                containerDiv: 'table-container thin-scrollbar',
            },
        }),
    ],
};
```

DI values can also be scoped to a single component – just place the providers in the component's `providers` array.

### Ordering sample

Just add the `orderable` directive on the header cells you want to make sortable. The default `SingleOrderingComponent` will handle the rest.

```html
<div ngGrid [gridOptions]="gridOptions">
    <ng-container matrixGridColumn="country">
        <div *headerCellTemplate orderable class="flex-row"><div class="flex-1">Country</div></div>
        <div *contentCellTemplate="let row = datum">{{row.country}}</div>
    </ng-container>

    <ng-container matrixGridColumn="city">
        <div *headerCellTemplate orderable class="flex-row"><div class="flex-1">City</div></div>
        <div *contentCellTemplate="let row = datum">{{row.city}}</div>
    </ng-container>
</div>
```

Add `OrderableDirective` to the component imports.

### Row selection sample

```typescript
import {Component, ChangeDetectionStrategy, Signal, WritableSignal, signal, viewChild, effect, inject, Injector} from '@angular/core';
import {AsyncDataLoaderOptions, BasicRowSelectorComponent, BasicRowSelectorOptions, DataResponse, Grid, GridOptions, GridPluginType, MatrixGridModule, RowSelector, SimpleOrdering} from '@anglr/grid';
import {areSelectedAllOnPage, invalidateContent, isSelectedAny, selectAllOnPage} from '@anglr/grid/extensions';
import {RecursivePartial} from '@jscrpt/common';

import {Address, Citizen, DataService} from '../../../services/api/data';

@Component(
{
    selector: 'row-selection-sample',
    templateUrl: 'rowSelectionSample.component.html',
    imports:
    [
        MatrixGridModule,
    ],
    providers:
    [
        DataService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowSelectionSampleComponent
{
    //######################### protected fields #########################

    private readonly _injector: Injector = inject(Injector);

    private readonly _dataSvc: DataService = inject(DataService);

    //######################### protected properties - template bindings #########################

    protected readonly selectedAll: WritableSignal<boolean> = signal(false);

    protected readonly selectedAny: WritableSignal<boolean> = signal(false);

    protected readonly gridOptions: RecursivePartial<GridOptions> =
    {
        plugins:
        {
            dataLoader:
            {
                options: <AsyncDataLoaderOptions<Address, SimpleOrdering>>
                {
                    dataCallback: (page, ipp, ordering) => this._getData(page, ipp, ordering),
                },
            },
            rowSelector:
            {
                type: BasicRowSelectorComponent,
                options: <BasicRowSelectorOptions<Citizen, Address, string>>
                {
                    getRowId: (data: Address) => data.id ?? 'MISSING ID!',
                    getRowData: (data: Address) => data.citizen ?? {},
                },
            },
        },
    };

    //######################### public properties - children #########################

    public readonly grid: Signal<Grid> = viewChild.required('grid');

    //######################### constructor #########################
    constructor()
    {
        effect(() =>
        {
            this.grid().initialized.subscribe(initialized =>
            {
                if(!initialized)
                {
                    return;
                }

                effect(() =>
                {
                    const selector = this.grid().getPlugin<RowSelector<Citizen, Address, string>>(GridPluginType.RowSelector);
                    selector.selectedIds();

                    this.selectedAny.set(this.grid().executeAndReturn(isSelectedAny()));
                    this.selectedAll.set(this.grid().executeAndReturn(areSelectedAllOnPage()));
                }, {injector: this._injector});
            });
        });
    }

    //######################### protected methods - template bindings #########################

    protected toggleAllSelected(value: boolean): void
    {
        this.grid().execute(selectAllOnPage(value),
                            invalidateContent());
    }

    //######################### private methods #########################

    private async _getData(_page: number, _itemsPerPage: number, _ordering: SimpleOrdering): Promise<DataResponse<Address>>
    {
        // ...same as previous samples
        return {data: [], totalCount: 0};
    }
}
```

```html
<div ngGrid #grid [gridOptions]="gridOptions">
    <ng-container matrixGridColumn="selection" width="36px">
        <div *headerCellTemplate>
            <input type="checkbox"
                   (click)="toggleAllSelected($any($event.target).checked)"
                   [checked]="selectedAll()">
        </div>

        <div *contentCellTemplate="let datum=datum; let isSelected=isSelected; let plugins=plugins">
            <input type="checkbox"
                   (click)="plugins.rowSelector.selectItem(datum, $any($event.target).checked)"
                   [checked]="isSelected">
        </div>
    </ng-container>

    <ng-container matrixGridColumn="country">
        <div *headerCellTemplate>Country</div>
        <div *contentCellTemplate="let row = datum">{{row.country}}</div>
    </ng-container>
</div>
```

### Metadata selection sample (dialog)

Use the material `DialogMetadataSelectorComponent` and `SelectionStoreDirective`. The `[showMetadataSelectorFor]` directive turns any element into a button that opens the dialog for the referenced grid.

```typescript
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {AsyncDataLoaderOptions, DataResponse, GridOptions, MatrixGridModule, ShowMetadataSelectorForDirective, SimpleOrdering} from '@anglr/grid';
import {DialogMetadataSelectorOptions, SelectionStoreDirective} from '@anglr/grid/material';
import {RecursivePartial} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {Address, DataService} from '../../../services/api/data';

@Component(
{
    selector: 'metadata-selection-sample',
    templateUrl: 'metadataSelectionSample.component.html',
    imports:
    [
        MatrixGridModule,
        SelectionStoreDirective,
        ShowMetadataSelectorForDirective,
    ],
    providers:
    [
        DataService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataSelectionSampleComponent
{
    //######################### protected fields #########################

    private readonly _dataSvc: DataService = inject(DataService);

    //######################### protected properties - template bindings #########################

    protected readonly gridOptions: RecursivePartial<GridOptions> =
    {
        plugins:
        {
            dataLoader:
            {
                options: <AsyncDataLoaderOptions<Address, SimpleOrdering>>
                {
                    dataCallback: (page, ipp, ordering) => this._getData(page, ipp, ordering),
                },
            },
            metadataSelector:
            {
                options: <DialogMetadataSelectorOptions>
                {
                    showButtonVisible: false,
                },
            },
        },
    };

    //######################### private methods #########################

    private async _getData(page: number, itemsPerPage: number, ordering: SimpleOrdering): Promise<DataResponse<Address>>
    {
        const result = await lastValueFrom(this._dataSvc.getData({page, size: itemsPerPage}, ordering));

        return {
            data: result?.content ?? [],
            totalCount: result?.totalElements ?? 0,
        };
    }
}
```

```html
<button type="button" class="btn btn-primary" [showMetadataSelectorFor]="grid">
    Open Metadata Selector
</button>

<div ngGrid #grid [gridOptions]="gridOptions" selectionStore="metadataSelectionSample">
    <ng-container matrixGridColumn="country" title="Country">
        <div *headerCellTemplate>Country</div>
        <div *contentCellTemplate="let row = datum">{{row.country}}</div>
    </ng-container>

    <ng-container matrixGridColumn="name" title="Name" [visible]="false">
        <div *headerCellTemplate>Name</div>
        <div *contentCellTemplate="let row = datum">{{row.citizen.name}}</div>
    </ng-container>
</div>
```

### Customized view (list / gallery)

Because the matrix renderer is template based, you can replace `*headerContainerTemplate`, `*contentRowContainerTemplate` or `*contentContainerTemplate` with anything you like – the rest of the grid (data loading, paging, ordering, selection) still works.

```html
<!-- List view -->
<div ngGrid [gridOptions]="gridOptions">
    <div *headerContainerTemplate></div>

    <div *contentRowContainerTemplate="let datum = datum" class="grid-content-row-css-grid-custom">
        <div class="flex-row gap-small"><div class="italic">Country:</div><div class="bold">{{datum.country}}</div></div>
        <div class="flex-row gap-small"><div class="italic">City:</div><div class="bold">{{datum.city}}</div></div>
    </div>
</div>

<!-- Gallery view -->
<div ngGrid [gridOptions]="galleryGridOptions">
    <div *headerContainerTemplate></div>

    <div *contentContainerTemplate="let data = data" class="gallery-div">
        @for(datum of data; track datum)
        {
            <div class="image-div" [style.backgroundImage]="`url(${datum.source})`"></div>
        }
    </div>
</div>
```

### Rendering as an HTML `<table>`

Add the `useTable` directive to make the matrix renderer emit real `<table>`/`<thead>`/`<tbody>` tags.

```html
<table ngGrid [gridOptions]="gridOptions" useTable>
    <ng-container matrixGridColumn="country">
        <th *headerCellTemplate>Country</th>
        <td *contentCellTemplate="let row = datum">{{row.country}}</td>
    </ng-container>

    <ng-container matrixGridColumn="city">
        <th *headerCellTemplate>City</th>
        <td *contentCellTemplate="let row = datum">{{row.city}}</td>
    </ng-container>
</table>
```

### Legacy (table) grid

For projects still on the older `<ng-grid>` host component, use `GridModule`:

```typescript
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {AsyncDataLoaderOptions, BasicPagingOptions, DataResponse, GridModule, GridOptions, SimpleOrdering} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {Address, DataService} from '../../../services/api/data';

@Component(
{
    selector: 'legacy-basic-sample',
    templateUrl: 'legacyBasicSample.component.html',
    imports:
    [
        GridModule,
    ],
    providers:
    [
        DataService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyBasicSampleComponent
{
    //######################### protected fields #########################

    private readonly _dataSvc: DataService = inject(DataService);

    //######################### protected properties - template bindings #########################

    protected readonly gridOptions: RecursivePartial<GridOptions> =
    {
        plugins:
        {
            dataLoader:
            {
                options: <AsyncDataLoaderOptions<Address, SimpleOrdering>>
                {
                    dataCallback: (page, ipp, ordering) => this._getData(page, ipp, ordering),
                },
            },
            paging:
            {
                options: <BasicPagingOptions>
                {
                    itemsPerPageValues: [5, 10, 20],
                    initialItemsPerPage: 5,
                },
            },
        },
    };

    //######################### private methods #########################

    private async _getData(page: number, itemsPerPage: number, ordering: SimpleOrdering): Promise<DataResponse<Address>>
    {
        const result = await lastValueFrom(this._dataSvc.getData({page, size: itemsPerPage}, ordering));

        return {
            data: result?.content ?? [],
            totalCount: result?.totalElements ?? 0,
        };
    }
}
```

```html
<ng-grid [gridOptions]="gridOptions">
    <basic-table-metadata>
        <basic-table-column id="country" name="country" title="Country"></basic-table-column>
        <basic-table-column id="city" name="city" title="City"></basic-table-column>
        <basic-table-column id="zip" name="zip" title="ZIP"></basic-table-column>
        <basic-table-column id="street" name="street" title="Street"></basic-table-column>
        <basic-table-column id="houseNumber" name="houseNumber" title="House Number"></basic-table-column>
    </basic-table-metadata>
</ng-grid>
```

### Custom data loader plugin (reactive signals)

Showcases plugging in a custom data loader component (see [How to write a custom plugin](#how-to-write-a-custom-plugin)) and reading other plugins' signals (paging, ordering) to compute the data request reactively.

```typescript
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {GridOptions, MatrixGridModule, Ordering, SimpleOrdering} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {Address, DataService} from '../../../services/api/data';
import {ReactiveDataLoaderComponent} from '../../../plugins/reactiveDataLoader.component';
import {ReactiveDataLoaderOptions} from '../../../plugins/reactiveDataLoader.interface';

@Component(
{
    selector: 'reactive-data-sample',
    templateUrl: 'reactiveDataSample.component.html',
    imports:
    [
        MatrixGridModule,
    ],
    providers:
    [
        DataService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveDataSampleComponent
{
    //######################### protected fields #########################

    private readonly _dataSvc: DataService = inject(DataService);

    //######################### protected properties - template bindings #########################

    protected readonly gridOptions: RecursivePartial<GridOptions> =
    {
        plugins:
        {
            dataLoader:
            {
                type: ReactiveDataLoaderComponent,
                options: <ReactiveDataLoaderOptions<Address, SimpleOrdering>>
                {
                    data: async plugins =>
                    {
                        const paging = plugins.paging;
                        const ordering = plugins.ordering as Ordering<SimpleOrdering>;

                        const result = await lastValueFrom(this._dataSvc.getData({
                                                                                     page: paging.page() ?? 1,
                                                                                     size: paging.itemsPerPage() ?? 15,
                                                                                 },
                                                                                 ordering.ordering()));

                        return {
                            data: result?.content ?? [],
                            totalCount: result?.totalElements ?? 0,
                        };
                    },
                },
            },
        },
    };
}
```

### Reusable base class for "overview" pages

The project can encapsulate the common parts of every "list" (overview) page – grid + filter form + URL persistence – in a base class. This is a great pattern when you have many similar grid-driven pages.

```typescript
import {Directive, ViewChild, OnInit, ChangeDetectorRef, inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormModelBuilder, FormModelGroup} from '@anglr/common/forms';
import {AsyncDataLoaderOptions, DataResponse, Grid, GridOptions, SimpleOrdering} from '@anglr/grid';
import {refreshData, resetSelection, setPage} from '@anglr/grid/extensions';
import {BindThis, Pageable, PagedData, RecursivePartial, serializeToUrlQuery} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {Observable} from 'rxjs';

@Directive()
export abstract class BasePrehladComponent<TFilter extends Record<string, unknown>, TDataItem> implements OnInit
{
    //######################### protected fields #########################

    protected route: ActivatedRoute = inject(ActivatedRoute);

    protected router: Router = inject(Router);

    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    protected formModelBuilder: FormModelBuilder = inject(FormModelBuilder);

    protected currentPaging: Pageable | undefined;

    protected currentOrdering: SimpleOrdering | undefined | null;

    //######################### public properties - template bindings #########################

    public gridOptions: RecursivePartial<GridOptions>;

    public filter!: FormGroup<FormModelGroup<TFilter>>;

    //######################### public properties - children #########################

    @ViewChild('grid')
    public grid?: Grid;

    //######################### protected properties #########################

    protected abstract get defaultFilterValue(): TFilter;

    //######################### constructor #########################
    constructor()
    {
        this.gridOptions =
        {
            plugins:
            {
                dataLoader:
                {
                    options: <AsyncDataLoaderOptions>
                    {
                        dataCallback: this.getData,
                        autoLoadData: false,
                    },
                },
            },
        };
    }

    //######################### public methods - implementation of OnInit #########################

    public ngOnInit(): void
    {
        this.filter = this.formModelBuilder.build(this.defaultFilterValue);
    }

    //######################### public methods #########################

    public refreshGrid(): void
    {
        this.grid?.execute(refreshData(true));
    }

    public refreshGridToDefaults(): void
    {
        this.grid?.execute(setPage(1), refreshData(true));
        this.grid?.execute(resetSelection());
    }

    public async search(): Promise<void>
    {
        await this.router.navigate(['.', {filter: serializeToUrlQuery(this.filter?.value), searched: true}],
                                   {
                                       relativeTo: this.route,
                                       queryParamsHandling: 'merge',
                                       replaceUrl: true,
                                   });

        this.refreshGridToDefaults();
    }

    //######################### protected methods #########################

    @BindThis
    protected async getData(page: number, itemsPerPage: number, ordering: SimpleOrdering | undefined | null): Promise<DataResponse<TDataItem>>
    {
        this.currentPaging = {page: page - 1, size: itemsPerPage};
        this.currentOrdering = ordering;

        const result = await lastValueFrom(this.getPrehlad(this.currentPaging, ordering, this.filter?.value as TFilter));

        return {
            data: result?.content ?? [],
            totalCount: result?.totalElements ?? 0,
        };
    }

    protected abstract getPrehlad(paging: Pageable,
                                  ordering: SimpleOrdering | undefined | null,
                                  filter: TFilter): Observable<PagedData<TDataItem>>;
}
```

### Static-data directive shipped by the consumer app

Project can implement a custom `[ngGrid][pagedData]` directive that wires a `SyncDataLoaderComponent` + `BasicPagingComponent` + `NoMetadataSelectorComponent` setup. It demonstrates how applications can build domain-specific shortcuts on top of `@anglr/grid` while still using the official `Grid` API.

```typescript
import {Directive, Input, OnChanges, SimpleChanges, inject} from '@angular/core';
import {BasicPagingComponent, BasicPagingOptions, DataLoader, GRID_INSTANCE, Grid, GridPluginType, NoMetadataSelectorComponent, SyncDataLoaderComponent, SyncDataLoaderOptions} from '@anglr/grid';
import {RecursivePartial, nameof} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

@Directive(
{
    selector: '[ngGrid][pagedData]',
})
export class BasicPagingGridDataDirective<TData = unknown> implements OnChanges
{
    //######################### protected fields #########################

    private readonly _grid: Grid = inject(GRID_INSTANCE);

    //######################### public properties - inputs #########################

    @Input('pagedData')
    public data: TData[] | undefined | null;

    //######################### constructor #########################
    constructor()
    {
        this._grid.gridOptions =
        {
            plugins:
            {
                dataLoader:
                {
                    type: SyncDataLoaderComponent,
                    options: <RecursivePartial<SyncDataLoaderOptions<TData>>>
                    {
                        data: [],
                    },
                },
                paging:
                {
                    type: BasicPagingComponent,
                    options: <BasicPagingOptions>
                    {
                        initialItemsPerPage: 15,
                    },
                },
                metadataSelector:
                {
                    type: NoMetadataSelectorComponent,
                },
            },
        };
    }

    //######################### public methods - implementation of OnChanges #########################

    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<BasicPagingGridDataDirective>('data') in changes)
        {
            await lastValueFrom(this._grid.initialized.pipe(first(itm => itm)));

            const data = this.data ?? [];

            this._grid.execute(grid =>
            {
                const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);

                (dataLoader.options as SyncDataLoaderOptions).data = Array.isArray(data) ? data : [];
                dataLoader.loadData();
            });
        }
    }
}
```

## Useful links

- [Basic concept (live docs)](https://ressurectit.github.io/#/content/grid/concept)
- [API – `@anglr/grid`](https://ressurectit.github.io/#/content/api/ng-grid/grid)
- [API – `@anglr/grid/extensions`](https://ressurectit.github.io/#/content/api/ng-grid-extensions/grid-extensions)
- [API – `@anglr/grid/material`](https://ressurectit.github.io/#/content/api/ng-grid-material/grid-material)
- [Live samples](https://ressurectit.github.io/#/content/grid)
