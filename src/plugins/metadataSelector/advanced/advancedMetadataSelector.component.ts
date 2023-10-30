import {Component, ChangeDetectionStrategy, ElementRef, Inject, ChangeDetectorRef, Optional, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermanentStorage, PERMANENT_STORAGE, LocalizeSAPipe, FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RecursivePartial, extend, isBlank} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import {AdvancedGridColumn, AdvancedMetadataSelector, AdvancedMetadataSelectorOptions} from './advancedMetadataSelector.interface';
import {GridPlugin, GridPluginInstances, MetadataGatherer, TableGridMetadata} from '../../../interfaces';
import {GRID_PLUGIN_INSTANCES, METADATA_SELECTOR_OPTIONS} from '../../../misc/tokens';
import {GridPluginType} from '../../../misc/enums';

const UNUSED_DRAG = 'UNUSED_DRAG';

/**
 * Coordinates for spans for placements
 */
export interface SpanCoordinates
{
    startX: number;
    halfOffset: number;
    width: number;
}

/**
 * Storage state
 */
interface StorageState
{
    [key: string]: AdvancedGridColumn;
}

/**
 * Default options for advanced metadata selector
 * @internal
 */
const defaultOptions: AdvancedMetadataSelectorOptions =
{
    storageName: 'default-storage',
    cssClasses:
    {
        button:
        {
            topContainerDiv: 'clearfix',
            containerDiv: 'pull-right',
            selectionButton: 'btn btn-xs btn-primary',
            selectionIconSpan: 'fa fa-list'
        },
        selectionDiv:
        {
            closeContainerDiv: 'pull-right',
            closeButton: 'btn btn-link',
            closeIconSpan: 'fa fa-remove',
            containerDiv: 'advanced-metadata-selector-div',
            dropDiv: 'drop',
            dropDraggingClass: 'drop-dragging',
            dropDraggingOverClass: 'drop-dragging-over',
            dropSplitSpanDiv: 'drop-split-span',
            dropSplitSpanDraggingDiv: 'drop-split-span-dragging',
            droppedColumnDiv: 'dropped-column',
            droppedColumnTitleDiv: 'dropped-column-title',
            droppedColumnRemoveDiv: 'dropped-column-remove',
            droppedColumnRemoveButton: 'btn btn-link btn-remove',
            droppedColumnRemoveIconSpan: 'fa fa-trash',
            draggbleContainerDiv: 'draggable-container',
            draggableColumnDiv: 'draggable-columns-title',
            draggableColumnSpan: 'drag',
            draggableColumnIconSpan: 'fa fa-eyedropper add-column'
        }
    },
    texts:
    {
        btnOpenSelection: 'column selection',
        titleAvailableColumns: 'available columns'
    },
    headerColumnGetter: (header: HTMLElement) =>
    {
        const cols = header.firstElementChild?.children;
        const result = [];

        if(cols)
        {
            for(let x = 0; x < cols.length; x++)
            {
                result.push(cols[x].clientWidth);
            }
        }

        return result;
    }
};

/**
 * Component for rendering advanced metadata selector
 */
