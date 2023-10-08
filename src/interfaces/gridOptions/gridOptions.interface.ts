/**
 * Describes grid options used for grid
 */
export interface GridOptions
{
    /**
     * Indication whether grid should be initialized automaticaly during 'NgOnInit' phase
     */
    autoInitialize?: boolean;

    /**
     * Position of paging rendered by grid
     */
    pagingPosition?: PagingPosition;

    /**
     * Css classes applied to grid component, possible to override only part of classes
     */
    cssClasses?: {};

    /**
     * Object defining overrides for default plugins, default plugins can be also specified using DI
     */
    plugins?: GridPluginTypes;
}