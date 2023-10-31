import {PluginDescription} from '../pluginDescription/pluginDescription.interface';
import {PluginOptions} from '../pluginOptions/pluginOptions.interface';
import {ContentRenderer, DataLoader, GridInitializer, MetadataSelector, NoDataRenderer, Ordering, Paging, RowSelector} from '../plugins';

/**
 * All available types of plugins for grid
 */
export interface GridPluginTypes
{
    /**
     * Renderer that renders obtained data
     */
    contentRenderer: PluginDescription<ContentRenderer, PluginOptions>;

    /**
     * Loader that is used for obtaining data that will be displayed
     */
    dataLoader: PluginDescription<DataLoader, PluginOptions>;

    /**
     * Grid initializer component used for obtaining stored grid data
     */
    gridInitializer: PluginDescription<GridInitializer, PluginOptions>;

    /**
     * Metadata selector used for gathering and manipulation with metadata
     */
    metadataSelector: PluginDescription<MetadataSelector, PluginOptions>;

    /**
     * Renderer used for rendering information that there are no data currently
     */
    noDataRenderer: PluginDescription<NoDataRenderer, PluginOptions>;

    /**
     * Ordering component used for applying ordering to data
     */
    ordering: PluginDescription<Ordering, PluginOptions>;

    /**
     * Paging component used for applying paging to data
     */
    paging: PluginDescription<Paging, PluginOptions>;

    /**
     * Row selector used for handling row selection
     */
    rowSelector: PluginDescription<RowSelector, PluginOptions>;
}