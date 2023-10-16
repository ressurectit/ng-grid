import {TemplateRef, Type} from '@angular/core';

import {ContentRenderer, ContentRendererOptions, CssClassesContentRenderer, GridContext, GridDataRowContext, GridRowContext} from '../../../interfaces';

/**
 * Css classes for matrix content renderer
 */
export interface CssClassesMatrixContentRenderer extends CssClassesContentRenderer
{
    /**
     * Css class for grid container
     */
    gridContainerClass: string|undefined|null;

    /**
     * Css class for header container
     */
    headerContainerClass: string|undefined|null;

    /**
     * Css class for content (body) container
     */
    contentContainerClass: string|undefined|null;

    /**
     * Css class for footer container
     */
    footerContainerClass: string|undefined|null;

    /**
     * Css class for header row containers
     */
    headerRowContainerClass: string|undefined|null;

    /**
     * Css class for content (body) row containers
     */
    contentRowContainerClass: string|undefined|null;

    /**
     * Css class for footer row containers
     */
    footerRowContainerClass: string|undefined|null;
}

/**
 * Matrix content renderer options
 */
export interface MatrixContentRendererOptions extends ContentRendererOptions<CssClassesMatrixContentRenderer>
{
    /**
     * Type used for creating component containing default templates
     */
    defaults: Type<MatrixContentRendererDefautTemplates>;
}

/**
 * Public API for matrix content renderer
 */
export interface MatrixContentRenderer extends ContentRenderer<MatrixContentRendererOptions>
{
}

/**
 * Default templates for matrix content renderer
 */
export interface MatrixContentRendererDefautTemplates
{
    /**
     * Default template for grid container
     */
    gridContainer: TemplateRef<GridContext>;

    /**
     * Default template for grid header
     */
    headerContainer: TemplateRef<GridContext>;

    /**
     * Default template for grid content (body)
     */
    contentContainer: TemplateRef<GridContext>;

    /**
     * Default template for grid footer
     */
    footerContainer: TemplateRef<GridContext>;

    /**
     * Default templates for header rows
     */
    headerRowContainer: TemplateRef<GridRowContext>;

    /**
     * Default templates for content rows (each data row can be rendered as multiple rows)
     */
    contentRowContainer: TemplateRef<GridDataRowContext>;

    /**
     * Default templates for footer rows
     */
    footerRowContainer: TemplateRef<GridRowContext>;
}
