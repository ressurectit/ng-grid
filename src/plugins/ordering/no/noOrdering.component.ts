import {ChangeDetectionStrategy, Component, ElementRef, inject, signal, Signal} from '@angular/core';

import {GridPluginInstances} from '../../../misc/types';
import {NoOrdering, NoOrderingOptions} from './noOrdering.interface';
import {OrderingOptions} from '../../../interfaces';
import {DefaultOrderableIndicatorRenderer} from '../misc/services';

/**
 * Default options for ordering
 */
const defaultOptions: NoOrderingOptions =
{
    indicatorRenderer: DefaultOrderableIndicatorRenderer,
    cssClasses:
    {
        asc: '',
        desc: '',
        none: '',
        orderable: '',
    },
};

/**
 * Component used for no ordering
 */
@Component(
{
    selector: 'ng-no-ordering',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoOrderingSAComponent implements NoOrdering
{
    //######################### public properties - implementation of NoOrdering #########################

    /**
     * @inheritdoc
     */
    public ordering: Signal<unknown|undefined|null> = signal<unknown|undefined|null>(undefined).asReadonly();

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null;

    /**
     * @inheritdoc
     */
    public options: OrderingOptions = defaultOptions;

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    //######################### public methods - implementation of NoOrdering #########################

    /**
     * @inheritdoc
     */
    public setOrdering(_ordering: unknown|undefined|null): void
    {
    }

    /**
     * @inheritdoc
     */
    public orderByColumn(_columnId: string): void
    {
    }

    /**
     * @inheritdoc
     */
    public getCssClassesForColumn(_columnId: string): string[]
    {
        return [];
    }

    /**
     * @inheritdoc
     */
    public initialize(_force: boolean): void
    {
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}