import {TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

import {GridColumn} from '../gridColumn';

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

export interface MatrixGridMetadata<TColumn extends GridColumn = GridColumn> extends TableGridMetadata<TColumn>
{
    /**
     * Template for grid container
     */
    gridContainer: TemplateRef<unknown>;

    /**
     * Template for grid header
     */
    headerContainer: TemplateRef<unknown>;

    /**
     * Template for grid content (body)
     */
    contentContainer: TemplateRef<unknown>;

    /**
     * Template for grid footer
     */
    footerContainer: TemplateRef<unknown>;

    /**
     * Templates for header rows
     */
    headerRowContainer: TemplateRef<unknown>[];

    /**
     * Templates for content rows (each data row can be rendered as multiple rows)
     */
    contentRowContainer: TemplateRef<unknown>[];

    /**
     * Templates for footer rows
     */
    footerRowContainer: TemplateRef<unknown>[];
}