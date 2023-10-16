import {TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

import {GridColumn} from '../gridColumn';
import {GridContext} from '../gridContext/gridContext.interface';
import {GridRowContext} from '../gridRowContext/gridRowContext.interface';
import {GridDataRowContext} from '../gridDataRowContext/gridDataRowContext.interface';
import type {GridContainerTemplateSADirective} from '../../directives/gridContainerTemplate/gridContainerTemplate.directive';
import type {ContentContainerTemplateSADirective} from '../../directives/contentContainerTemplate/contentContainerTemplate.directive';

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
    //TODO: maybe use signals
    /**
     * Information that metadata for grid has changed
     */
    readonly metadataChange: Observable<void>;

    /**
     * Gets current metadata for grid
     */
    getMetadata(): TMetadata;
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
    gridContainer: GridContainerTemplateSADirective|undefined|null;

    /**
     * Template for grid header, with metadata
     */
    headerContainer: TemplateRef<GridContext>|undefined|null;

    /**
     * Template for grid content (body), with metadata
     */
    contentContainer: ContentContainerTemplateSADirective|undefined|null;

    /**
     * Template for grid footer, with metadata
     */
    footerContainer: TemplateRef<GridContext>|undefined|null;

    /**
     * Templates for header rows, with metadata
     */
    headerRowContainer: TemplateRef<GridRowContext>[]|undefined|null;

    /**
     * Templates for content rows (each data row can be rendered as multiple rows), with metadata
     */
    contentRowContainer: TemplateRef<GridDataRowContext>[]|undefined|null;

    /**
     * Templates for footer rows, with metadata
     */
    footerRowContainer: TemplateRef<GridRowContext>[]|undefined|null;
}