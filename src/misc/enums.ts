/**
 * Available paging position where should be rendered
 */
export enum PagingPosition
{
    /**
     * Paging will be rendered above grid content
     */
    Top,

    /**
     * Paging will be rendered below grid content
     */
    Bottom
}

/**
 * Available plugin types
 */
export enum GridPluginType
{
    /**
     * Content renderer used for rendering content area of grid
     */
    ContentRenderer = 'ContentRenderer',

    /**
     * Data loader used for obtaining data for grid
     */
    DataLoader = 'DataLoader',

    /**
     * Initializer that is used for obtaining stored initialization data for grid
     */
    GridInitializer = 'GridInitializer',

    /**
     * Allows selection of metadata that should be displayed
     */
    MetadataSelector = 'MetadataSelector',

    /**
     * Renderer that is used for rendering content when no data are present
     */
    NoDataRenderer = 'NoDataRenderer',

    /**
     * Enables paging of data
     */
    Paging = 'Paging',

    /**
     * Handles selection of rows
     */
    RowSelector = 'RowSelector',
}