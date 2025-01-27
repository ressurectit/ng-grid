import {ChangeDetectionStrategy, Component, ValueProvider} from '@angular/core';

import {PagingAbstractComponent} from '../pagingAbstract.component';
import {NoPagingOptions, NoPaging} from './noPaging.interface';
import {DEFAULT_OPTIONS} from '../../../misc/tokens';

/**
 * Default options for paging
 */
const defaultOptions: NoPagingOptions =
{
    initialItemsPerPage: NaN,
    initialPage: 1,
    cssClasses: {},
};

/**
 * Component used for no paging
 */
@Component(
{
    selector: 'ng-no-paging',
    template: '',
    providers:
    [
        <ValueProvider>
        {
            provide: DEFAULT_OPTIONS,
            useValue: defaultOptions,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPagingComponent extends PagingAbstractComponent<unknown, NoPagingOptions> implements NoPaging<NoPagingOptions>
{
    //######################### public properties - implementation of NoPaging #########################

    /**
     * @inheritdoc
     */
    public firstItemIndex: number = 0;
}
