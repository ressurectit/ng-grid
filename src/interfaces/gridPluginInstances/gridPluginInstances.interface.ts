import {GridPluginType} from '../../misc/enums';
import {GridPlugin} from '../gridPlugin/gridPlugin.interface';
import {ContentRenderer, DataLoader, GridInitializer, MetadataSelector, NoDataRenderer, Ordering, Paging, RowSelector} from '../plugins';

/**
 * Object that stores all grid plugin instances
 */
export interface GridPluginInstances extends Record<GridPluginType, GridPlugin>
{
    /**
     * Instance of content renderer that renders obtained data
     */
    contentRenderer: ContentRenderer;

    /**
     * Instance of data loader that is used for obtaining data that will be displayed
     */
    dataLoader: DataLoader;
    
    /**
     * Instance of grid initializer that is used for obtaining stored grid data
     */
    gridInitializer: GridInitializer;
    
    /**
     * Instance of metadata selector used for gathering and manipulation with metadata
     */
    metadataSelector: MetadataSelector;
    
    /**
     * Instance of no data renderer used for rendering information that there are no data currently
     */
    noDataRenderer: NoDataRenderer;
    
    /**
     * Instance of ordering used for applying ordering to data
     */
    ordering: Ordering;
    
    /**
     * Instance of paging used for applying paging to data
     */
    paging: Paging;
    
    /**
     * Instance of row selector used for handling row selection
     */
    rowSelector: RowSelector;
}