@Component(
{
    selector: 'ng-advanced-metadata-selector',
    templateUrl: 'advancedMetadataSelector.component.html',
    styleUrls: ['advancedMetadataSelector.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        LocalizeSAPipe,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedMetadataSelectorSAComponent implements AdvancedMetadataSelector<TableGridMetadata<AdvancedGridColumn>>, GridPlugin<AdvancedMetadataSelectorOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options for grid plugin
     */
    protected ɵoptions: AdvancedMetadataSelectorOptions;

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
    protected metadataGatherer: MetadataGatherer<TableGridMetadata<AdvancedGridColumn>>|undefined|null;

    /**
     * Div element that contains selection
     */
    protected selectionDiv: HTMLElement|undefined|null;

    /**
     * All metadata that are available
     */
    protected allMetadata: TableGridMetadata<AdvancedGridColumn>|undefined|null;

    /**
     * Html element that represents drop area
     */
    protected dropItem: HTMLElement|undefined|null;

    /**
     * Column that is being dragged
     */
    protected draggedColumn: AdvancedGridColumn|undefined|null;

    /**
     * Index of split span where should be new column added
     */
    protected splitSpanIndex: number|undefined|null = null;

    /**
     * Subject used for emitting changes in metadata
     */
    protected metadataChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Gets header content renderer instance
     */
    protected get headerContentRenderer(): GridPlugin|undefined|null
    {
        return this.gridPlugins?.['HEADER_CONTENT_RENDERER' as unknown as GridPluginType];
    }

    //######################### public properties - implementation of AdvancedMetadataSelector #########################

    /**
     * @inheritdoc
     */
    public get options(): AdvancedMetadataSelectorOptions
    {
        return this.ɵoptions;
    }
    public set options(options: RecursivePartial<AdvancedMetadataSelectorOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
    }

    /**
     * @inheritdoc
     */
    public metadata: TableGridMetadata<AdvancedGridColumn> =
    {
        columns: []
    };

    /**
     * @inheritdoc
     */
    public get metadataChange(): Observable<void>
    {
        return this.metadataChangeSubject.asObservable();
    }

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is selection visible
     */
    protected selectionVisible: boolean = false;

    /**
     * Array of unused metadata
     */
    protected unusedMetadata: AdvancedGridColumn[] = [];

    /**
     * Span coordinates for identifying where should be new col placed
     */
    protected splitCoordinates: SpanCoordinates[] = [];

    /**
     * Indication whether split coordinates are visible
     */
    protected splitCoordinatesVisible: boolean = false;

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) @Optional() public gridPlugins: GridPluginInstances|undefined|null,

                public pluginElement: ElementRef<HTMLElement>,
                protected changeDetector: ChangeDetectorRef,
                @Inject(PERMANENT_STORAGE) protected storage: PermanentStorage,

                @Inject(METADATA_SELECTOR_OPTIONS) @Optional() options?: AdvancedMetadataSelectorOptions,)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
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

    //######################### protected methods - template bindings #########################

    /**
     * Shows column selection
     */
    protected showColSelection(): void
    {
        this.setWidthOfUsedColumns();

        this.selectionVisible = true;
        this.changeDetector.detectChanges();

        this.selectionDiv = this.pluginElement.nativeElement.querySelector(`.${this.options.cssClasses.selectionDiv.containerDiv}`) as HTMLElement;
        this.selectionDiv.style.display = 'block';
        this.dropItem = this.selectionDiv.querySelector(`.${this.options.cssClasses.selectionDiv.dropDiv}`) as HTMLElement;
    }

    /**
     * Hides column selection
     */
    protected hideColSelection(): void
    {
        this.selectionVisible = false;
    }

    /**
     * Hides column
     * @param column - Metadata selected for hiding
     */
    protected hideColumn(column: AdvancedGridColumn): void
    {
        const unused = this.metadata.columns.splice(this.metadata.columns.indexOf(column), 1);
        this.unusedMetadata.splice(this.unusedMetadata.length - 1, 0, unused[0]);
        this.metadata =
        {
            columns: [...this.metadata.columns]
        };

        this.saveToStorage();

        this.metadataChangeSubject.next();
        this.setWidthOfUsedColumns();
    }

    /**
     * Shows column at selected index, or at the end
     * @param column - Metadata selected for hiding
     * @param index - Index where should be column displayed
     */
    protected showColumn(column: AdvancedGridColumn, index?: number): void
    {
        if(isBlank(index))
        {
            index = this.metadata.columns.length;
        }

        const used = this.unusedMetadata.splice(this.unusedMetadata.indexOf(column), 1);
        this.metadata.columns.splice(index, 0, used[0]);
        this.metadata =
        {
            columns: [...this.metadata.columns]
        };

        this.saveToStorage();

        this.metadataChangeSubject.next();
        this.setWidthOfUsedColumns();
    }

    /**
     * Event handler used for handling drag start
     * @param event - Event for dragging
     * @param column - Column that is being dragged
     */
    protected dragStart(event: DragEvent, column: AdvancedGridColumn): void
    {
        event.dataTransfer?.setData('text/plain', UNUSED_DRAG);
        (event.target as HTMLElement).style.opacity = '0.75';

        this.draggedColumn = column;
        this.dropItem?.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingClass);
        this.splitCoordinatesVisible = true;
    }

    /**
     * Event handler used for handling drag end
     * @param event - Event for dragging
     */
    protected dragEnd(event: DragEvent): void
    {
        (event.target as HTMLElement).style.opacity = '1';
        this.draggedColumn = null;
        this.dropItem?.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingClass);
        this.splitCoordinatesVisible = false;
    }

    /**
     * Event handler used for handling drag enter
     * @param event - Event for dragging
     */
    protected dragEnterSplit(event: DragEvent): void
    {
        const firstElementChild = (event.target as HTMLElement).firstElementChild;

        if(firstElementChild)
        {
            firstElementChild.classList.add(this.options.cssClasses.selectionDiv.dropSplitSpanDraggingDiv);
        }
    }

    /**
     * Event handler used for handling drag enter
     * @param event - Event for dragging
     */
    protected dragEnter(): void
    {
        this.dropItem?.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingOverClass);
    }

    /**
     * Event handler used for handling drag leave
     * @param event - Event for dragging
     */
    protected dragLeaveSplit(event: DragEvent): void
    {
        const firstElementChild = (event.target as HTMLElement).firstElementChild;

        if(firstElementChild)
        {
            firstElementChild.classList.remove(this.options.cssClasses.selectionDiv.dropSplitSpanDraggingDiv);
        }
    }

    /**
     * Event handler used for handling drag leave
     * @param event - Event for dragging
     */
    protected dragLeave(): void
    {
        this.dropItem?.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingOverClass);
    }

    /**
     * Event handler used for handling drag over
     * @param event - Event for dragging
     * @param index - Index of split span
     */
    protected dragOverSplit(event: DragEvent, index: number): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.splitSpanIndex = index;
    }

    /**
     * Event handler used for handling drag over
     * @param event - Event for dragging
     */
    protected dragOver(event: DragEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.splitSpanIndex = null;
    }

    /**
     * Event handler used for handling drop
     * @param event - Event for dragging
     */
    protected drop(event: DragEvent): void
    {
        event.preventDefault();

        if(event.dataTransfer?.getData('text/plain') != UNUSED_DRAG)
        {
            return;
        }

        this.dropItem?.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingClass);
        this.dropItem?.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingOverClass);
        this.splitCoordinatesVisible = false;

        if(this.draggedColumn && this.splitSpanIndex)
        {
            this.showColumn(this.draggedColumn, this.splitSpanIndex);
        }

        this.splitSpanIndex = null;
    }

    //######################### public methods - implementation of AdvancedMetadataSelector #########################

    /**
     * @inheritdoc
     */
    public show(): void
    {
        this.showColSelection();

        this.invalidateVisuals();
    }

    /**
     * @inheritdoc
     */
    public setMetadataGatherer(gatherer: MetadataGatherer<TableGridMetadata<AdvancedGridColumn>>): void
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
        if(force || !this.gathererInitialized)
        {
            if(this.metadataChangedSubscription)
            {
                this.metadataChangedSubscription.unsubscribe();
                this.metadataChangedSubscription = null;
            }

            this.metadataChangedSubscription = this.metadataGatherer?.metadataChange.subscribe(() =>
            {
                this.allMetadata = this.metadataGatherer?.getMetadata();
                this.initMetadata();

                this.metadataChangeSubject.next();
            });

            this.gathererInitialized = true;
        }

        this.allMetadata = this.metadataGatherer?.getMetadata();
        this.initMetadata();
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
        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Initialize metadata
     */
    protected initMetadata(): void
    {
        const storageState: StorageState = this.loadFromStorage();

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

                meta.visible = !!storageState[meta.id];
            });

            Object.keys(storageState).forEach(id =>
            {
                const meta = this.allMetadata?.columns.find(itm => itm.id == id);

                if(meta)
                {
                    this.metadata.columns.push(meta);
                }
            });
        }
        else
        {
            this.metadata =
            {
                columns: this.allMetadata?.columns.filter(itm => itm.visible) ?? []
            };
        }

        this.unusedMetadata = this.allMetadata?.columns.filter(itm => !itm.visible) ?? [];
    }

    /**
     * Sets width of used columns
     */
    protected setWidthOfUsedColumns(): void
    {
        if(!this.headerContentRenderer)
        {
            return;
        }

        const headerElement: HTMLElement = this.headerContentRenderer.pluginElement.nativeElement;
        const colWidths = this.options.headerColumnGetter?.(headerElement) ?? [];
        this.metadata.columns.forEach((meta, index) => meta.realWidth = colWidths[index]);

        this.splitCoordinates = [];

        colWidths.forEach((value: number, index: number) =>
        {
            const halfWidth = value / 2;

            //first
            if(index == 0)
            {
                this.splitCoordinates.push(
                {
                    startX: 0,
                    halfOffset: 0,
                    width: halfWidth
                });

                this.splitCoordinates.push(
                {
                    startX: value - halfWidth,
                    halfOffset: halfWidth,
                    width: halfWidth
                });
            }
            else
            {
                this.splitCoordinates[index].width += halfWidth;

                this.splitCoordinates.push(
                {
                    startX: this.splitCoordinates[index].startX  + this.splitCoordinates[index].halfOffset + value - halfWidth,
                    halfOffset: halfWidth,
                    width: halfWidth
                });
            }
        });
    }

    /**
     * Saves current state to storage
     */
    protected saveToStorage(): void
    {
        if(!this.options.storageName)
        {
            return;
        }

        const state: StorageState = {};

        this.metadata.columns.forEach(meta =>
        {
            if(!meta.id)
            {
                throw new Error('Missing id for column to be stored in storage!');
            }

            state[meta.id] =
            {
                visible: true,
                id: undefined,
                realWidth: 0,
                title: undefined
            };
        });

        this.storage.set(this.options.storageName, state);
    }

    /**
     * Gets stored storage state
     */
    protected loadFromStorage(): StorageState
    {
        return this.storage.get<StorageState>(this.options.storageName);
    }
}