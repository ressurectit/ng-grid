import {PluginDescription} from '../pluginDescription/pluginDescription.interface';
import {ContentRenderer, ContentRendererOptions, DataLoader, DataLoaderOptions, GridInitializer, GridInitializerOptions, MetadataSelector, MetadataSelectorOptions, NoDataRenderer, NoDataRendererOptions, Paging, PagingOptions, RowSelector, RowSelectorOptions} from '../plugins';

/**
 * All available types of plugins for grid
 */
export interface GridPluginTypes
{
    /**
     * Loader that is used for obtaining data that will be displayed
     */
    dataLoader: PluginDescription<DataLoader, DataLoaderOptions>;

    /**
     * Paging component used for applying paging to data
     */
    paging: PluginDescription<Paging, PagingOptions>;

    /**
     * Grid initializer component used for obtaining stored grid data
     */
    gridInitializer: PluginDescription<GridInitializer, GridInitializerOptions>;

    /**
     * Metadata selector used for gathering and manipulation with metadata
     */
    metadataSelector: PluginDescription<MetadataSelector, MetadataSelectorOptions>;

    /**
     * Renderer that renders obtained data
     */
    contentRenderer: PluginDescription<ContentRenderer, ContentRendererOptions>;

    /**
     * Renderer used for rendering information that there are no data currently
     */
    noDataRenderer: PluginDescription<NoDataRenderer, NoDataRendererOptions>;

    /**
     * Row selector used for handling row selection
     */
    rowSelector: PluginDescription<RowSelector, RowSelectorOptions>;
}