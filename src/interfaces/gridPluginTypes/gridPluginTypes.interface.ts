/**
 * All available types of plugins for grid
 */
export interface GridPluginTypes
{
    /**
     * Loader that is used for obtaining data that will be displayed
     */
    dataLoader: PluginDescription<DataLoader>;

    /**
     * Paging component used for applying paging to data
     */
    paging: PluginDescription<Paging>;

    /**
     * Grid initializer component used for obtaining stored grid data
     */
    gridInitializer: PluginDescription<GridInitializer>;

    /**
     * Metadata selector used for gathering and manipulation with metadata
     */
    metadataSelector: PluginDescription<MetadataSelector>;

    /**
     * Renderer that renders obtained data
     */
    contentRenderer: PluginDescription<ContentRenderer>;

    /**
     * Renderer used for rendering information that there are no data currently
     */
    noDataRenderer: PluginDescription<NoDataRenderer>;

    /**
     * Row selector used for handling row selection
     */
    rowSelector: PluginDescription<RowSelector>;
}