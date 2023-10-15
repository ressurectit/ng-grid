import {ContentRenderer, ContentRendererOptions, CssClassesContentRenderer} from '../../../interfaces';

/**
 * Css classes for matrix content renderer
 */
export interface CssClassesMatrixContentRenderer extends CssClassesContentRenderer
{
}

/**
 * Matrix content renderer options
 */
export interface MatrixContentRendererOptions extends ContentRendererOptions<CssClassesMatrixContentRenderer>
{
}

/**
 * Public API for matrix content renderer
 */
export interface MatrixContentRenderer extends ContentRenderer<MatrixContentRendererOptions>
{
}