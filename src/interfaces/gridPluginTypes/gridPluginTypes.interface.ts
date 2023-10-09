import {ContentRenderer} from '../../plugins/contentRenderer';
import {DataLoader} from '../../plugins/dataLoader';
import {GridInitializer} from '../../plugins/gridInitializer';
import {MetadataSelector} from '../../plugins/metadataSelector';
import {NoDataRenderer} from '../../plugins/noDataRenderer';
import {Paging} from '../../plugins/paging';
import {RowSelector} from '../../plugins/rowSelector';
import {PluginDescription} from '../pluginDescription/pluginDescription.interface';

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