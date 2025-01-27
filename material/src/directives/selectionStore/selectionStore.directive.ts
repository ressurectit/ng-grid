import {Attribute, Directive, Inject} from '@angular/core';
import {GRID_INSTANCE, Grid} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';

import {DialogMetadataSelectorOptions} from '../../plugins/metadataSelector/dialogMetadataSelector/dialogMetadataSelector.interface';

/**
 * Directive that sets metadata selector storage name
 */
@Directive(
{
    selector: '[ngGrid][selectionStore], ng-grid[selectionStore]',
})
export class SelectionStoreDirective
{
    //######################### constructor #########################
    constructor(@Inject(GRID_INSTANCE) grid: Grid,
                @Attribute('selectionStore') selectionStore: string)
    {
        if(!selectionStore)
        {
            throw new Error('SelectionStoreDirective: missing selectionStore value!');
        }

        grid.gridOptions =
        {
            plugins:
            {
                metadataSelector:
                {
                    options: <RecursivePartial<DialogMetadataSelectorOptions>>
                    {
                        storageName: selectionStore,
                    },
                },
            },
        };
    }
}
