import {Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, ChangeDetectorRef, Optional, OnDestroy, forwardRef, Type, resolveForwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {STRING_LOCALIZATION, StringLocalization, PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {GridColumn, GridPlugin, MetadataGatherer, TableGridMetadata, GridPluginInstances, GRID_PLUGIN_INSTANCES, METADATA_SELECTOR_OPTIONS} from '@anglr/grid';
import {extend, isPresent, Dictionary, isJsObject} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {DialogMetadataSelectorOptions, DialogMetadataSelector, DialogMetadataSelectorTexts, DialogMetadataSelectorContentComponent, DialogMetadataSelectorComponentData} from './dialogMetadataSelector.interface';
import {VerticalDragNDropSelectionSAComponent, type CssClassesVerticalDragNDropSelection, type VerticalDragNDropSelectionTexts} from '../../../components';

//TODO: finish renaming and refactoring

/**
 * Storage state
 */
export interface StorageState
{
    [key: string]: GridColumn;
}

/**
 * Default options for dialog metadata selector
 */
const defaultOptions: DialogMetadataSelectorOptions =
{
    storageName: 'defaultStorage',
    cssClasses:
    {
        componentClass: 'dialog-metadata-selector',
        btnClass: 'btn btn-primary',
        btnIconClass: 'fa fa-list margin-right-extra-small',
        dialogComponentClasses: <CssClassesVerticalDragNDropSelection>
        {
            containerClass: 'metadata-columns',
            itemClass: 'metadata-column',
            titleClass: 'metadata-columns-title',
            dragIconClass: 'fa fa-bars'
        }
    },
    texts:
    {
        btnShowSelection: 'Column selection',
        dialogComponentTexts: <VerticalDragNDropSelectionTexts>
        {
            selectionTitle: 'Columns'
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
    styleUrls: ['dialogMetadataSelector.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMetadataSelectorSAComponent implements DialogMetadataSelector<TableGridMetadata<GridColumn>>, GridPlugin<DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected _options: DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>;

    /**
     * Last applied css class
     */
    protected _cssClass: string|undefined|null;

    /**
     * Subscription for changes in texts
     */
    protected _textsChangedSubscription: Subscription|undefined|null;

    /**
     * Subscription for metadata changes
     */
    protected _metadataChangedSubscription: Subscription|undefined|null;

    /**
     * Indication whether gahterer has been initialized
     */
    protected _gathererInitialized: boolean = false;

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    protected metadataGatherer: MetadataGatherer<TableGridMetadata<GridColumn>>|undefined|null;

    /**
     * All metadata that are available
     */
    protected _allMetadata: TableGridMetadata<GridColumn>|undefined|null;
    
    /**
     * Component that is used for handling metadata selection itself
     */
    protected _dialogComponent: Type<DialogMetadataSelectorContentComponent<TableGridMetadata<GridColumn>>>|undefined|null;

    /**
     * Metadata for selection, contains all metadata in correct order
     */
    protected _metadataForSelection: TableGridMetadata<GridColumn> =
    {
        columns: []
    };

    //######################### public properties - implementation of DialogMetadataSelector #########################

    /**
     * Options for grid plugin
     */
    public get options(): DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>
    {
        return this._options;
    }
    public set options(options: DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>)
    {
        this._options = extend(true, this._options, options);
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

    //######################### public properties - template bindings #########################

    /**
     * Object containing available texts
     * @internal
     */
    public texts: DialogMetadataSelectorTexts = 
    {
        btnShowSelection: '',
        dialogComponentTexts: '',
    };

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances,

                public pluginElement: ElementRef,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(PERMANENT_STORAGE) protected _storage: PermanentStorage,
                protected _dialog: MatDialog,
                @Inject(STRING_LOCALIZATION) protected _stringLocalization: StringLocalization,
                @Inject(METADATA_SELECTOR_OPTIONS) @Optional() options?: DialogMetadataSelectorOptions<TableGridMetadata<GridColumn>>)
    {
        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._textsChangedSubscription)
        {
            this._textsChangedSubscription.unsubscribe();
            this._textsChangedSubscription = null;
        }

        if(this._metadataChangedSubscription)
        {
            this._metadataChangedSubscription.unsubscribe();
            this._metadataChangedSubscription = null;
        }
    }

    //######################### public methods - implementation of DialogMetadataSelector #########################

    /**
     * Shows metadata selector
     */
    public show(): void
    {
        if(!this._dialogComponent)
        {
            return;
        }

        this._dialog.open(this._dialogComponent,
        {
            data:
            <DialogMetadataSelectorComponentData<TableGridMetadata<GridColumn>>>
            {
                metadata: this._metadataForSelection,
                setMetadata: metadata =>
                {
                    this._metadataForSelection.columns = [...metadata.columns];
                    this._setMetadata();
                    this._saveToStorage();

                    this.metadataChange.next();
                },
                cssClasses: this.options.cssClasses.dialogComponentClasses,
                texts: this.texts.dialogComponentTexts
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
            this._gathererInitialized = false;
        }

        this.metadataGatherer = gatherer;
    }

    /**
     * @inheritdoc
     */
    public initialize(force: boolean): void
    {
        const element: HTMLElement = this.pluginElement.nativeElement;

        if(isPresent(this._cssClass))
        {
            element.classList.remove(this._cssClass);
        }

        element.classList.add(this.options.cssClasses.componentClass);
        this._cssClass = this.options.cssClasses.componentClass;

        this._dialogComponent = resolveForwardRef(this.options.dialogComponent);

        if(force || !this._gathererInitialized)
        {
            if(this._metadataChangedSubscription)
            {
                this._metadataChangedSubscription.unsubscribe();
                this._metadataChangedSubscription = null;
            }

            this._metadataChangedSubscription = this.metadataGatherer?.metadataChange.subscribe(() =>
            {
                this._allMetadata = this.metadataGatherer?.getMetadata();
                this._initMetadata();

                this.metadataChange.emit();
            });

            this._gathererInitialized = true;
        }

        this._textsChangedSubscription = this._stringLocalization.textsChange.subscribe(() => this._initTexts());

        this._allMetadata = this.metadataGatherer?.getMetadata();
        this._initMetadata();
        this._initTexts();
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
        this._changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Initialize texts
     */
    protected _initTexts()
    {
        this.texts = this._initTextsObject(this.options.texts as unknown as Dictionary<string>) as unknown as DialogMetadataSelectorTexts;

        this._changeDetector.detectChanges();
    }

    /**
     * Initialize texts object
     * @param texts - Texts to be initialized
     */
    protected _initTextsObject(texts: Dictionary<string>)
    {
        const resultTexts: Record<string, unknown> = {};

        Object.keys(texts).forEach(key =>
        {
            if(isJsObject(texts[key]))
            {
                resultTexts[key] = this._initTextsObject(texts[key] as unknown as Dictionary<string>);
            }
            else
            {
                resultTexts[key] = this._stringLocalization.get(texts[key]);
            }
        });

        return resultTexts;
    }

    /**
     * Initialize metadata
     */
    protected _initMetadata()
    {
        const storageState = this._loadFromStorage();

        if(storageState)
        {
            this.metadata =
            {
                columns: []
            };

            this._allMetadata?.columns.forEach(meta =>
            {
                if(!meta.id)
                {
                    throw new Error('Missing id for column to be stored in storage!');
                }

                meta.visible = storageState[meta.id] && storageState[meta.id].visible;
            });

            this._metadataForSelection = 
            {
                columns: Object.keys(storageState)
                    .map(id => this._allMetadata?.columns.find(itm => itm.id == id))
                    .filter(itm => !!itm)
                    .concat(this._allMetadata?.columns.filter(meta => !storageState[meta.id ?? 0])) as GridColumn[]
            };

            this._setMetadata();
        }
        else
        {
            this._metadataForSelection =
            {
                columns: [...(this._allMetadata?.columns ?? [])]
            };

            this._setMetadata();
        }
    }

    /**
     * Saves current state to storage
     */
    protected _saveToStorage()
    {
        if(!this.options.storageName)
        {
            return;
        }

        const state: StorageState = {};

        this._metadataForSelection.columns.forEach(meta =>
        {
            if(!meta.id)
            {
                throw new Error('Missing id for column to be stored in storage!');
            }

            state[meta.id] =
            {
                visible: meta.visible,
                id: '',
                title: '',
            };
        });

        this._storage.set(this.options.storageName, state);
    }

    /**
     * Gets stored storage state
     */
    protected _loadFromStorage(): StorageState|undefined|null
    {
        if(!this.options.storageName)
        {
            return null;
        }

        return this._storage.get(this.options.storageName);
    }

    /**
     * Sets visible metadata from all metadata
     */
    protected _setMetadata()
    {
        this.metadata =
        {
            columns: this._metadataForSelection.columns.filter(itm => itm.visible)
        };
    }
}