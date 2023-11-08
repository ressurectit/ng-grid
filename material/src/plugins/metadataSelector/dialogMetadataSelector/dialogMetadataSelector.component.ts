import {Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, Optional, OnDestroy, forwardRef, Type, resolveForwardRef, WritableSignal, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {PermanentStorage, PERMANENT_STORAGE, LocalizeSAPipe} from '@anglr/common';
import {GridColumn, GridPlugin, MetadataGatherer, TableGridMetadata, GridPluginInstances, GRID_PLUGIN_INSTANCES, METADATA_SELECTOR_OPTIONS, GridMetadata} from '@anglr/grid';
import {extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {DialogMetadataSelectorOptions, DialogMetadataSelector, DialogMetadataSelectorContentComponent, DialogMetadataSelectorComponentData} from './dialogMetadataSelector.interface';
import {VerticalDragNDropSelectionSAComponent, type CssClassesVerticalDragNDropSelection, type VerticalDragNDropSelectionTexts} from '../../../components';

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
const defaultOptions: DialogMetadataSelectorOptions<GridMetadata, CssClassesVerticalDragNDropSelection, VerticalDragNDropSelectionTexts> =
{
    storageName: null,
    cssClasses:
    {
        btnElement: 'btn btn-primary',
        btnIconElement: 'fas fa-list grid-margin-right-extra-small',
        dialogComponentClasses:
        {
            titleElement: 'metadata-columns-title',
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
export class DialogMetadataSelectorSAComponent implements DialogMetadataSelector<TableGridMetadata<GridColumn>>, GridPlugin<DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected optionsValue: WritableSignal<DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>>;

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
    protected allMetadata: TableGridMetadata<GridColumn>|undefined|null;
    
    /**
     * Component that is used for handling metadata selection itself
     */
    protected dialogComponent: Type<DialogMetadataSelectorContentComponent<TableGridMetadata<GridColumn>>>|undefined|null;

    /**
     * Metadata for selection, contains all metadata in correct order
     */
    protected metadataForSelection: TableGridMetadata<GridColumn> =
    {
        columns: []
    };

    //######################### public properties - implementation of DialogMetadataSelector #########################

    /**
     * Options for grid plugin
     */
    public get options(): DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>
    {
        return this.optionsValue();
    }
    public set options(options: DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>)
    {
        this.optionsValue.update(opts => extend(true, opts, options));
    }

    /**
     * Current metadata that are used for rendering
     */
    public metadata: TableGridMetadata<GridColumn> =
    {
        columns: []
    };

    /**
     * Occurs when metadata changed
     */
    public metadataChange: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances|undefined|null,

                public pluginElement: ElementRef,
                @Inject(PERMANENT_STORAGE) protected storage: PermanentStorage,
                protected dialog: MatDialog,
                @Inject(METADATA_SELECTOR_OPTIONS) @Optional() options?: DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>)
    {
        this.optionsValue = signal(extend(true, {}, defaultOptions, options));
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
     * Shows metadata selector
     */
    public show(): void
    {
        if(!this.dialogComponent)
        {
            return;
        }

        this.dialog.open(this.dialogComponent,
        {
            data:
            <DialogMetadataSelectorComponentData<TableGridMetadata<GridColumn>>>
            {
                metadata: this.metadataForSelection,
                setMetadata: metadata =>
                {
                    this.metadataForSelection.columns = [...metadata.columns];
                    this.setMetadata();
                    this.saveToStorage();

                    this.metadataChange.next();
                },
                cssClasses: this.options.cssClasses.dialogComponentClasses,
                texts: this.options.texts,
            }
        });
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
            this.metadataChangedSubscription?.unsubscribe();
            this.metadataChangedSubscription = null;

            this.metadataChangedSubscription = this.metadataGatherer?.metadataChange.subscribe(() =>
            {
                this.allMetadata = this.metadataGatherer?.getMetadata();
                this.initMetadata();

                this.metadataChange.emit();
            });

            this.gathererInitialized = true;
        }

        this.allMetadata = this.metadataGatherer?.getMetadata();
        this.initMetadata();
    }

    /**
     * Initialize plugin options, all operations required to be done with plugin options are handled here
     */
    public initOptions()
    {
    }

    /**
     * Explicitly runs invalidation of content (change detection)
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

        if(storageState)
        {
            this.metadata =
            {
                columns: []
            };

            this.allMetadata?.columns.forEach(meta =>
            {
                if(!meta.id)
                {
                    throw new Error('Missing id for column to be stored in storage!');
                }

                meta.visible = !!storageState[meta.id]?.visible;
            });

            this.metadataForSelection = 
            {
                columns: Object.keys(storageState)
                    .map(id => this.allMetadata?.columns.find(itm => itm.id == id))
                    .filter(itm => !!itm)
                    .concat(this.allMetadata?.columns.filter(meta => !storageState[meta.id ?? 0])) as GridColumn[]
            };

            this.setMetadata();
        }
        else
        {
            this.metadataForSelection =
            {
                columns: [...(this.allMetadata?.columns ?? [])]
            };

            this.setMetadata();
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

        this.metadataForSelection.columns.forEach(meta =>
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

    /**
     * Sets visible metadata from all metadata
     */
    protected setMetadata(): void
    {
        this.metadata =
        {
            ...this.allMetadata,
            columns: this.metadataForSelection.columns.filter(itm => itm.visible)
        };
    }
}