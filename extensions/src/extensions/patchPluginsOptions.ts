import {GridAction, GridOptions, GridPluginType} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';

/**
 * Method used to patch plugins options only
 * @param options - Options to be used as patch
 */
export function patchPluginsOptions(options: RecursivePartial<GridOptions>): GridAction
{
    return async grid =>
    {
        if(options.plugins?.contentRenderer?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.ContentRenderer);
            
            plugin.options = options.plugins?.contentRenderer?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.contentRenderer.options = plugin.options;
        }

        if(options.plugins?.dataLoader?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.DataLoader);
            
            plugin.options = options.plugins?.dataLoader?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.dataLoader.options = plugin.options;
        }

        if(options.plugins?.gridInitializer?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.GridInitializer);
            
            plugin.options = options.plugins?.gridInitializer?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.gridInitializer.options = plugin.options;
        }

        if(options.plugins?.metadataSelector?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.MetadataSelector);
            
            plugin.options = options.plugins?.metadataSelector?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.metadataSelector.options = plugin.options;
        }

        if(options.plugins?.noDataRenderer?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.NoDataRenderer);
            
            plugin.options = options.plugins?.noDataRenderer?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.noDataRenderer.options = plugin.options;
        }

        if(options.plugins?.ordering?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.Ordering);
            
            plugin.options = options.plugins?.ordering?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.ordering.options = plugin.options;
        }

        if(options.plugins?.paging?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.Paging);
            
            plugin.options = options.plugins?.paging?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.paging.options = plugin.options;
        }

        if(options.plugins?.rowSelector?.options)
        {
            const plugin = grid.getPlugin(GridPluginType.RowSelector);
            
            plugin.options = options.plugins?.rowSelector?.options;
            await plugin.initOptions();

            grid.gridOptions.plugins.rowSelector.options = plugin.options;
        }
    };
}