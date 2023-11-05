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
     * Enables and handles ordering of data
     */
    Ordering = 'Ordering',

    /**
     * Enables and handles paging of data
     */
    Paging = 'Paging',

    /**
     * Handles selection of rows
     */
    RowSelector = 'RowSelector',
}

/**
 * Possible states of data loader
 */
export enum DataLoaderState
{
    /**
     * Loader has not loaded any data yet, this is initial state before first try for loading data
     */
    NotLoadedYet,

    /**
     * This state is present during loading of data when there are no data present
     */
    NoDataLoading,

    /**
     * This state is present any time loader is loading new data, while some data were already loaded
     */
    DataLoading,

    /**
     * This state is present when there are no data available after loading of data
     */
    NoData,

    /**
     * Loader loaded and have some data to be displayed
     */
    Loaded,
}