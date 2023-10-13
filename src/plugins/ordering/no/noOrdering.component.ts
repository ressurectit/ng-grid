import {ChangeDetectionStrategy, Component, ElementRef, inject} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {GridPluginInstances} from '../../../misc/types';
import {NoOrdering, NoOrderingOptions} from './noOrdering.interface';
import {OrderingOptions} from '../../../interfaces';

/**
 * Default options for ordering
 */
const defaultOptions: NoOrderingOptions =
{
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
    //######################### protected fields #########################

    /**
     * Subject used for emitting changes in ordering
     */
    protected orderingChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties - implementation of NoOrdering #########################

    /**
     * @inheritdoc
     */
    public ordering: unknown|undefined|null;

    /**
     * @inheritdoc
     */
    public get orderingChange(): Observable<void>
    {
        return this.orderingChangeSubject.asObservable();
    }

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
    public setOrdering(_ordering: unknown|undefined|null, _emit?: boolean): void
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