import {Directive, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RecursivePartial, nameof} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

import {GRID_INSTANCE} from '../../misc/tokens';
import {Grid, GridPluginTypes} from '../../interfaces';
import {AttachPlugins} from './attachPlugins.interface';

/**
 * Directive used for attaching external plugins to grid
 */
@Directive(
{
    selector: 'ng-grid[attachPlugins], [ngGrid][attachPlugins]',
})
export class AttachPluginsDirective implements OnChanges
{
    //######################### public properties - inputs #########################

    /**
     * Object storing external plugins
     */
    @Input('attachPlugins')
    public plugins: AttachPlugins = {};

    /**
     * Automatically initialize grid after new instances are set
     */
    @Input()
    public autoInitialize: boolean = true;

    /**
     * Indication whether perform force reinitialization
     */
    @Input()
    public forceReinitialization: boolean = false;

    //######################### constructor #########################
    constructor(@Inject(GRID_INSTANCE) protected grid: Grid,)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<AttachPluginsDirective>('plugins') in changes && this.plugins)
        {
            const plugins: RecursivePartial<GridPluginTypes> = {};

            if(this.plugins.contentRenderer)
            {
                plugins.contentRenderer =
                {
                    instance: this.plugins.contentRenderer,
                    type: null,
                };
            }

            if(this.plugins.dataLoader)
            {
                plugins.dataLoader =
                {
                    instance: this.plugins.dataLoader,
                    type: null,
                };
            }

            if(this.plugins.gridInitializer)
            {
                plugins.gridInitializer =
                {
                    instance: this.plugins.gridInitializer,
                    type: null,
                };
            }

            if(this.plugins.metadataSelector)
            {
                plugins.metadataSelector =
                {
                    instance: this.plugins.metadataSelector,
                    type: null,
                };
            }

            if(this.plugins.noDataRenderer)
            {
                plugins.noDataRenderer =
                {
                    instance: this.plugins.noDataRenderer,
                    type: null,
                };
            }

            if(this.plugins.ordering)
            {
                plugins.ordering =
                {
                    instance: this.plugins.ordering,
                    type: null,
                };
            }

            if(this.plugins.paging)
            {
                plugins.paging =
                {
                    instance: this.plugins.paging,
                    type: null,
                };
            }

            if(this.plugins.rowSelector)
            {
                plugins.rowSelector =
                {
                    instance: this.plugins.rowSelector,
                    type: null,
                };
            }

            this.grid.gridOptions =
            {
                plugins
            };

            if(this.autoInitialize)
            {
                await this.grid.initOptions();
                await lastValueFrom(this.grid.pluginsOptionsInitialized.pipe(first(init => init)));
                await this.grid.initialize(this.forceReinitialization);
            }
        }
    }
}