import {ContentRenderer, ContentRendererOptions, CssClassesContentRenderer, CssClassesOrdering, DataLoader, GridInitializer, GridMetadata, GridPlugin, GridPluginInstances, MetadataSelector, NoDataRenderer, Ordering, OrderingOptions, Paging, RowSelector} from '../interfaces';

/**
 * Implementation of GridPluginInstances
 */
export class GridPluginInstancesDef implements GridPluginInstances
{
    //######################### public properties - implementation of GridPluginInstances #########################

    /**
     * @inheritdoc
     */
    public contentRenderer!: ContentRenderer<ContentRendererOptions<CssClassesContentRenderer>>;
    
    /**
     * @inheritdoc
     */
    public dataLoader!: DataLoader<unknown>;
    
    /**
     * @inheritdoc
     */
    public gridInitializer!: GridInitializer<unknown>;
    
    /**
     * @inheritdoc
     */
    public metadataSelector!: MetadataSelector<GridMetadata>;
    
    /**
     * @inheritdoc
     */
    public noDataRenderer!: NoDataRenderer;
    
    /**
     * @inheritdoc
     */
    public ordering!: Ordering<unknown, OrderingOptions<CssClassesOrdering>>;
    
    /**
     * @inheritdoc
     */
    public paging!: Paging;
    
    /**
     * @inheritdoc
     */
    public rowSelector!: RowSelector<unknown, unknown, unknown>;
    
    /**
     * Content renderer plugin
     */
    public get ContentRenderer(): GridPlugin<unknown>
    {
        return this.contentRenderer;
    }
    public set ContentRenderer(value: ContentRenderer)
    {
        this.contentRenderer = value;
    }
    
    /**
     * Data loader plugin
     */
    public get DataLoader(): GridPlugin<unknown>
    {
        return this.dataLoader;
    }
    public set DataLoader(value: DataLoader)
    {
        this.dataLoader = value;
    }
    
    /**
     * Grid initializer plugin
     */
    public get GridInitializer(): GridPlugin<unknown>
    {
        return this.gridInitializer;
    }
    public set GridInitializer(value: GridInitializer)
    {
        this.gridInitializer = value;
    }
    
    /**
     * Metadata selector plugin
     */
    public get MetadataSelector(): GridPlugin<unknown>
    {
        return this.metadataSelector;
    }
    public set MetadataSelector(value: MetadataSelector)
    {
        this.metadataSelector = value;
    }
    
    /**
     * No data renderer plugin
     */
    public get NoDataRenderer(): GridPlugin<unknown>
    {
        return this.noDataRenderer;
    }
    public set NoDataRenderer(value: NoDataRenderer)
    {
        this.noDataRenderer = value;
    }
    
    /**
     * Ordering plugin
     */
    public get Ordering(): GridPlugin<unknown>
    {
        return this.ordering;
    }
    public set Ordering(value: Ordering)
    {
        this.ordering = value;
    }
    
    /**
     * Paging plugin
     */
    public get Paging(): GridPlugin<unknown>
    {
        return this.paging;
    }
    public set Paging(value: Paging)
    {
        this.paging = value;
    }
    
    /**
     * Row selector plugin
     */
    public get RowSelector(): GridPlugin<unknown>
    {
        return this.rowSelector;
    }
    public set RowSelector(value: RowSelector)
    {
        this.rowSelector = value;
    }
}