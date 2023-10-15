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

/**
 * Matrix grid metadata, contains templates for each rendered element
 */
export interface MatrixGridMetadata<TColumn extends GridColumn = GridColumn> extends TableGridMetadata<TColumn>
{
    /**
     * Template for grid container
     */
    gridContainer: TemplateRef<unknown>|undefined|null;

    /**
     * Template for grid header
     */
    headerContainer: TemplateRef<unknown>|undefined|null;

    /**
     * Template for grid content (body)
     */
    contentContainer: TemplateRef<unknown>|undefined|null;

    /**
     * Template for grid footer
     */
    footerContainer: TemplateRef<unknown>|undefined|null;

    /**
     * Templates for header rows
     */
    headerRowContainer: TemplateRef<unknown>[]|undefined|null;

    /**
     * Templates for content rows (each data row can be rendered as multiple rows)
     */
    contentRowContainer: TemplateRef<unknown>[]|undefined|null;

    /**
     * Templates for footer rows
     */
    footerRowContainer: TemplateRef<unknown>[]|undefined|null;
}