import {Injectable, ElementRef, Injector, inject, WritableSignal, signal, Signal, computed} from '@angular/core';
import {RecursivePartial, extend} from '@jscrpt/common';

import {DataLoader, DataResponse, GridInitializer, GridPlugin, GridPluginInstances, Paging, PagingOptions} from '../../interfaces';
import {DEFAULT_OPTIONS, GRID_PLUGIN_INSTANCES, PAGING_OPTIONS} from '../../misc/tokens';

/**
 * Abstract class that represents any paging component
 */
@Injectable()
export abstract class PagingAbstractComponent<TCssClasses = unknown, TOptions extends PagingOptions<TCssClasses> = PagingOptions<TCssClasses>> implements Paging<TOptions>, GridPlugin<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options specific to paging implementation
     */
    protected optionsValue: WritableSignal<TOptions>;


    /**
     * Instance of data loader used within grid
     */
    protected dataLoader: DataLoader<DataResponse>|undefined|null;

    /**
     * Instance of grid initializer used within grid
     */
    protected gridInitializer: GridInitializer|undefined|null;

    /**
     * Angular injector used for injecting dependencies
     */
    protected injector: Injector = inject(Injector);

    //######################### protected properties - template bindings #########################

    /**
     * Signal storing page value
     */
    protected pageValue: WritableSignal<number|undefined|null> = signal(null);

    /**
     * Signal storing items per page value
     */
    protected itemsPerPageValue: WritableSignal<number|undefined|null> = signal(null);

    /**
     * Total count of all available items in database
     */
    protected totalCount: Signal<number> = signal(0).asReadonly();

    //######################### public properties - implementation of Paging #########################

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null = inject(GRID_PLUGIN_INSTANCES, {optional: true});

    /**
     * @inheritdoc
     */
    public abstract get firstItemIndex(): number;

    /**
     * @inheritdoc
     */
    public get options(): TOptions
    {
        return this.optionsValue();
    }
    public set options(options: RecursivePartial<TOptions>)
    {
        this.optionsValue.update(opts => extend(true, opts, options));
    }

    /**
     * @inheritdoc
     */
    public get page(): Signal<number|undefined|null>
    {
        return this.pageValue.asReadonly();
    }

    /**
     * @inheritdoc
     */
    public get itemsPerPage(): Signal<number|undefined|null>
    {
        return this.itemsPerPageValue.asReadonly();
    }

    //######################### constructor #########################
    constructor()
    {
        const options = inject(PAGING_OPTIONS, {optional: true});
        const defaultOptions = inject<TOptions>(DEFAULT_OPTIONS);

        this.optionsValue = signal(extend(true, {}, defaultOptions, options));
    }

    //######################### public methods - implementation of Paging #########################

    /**
     * @inheritdoc
     */
    public async initialize(force: boolean): Promise<void>
    {
        if(!this.gridPlugins)
        {
            throw new Error('PagingAbstractComponent: missing gridPlugins!');
        }

        const dataLoader: DataLoader<DataResponse> = this.gridPlugins.dataLoader as DataLoader<DataResponse>;

        //data loader obtained and its different instance
        if(force || (this.dataLoader && this.dataLoader != dataLoader))
        {
            this.dataLoader = null;
        }

        //no data loader obtained
        if(!this.dataLoader && dataLoader)
        {
            this.dataLoader = dataLoader;
            this.totalCount = computed(() => dataLoader.result().totalCount);
        }

        const gridInitializer: GridInitializer = this.gridPlugins.gridInitializer;

        //grid initializer obtained and its different instance
        if(force || (this.gridInitializer && this.gridInitializer != gridInitializer))
        {
            this.gridInitializer = null;
        }

        //no grid initializer obtained
        if(!this.gridInitializer && gridInitializer)
        {
            this.gridInitializer = gridInitializer;

            this.pageValue.set(await gridInitializer.getPage());
            this.itemsPerPageValue.set(await gridInitializer.getItemsPerPage());
        }
    }

    /**
     * @inheritdoc
     */
    public initOptions(): void
    {
        this.pageValue.set(this.optionsValue().initialPage);
        this.itemsPerPageValue.set(this.optionsValue().initialItemsPerPage);
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    /**
     * @inheritdoc
     */
    public setPage(page: number): void
    {
        this.gridInitializer?.setPage(page);
        this.pageValue.set(page);
    }

    /**
     * @inheritdoc
     */
    public setItemsPerPage(itemsPerPage: number): void
    {
        this.gridInitializer?.setItemsPerPage(itemsPerPage);
        this.itemsPerPageValue.set(itemsPerPage);
    }
}