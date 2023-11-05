import {ContentRenderer, DataLoader, GridInitializer, MetadataSelector, NoDataRenderer, Ordering, Paging, RowSelector} from '../../interfaces';

/**
 * Definition of plugin instances that can be attached to grid
 */
export interface AttachPlugins
{
    /**
     * Instance of content renderer plugin
     */
    contentRenderer?: ContentRenderer;

    /**
     * Instance of data loader plugin
     */
    dataLoader?: DataLoader;

    /**
     * Instance of grid initializer plugin
     */
    gridInitializer?: GridInitializer;

    /**
     * Instance of metadata selector plugin
     */
    metadataSelector?: MetadataSelector;

    /**
     * Instance of no data renderer plugin
     */
    noDataRenderer?: NoDataRenderer;

    /**
     * Instance of ordering plugin
     */
    ordering?: Ordering;

    /**
     * Instance of paging plugin
     */
    paging?: Paging;

    /**
     * Instance of row selector plugin
     */
    rowSelector?: RowSelector;
}