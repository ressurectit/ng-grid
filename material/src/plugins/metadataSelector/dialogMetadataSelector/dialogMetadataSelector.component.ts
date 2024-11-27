import {Component, ChangeDetectionStrategy, ElementRef, Inject, Optional, forwardRef, Type, resolveForwardRef, WritableSignal, signal, Signal, inject, computed, OnDestroy, Injector} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {PermanentStorage, PERMANENT_STORAGE, LocalizeSAPipe} from '@anglr/common';
import {GridColumn, GridPlugin, MetadataGatherer, TableGridMetadata, GridPluginInstances, GRID_PLUGIN_INSTANCES, METADATA_SELECTOR_OPTIONS} from '@anglr/grid';
import {extend} from '@jscrpt/common';
import {skip, Subscription} from 'rxjs';

import {DialogMetadataSelectorOptions, DialogMetadataSelector, DialogMetadataSelectorComponentData} from './dialogMetadataSelector.interface';
import {VerticalDragNDropSelectionSAComponent, type CssClassesVerticalDragNDropSelection, type VerticalDragNDropSelectionTexts, VerticalDragNDropSelectionOptions} from '../../../components';

/**
 * Storage state
 */
export interface StorageState
{
    [id: string]: GridColumn;
}

/**
 * Default options for dialog metadata selector
 */
const defaultOptions: DialogMetadataSelectorOptions<CssClassesVerticalDragNDropSelection, VerticalDragNDropSelectionTexts, VerticalDragNDropSelectionOptions> =
{
    storageName: null,
    dialogCompnentOptions:
    {
        dragDisabled: false,
    },
    cssClasses:
    {
        btnElement: 'btn btn-primary',
        btnIconElement: 'fas fa-list grid-margin-right-extra-small',
        dialogComponentClasses:
        {
            titleElement: 'metadata-columns-title',
            resetMetadataIconElement: 'fas fa-rotate-right',
            columnsContainer: 'metadata-columns',
            columnElement: 'metadata-column',
            dragIndicationElement: 'fas fa-bars'
        }
    },
    texts:
    {
        btnShowSelection: 'column selection',
        dialogComponentTexts:
        {
            selectionTitle: 'columns'
        }
    },
    showButtonVisible: true,
    dialogComponent: forwardRef(() => VerticalDragNDropSelectionSAComponent),
};

/**
 * Component for rendering dialog metadata selector
 */
