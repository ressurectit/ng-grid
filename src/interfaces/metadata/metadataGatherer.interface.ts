import {Signal} from '@angular/core';

import {GridColumn} from '../gridColumn';
import type {GridContainerTemplateDirective} from '../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import type {ContentContainerTemplateDirective} from '../../directives/contentContainerTemplate/contentContainerTemplate.directive';
import type {HeaderContainerTemplateDirective} from '../../directives/headerContainerTemplate/headerContainerTemplate.directive';
import type {FooterContainerTemplateDirective} from '../../directives/footerContainerTemplate/footerContainerTemplate.directive';
import type {HeaderRowContainerTemplateDirective} from '../../directives/headerRowContainerTemplate/headerRowContainerTemplate.directive';
import type {ContentRowContainerTemplateDirective} from '../../directives/contentRowContainerTemplate/contentRowContainerTemplate.directive';
import type {FooterRowContainerTemplateDirective} from '../../directives/footerRowContainerTemplate/footerRowContainerTemplate.directive';

/**
 * Base grid metadata interface
 */
export interface GridMetadata
{
}

/**
 * Gatherer used for gathering metadata for grid
 */
export interface MetadataGatherer<TMetadata extends GridMetadata = GridMetadata>
{
    /**
     * Information that metadata for grid has changed
     */
    readonly metadata: Signal<TMetadata>;
}

/**
 * Table grid metadata, contains columns
 */
export interface TableGridMetadata<TColumn extends GridColumn = GridColumn> extends GridMetadata
{
    /**
     * Array of columns gathered
     */
    columns: TColumn[];
}

/**
 * Matrix grid metadata, contains templates for each rendered element
 */
export interface MatrixGridMetadata<TColumn extends GridColumn = GridColumn> extends TableGridMetadata<TColumn>
{
    /**
     * Template for grid container, with metadata
     */
    gridContainer: GridContainerTemplateDirective|GridContainerTemplateDirective[]|undefined|null;

    /**
     * Template for grid header, with metadata
     */
    headerContainer: HeaderContainerTemplateDirective|undefined|null;

    /**
     * Template for grid content (body), with metadata
     */
    contentContainer: ContentContainerTemplateDirective|undefined|null;

    /**
     * Template for grid footer, with metadata
     */
    footerContainer: FooterContainerTemplateDirective|undefined|null;

    /**
     * Templates for header rows, with metadata
     */
    headerRowContainer: HeaderRowContainerTemplateDirective[]|undefined|null;

    /**
     * Templates for content rows (each data row can be rendered as multiple rows), with metadata
     */
    contentRowContainer: ContentRowContainerTemplateDirective[]|undefined|null;

    /**
     * Templates for footer rows, with metadata
     */
    footerRowContainer: FooterRowContainerTemplateDirective[]|undefined|null;
}