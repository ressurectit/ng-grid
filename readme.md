# Angular Grid

This is [readme](http://ezk-ivp-moss01/docs/ng-grid/) for angular grid.

Implementation of angular grid for displaying data.

Completely reworked `GridComponent` guide and documentation to old `LegacyGrid` can be found at version >=4.0.0 `@anglr/grid`.

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [API](http://ezk-ivp-moss01/docs/ng-grid/overview.html)
* [Change Log](http://ezk-ivp-moss01/docs/ng-grid/changelog.html)

## Description

* Module supports Angular Server Side Rendering
* Module supports Angular Ahead of Time Compilation
* Grid is composed of plugins and replecable parts, allows to change implementation of these plugins
* Metadata are gathered dynamically using `MetadataGatherer`
* Paging is realized using `Paging` plugin
* Row selection is realized using `RowSelector` plugin
* Texts used in components can be *localizaed* using `TextsLocator` plugin
* Information about no data are rendered using `NoDataRenderer` plugin
* Information about selected columns (metadata) are realized using `MetadataSelector`
* Obtaining data for grid is done by `DataLoader` plugin
* Rendering content (grid data) is done by `ContentRenderer` plugin
* All components are set to `OnPush` change detection

## Installation

To install latest version of this module you just run:

```nocode
npm install "@anglr/grid" --save
```
## Usage

### Import Module

This enables usage of all 'Grid' components.

### Grid basic usage

#### Typescript

*basicGrid.component.ts*

#### Template

*basicGrid.component.html*

### Grid advanced usage

#### Typescript

*advancedGrid.component.ts*

#### Template

*advancedGrid.component.html*