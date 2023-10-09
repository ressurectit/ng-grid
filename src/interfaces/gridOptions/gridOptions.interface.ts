import {PagingPosition} from '../../misc/enums';
import {GridPluginTypes} from '../gridPluginTypes/gridPluginTypes.interface';

/**
 * Describes grid options used for grid
 */
export interface GridOptions
{
    /**
     * Indication whether grid should be initialized automaticaly during 'NgOnInit' phase
     */
    autoInitialize: boolean;

    //TODO: remove? or move
    /**
     * Position of paging rendered by grid
     */
    pagingPosition: PagingPosition;

    /**
     * Object defining overrides for default plugins, default plugins can be also specified using DI
     */
    plugins: GridPluginTypes;
}