@Component(
{
    selector: 'ng-dialog-metadata-selector',
    templateUrl: 'dialogMetadataSelector.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        LocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMetadataSelectorSAComponent implements DialogMetadataSelector<TableGridMetadata<GridColumn>>, GridPlugin<DialogMetadataSelectorOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of signal for obtaining metadata
     */
    protected metadataValue: Signal<TableGridMetadata<GridColumn>|undefined|null>;

    /**
     * Metadata for dialog component
     */
    protected metadataForDialogComponent: Signal<TableGridMetadata<GridColumn>> = computed(() =>
    {
        return {
            ...this.allMetadata(),
            columns: this.columnsForSelection(),
        };
    });

    /**
     * Options for grid plugin
     */
    protected optionsValue: WritableSignal<DialogMetadataSelectorOptions>;

    /**
     * Instance of injector used for DI
     */
    protected injector: Injector = inject(Injector);

    /**
     * Subscription for metadata changes
     */
    protected metadataChangedSubscription: Subscription|undefined|null;

    /**
     * Indication whether gahterer has been initialized
     */
    protected gathererInitialized: boolean = false;

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    protected metadataGatherer: MetadataGatherer<TableGridMetadata<GridColumn>>|undefined|null;

    /**
     * All metadata that are available
     */
    protected allMetadata: WritableSignal<TableGridMetadata<GridColumn>|undefined|null> = signal(null);

    /**
     * Array of visiblity flags for columns originaly obtained from metadata selector
     */
    protected originalColumnsVisibility: boolean[] = [];

    /**
     * Component that is used for handling metadata selection itself
     */
    protected dialogComponent: Type<unknown>|undefined|null;

    /**
     * Columns for selection that are currently
     */
    protected columnsForSelection: WritableSignal<GridColumn[]> = signal([]);

    //######################### public properties - implementation of DialogMetadataSelector #########################

    /**
     * @inheritdoc
     */
    public gridPlugins: GridPluginInstances|undefined|null = inject(GRID_PLUGIN_INSTANCES, {optional: true});

    /**
     * @inheritdoc
     */
    public pluginElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * @inheritdoc
     */
    public get options(): DialogMetadataSelectorOptions
    {
        return this.optionsValue();
    }
    public set options(options: DialogMetadataSelectorOptions)
    {
        this.optionsValue.update(opts => extend(true, opts, options));
    }

    /**
     * @inheritdoc
     */
    public get metadata(): Signal<TableGridMetadata<GridColumn>|undefined|null>
    {
        return this.metadataValue;
    }

    //######################### constructor #########################
    constructor(@Inject(PERMANENT_STORAGE) protected storage: PermanentStorage,
                protected dialog: MatDialog,
                @Inject(METADATA_SELECTOR_OPTIONS) @Optional() options?: DialogMetadataSelectorOptions)
    {
        this.optionsValue = signal(extend(true, {}, defaultOptions, options));

        this.metadataValue = computed(() =>
        {
            return {
                ...this.allMetadata(),
                columns: this.columnsForSelection().filter(itm => itm.visible),
            };
        });
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.metadataChangedSubscription?.unsubscribe();
        this.metadataChangedSubscription = null;
    }

    //######################### public methods - implementation of DialogMetadataSelector #########################

    /**
     * @inheritdoc
     */
    public show(): void
    {
        if(!this.dialogComponent)
        {
            return;
        }

        this.dialog.open(this.dialogComponent,
        {
            data: <DialogMetadataSelectorComponentData<TableGridMetadata<GridColumn>, CssClassesVerticalDragNDropSelection, VerticalDragNDropSelectionTexts, VerticalDragNDropSelectionOptions>>
            {
                metadata: this.metadataForDialogComponent,
                setMetadata: metadata =>
                {
                    this.saveToStorage();
                    this.columnsForSelection.set([...metadata.columns]);
                },
                resetMetadata: () =>
                {
                    this.resetMetadata();
                },
                cssClasses: this.options.cssClasses.dialogComponentClasses,
                texts: this.options.texts.dialogComponentTexts,
                options: this.options.dialogCompnentOptions,
            }
        });
    }

    /**
     * @inheritdoc
     */
    public resetMetadata(): void
    {
        if(this.options.storageName)
        {
            this.storage.remove(this.options.storageName);
        }

        //reset visiblity of all columns
        const allMetadata = this.metadataGatherer?.metadata();

        if(!allMetadata)
        {
            this.allMetadata.set(null);
            this.initMetadata();

            return;
        }

        for(let x = 0; x < allMetadata.columns.length; x++)
        {
            const col = allMetadata.columns[x];

            col.visible = this.originalColumnsVisibility[x] ?? false;
        }

        this.allMetadata.set({...allMetadata});
        this.initMetadata();
    }

    /**
     * @inheritdoc
     */
    public setMetadataGatherer(gatherer: MetadataGatherer<TableGridMetadata<GridColumn>>): void
    {
        if(this.metadataGatherer != gatherer)
        {
            this.gathererInitialized = false;
        }

        this.metadataGatherer = gatherer;
    }

    /**
     * @inheritdoc
     */
    public initialize(force: boolean): void
    {
        this.dialogComponent = resolveForwardRef(this.options.dialogComponent);

        if(force || !this.gathererInitialized)
        {
            if(!this.metadataGatherer)
            {
                throw new Error('DialogMetadataSelectorSAComponent: missing metadata gatherer!');
            }

            const initMetadataFn = (allMetadata: TableGridMetadata<GridColumn>) =>
            {
                this.originalColumnsVisibility = allMetadata?.columns.map(itm => itm.visible) ?? [];
                this.allMetadata.set(allMetadata);
                this.initMetadata();
            };

            this.metadataChangedSubscription?.unsubscribe();
            this.metadataChangedSubscription = toObservable(this.metadataGatherer.metadata, {injector: this.injector})
                .pipe(skip(1))
                .subscribe(initMetadataFn);

            initMetadataFn(this.metadataGatherer.metadata());

            this.gathererInitialized = true;
        }
    }

    /**
     * @inheritdoc
     */
    public initOptions()
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Initialize metadata
     */
    protected initMetadata(): void
    {
        const storageState = this.loadFromStorage();
        const allMetadata = this.allMetadata();

        if(storageState)
        {
            allMetadata?.columns.forEach(meta =>
            {
                if(!meta.id)
                {
                    throw new Error('Missing id for column to be stored in storage!');
                }

                meta.visible = !!storageState[meta.id]?.visible;
            });

            this.columnsForSelection.set(Object.keys(storageState)
                .map(id => allMetadata?.columns.find(itm => itm.id == id))
                .filter(itm => !!itm)
                .concat(allMetadata?.columns.filter(meta => !storageState[meta.id ?? 0])) as GridColumn[]
            );
        }
        else
        {
            this.columnsForSelection.set([...(allMetadata?.columns ?? [])]);
        }
    }

    /**
     * Saves current state to storage
     */
    protected saveToStorage()
    {
        if(!this.options.storageName)
        {
            return;
        }

        const state: StorageState = {};

        this.columnsForSelection().forEach(meta =>
        {
            if(!meta.id)
            {
                throw new Error('Missing id for column to be stored in storage!');
            }

            state[meta.id] =
            {
                visible: meta.visible,
                id: meta.id,
                title: meta.title,
            };
        });

        this.storage.set(this.options.storageName, state);
    }

    /**
     * Gets stored storage state
     */
    protected loadFromStorage(): StorageState|undefined|null
    {
        if(!this.options.storageName)
        {
            return null;
        }

        return this.storage.get(this.options.storageName);
    }
}