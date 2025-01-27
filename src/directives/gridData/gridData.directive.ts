import {Directive, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataLoader, GRID_INSTANCE, Grid, GridPluginType, NoMetadataSelectorComponent, NoPagingOptions, NoPagingComponent, SyncDataLoaderOptions, SyncDataLoaderComponent} from '@anglr/grid';
import {RecursivePartial, nameof} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

/**
 * Directive that sets up static data for grid
 */
@Directive(
{
    selector: '[ngGrid][data]',
})
export class GridDataDirective<TData = unknown> implements OnChanges
{
    //######################### public properties - inputs #########################

    /**
     * Array of data that are displayed
     */
    @Input()
    public data: TData[]|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(GRID_INSTANCE) private _grid: Grid,)
    {
        this._grid.gridOptions =
        {
            plugins:
            {
                dataLoader:
                {
                    type: SyncDataLoaderComponent,
                    options: <RecursivePartial<SyncDataLoaderOptions<TData>>>
                    {
                        data: [],
                    },
                },
                paging:
                {
                    type: NoPagingComponent,
                    options: <NoPagingOptions>
                    {
                        initialItemsPerPage: 250,
                    },
                },
                metadataSelector:
                {
                    type: NoMetadataSelectorComponent,
                },
            },
        };
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<GridDataDirective>('data') in changes)
        {
            await lastValueFrom(this._grid.initialized.pipe(first(itm => itm)));

            const data = this.data ?? [];

            this._grid.execute(grid =>
            {
                const dataLoader = grid.getPlugin<DataLoader>(GridPluginType.DataLoader);

                (dataLoader.options as SyncDataLoaderOptions).data = Array.isArray(data) ? data : [];
                dataLoader.loadData();
            });
        }
    }
}
