import {Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, ChangeDetectorRef, Optional, OnDestroy} from "@angular/core";
import {Utils, isBlank, CookieService} from "@anglr/common";
import {Subscription} from "rxjs/Subscription";

import {GridPluginGeneric} from "../../../misc";
import {MetadataGatherer} from "../../../components/metadata";
import {GridPluginInstances, GRID_PLUGIN_INSTANCES} from "../../../components/grid";
import {METADATA_SELECTOR_OPTIONS} from "../metadataSelector.interface";
import {AdvancedMetadataSelectorOptions, AdvancedMetadataSelector, AdvancedGridColumn} from "./advancedMetadataSelector.interface";
import {HEADER_CONTENT_RENDERER} from "../../contentRenderer";
import {AdvancedMetadataSelectorTexts} from "..";
import {TextsLocator, TEXTS_LOCATOR} from "../../textsLocator";

const UNUSED_DRAG = "UNUSED_DRAG"

/**
 * Coordinates for spans for placements
 */
interface SpanCoordinates
{
    startX?: number;
    halfOffset?: number;
    width?: number;
}

/**
 * Cookie state
 */
interface CookieState
{
    [key: string]: AdvancedGridColumn;
}

/**
 * Default options for advanced metadata selector
 */
const defaultOptions: AdvancedMetadataSelectorOptions =
{
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
        btnOpenSelection: 'COLUMN SELECTION',
        titleAvailableColumns: 'Available columns'
    },
    headerColumnGetter: (header: HTMLElement) =>
    {
        let cols = header.firstElementChild.children;
        let result = [];

        for(let x = 0; x < cols.length; x++)
        {
            result.push(cols[x].clientWidth);
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles:
    [
        `.advanced-metadata-selector-div
        {
            display: none;
            position: absolute;
            background-color: #FFFFFF;
            width: 100%;
            box-shadow: 0 0 4px #AAA;
            top: -72px;
            height: 100px;
            border-radius: 4px;
        }

        .drop
        {
            height: 30px;
            position: absolute;
            bottom: 0;
            width: 100%;
            border-top: 1px solid #AAA;
            display: flex;
            flex-direction: row;
        }

        .drop-dragging
        {
            box-shadow: 0 0 4px #23527c;
        }

        .drop-dragging-over
        {
            background-color: #F5F5F5;
        }

        .drop-split-span
        {
            position: absolute;
            height: 30px;
            background: transparent;
        }

        .drop-split-span-dragging
        {
            position: absolute;
            height: 30px;
            left: 125px;
            box-shadow: 0 0 11px 2px #FF0000;
            width: 1px;
            background-color: #FF00004D;
        }

        .dropped-column
        {
            line-height: 30px;
            box-shadow: inset 0 0 7px -1px #666;
            display: flex;
        }

        .dropped-column-title
        {
            width: calc(100% - 20px);
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
            min-width: 0;
        }

        .dropped-column-remove
        {
            width: 22px;
        }

        .drag
        {
            display: inline-block;
            padding: 2px 6px;
            cursor: grab;
            background-color: #337ab7;
            color: #FFFFFF;
            border-radius: 4px;
            margin-right: 4px;
        }

        .draggable-container
        {
            padding: 2px;
        }

        .draggable-columns-title
        {
            font-weight: bold;
        }

        .add-column
        {
            cursor: pointer;
        }

        .btn-remove
        {
            padding: 0;
            font-size: 1.2em;
            display: block;
            line-height: 26px;
        }`
    ]
})
export class AdvancedMetadataSelectorComponent implements AdvancedMetadataSelector<AdvancedGridColumn[]>, GridPluginGeneric<AdvancedMetadataSelectorOptions>, OnDestroy
{
    //######################### private fields #########################

    /**
     * Options for grid plugin
     */
    private _options: AdvancedMetadataSelectorOptions;

    /**
     * Texts locator used for handling texts
     */
    private _textsLocator: TextsLocator;

    /**
     * Subscription for changes in texts
     */
    private _textsChangedSubscription: Subscription;

    /**
     * Subscription for metadata changes
     */
    private _metadataChangedSubscription: Subscription;

    /**
     * Indication whether gahterer has been initialized
     */
    private _gathererInitialized: boolean = false;

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    private _metadataGatherer: MetadataGatherer<AdvancedGridColumn[]>;

    /**
     * Div element that contains selection
     */
    private _selectionDiv: HTMLElement;

    /**
     * All metadata that are available
     */
    private _allMetadata: AdvancedGridColumn[];

    /**
     * Html element that represents drop area
     */
    private _dropItem: HTMLElement;

    /**
     * Column that is being dragged
     */
    private _draggedColumn: AdvancedGridColumn;

    /**
     * Index of split span where should be new column added
     */
    private _splitSpanIndex?: number = null;

    //######################### public properties - implementation of AdvancedMetadataSelector #########################

    /**
     * Options for grid plugin
     */
    public get options(): AdvancedMetadataSelectorOptions
    {
        return this._options;
    }
    public set options(options: AdvancedMetadataSelectorOptions)
    {
        this._options = Utils.common.extend(true, this._options, options);
    }

    /**
     * Instance of metadata gatherer, which is used for getting initial metadata
     */
    public get metadataGatherer(): MetadataGatherer<AdvancedGridColumn[]>
    {
        return this._metadataGatherer;
    }
    public set metadataGatherer(gatherer: MetadataGatherer<AdvancedGridColumn[]>)
    {
        if(this._metadataGatherer != gatherer)
        {
            this._gathererInitialized = false;
        }

        this._metadataGatherer = gatherer;
    }

    /**
     * Current metadata that are used for rendering
     */
    public metadata: AdvancedGridColumn[];

    /**
     * Occurs when metadata changed
     */
    public metadataChange: EventEmitter<void> = new EventEmitter<void>();

    //######################### public properties - template bindings #########################

    /**
     * Indication whether is selection visible
     * @internal
     */
    public selectionVisible: boolean = false;

    /**
     * Array of unused metadata
     * @internal
     */
    public unusedMetadata: AdvancedGridColumn[];

    /**
     * Span coordinates for identifying where should be new col placed
     * @internal
     */
    public splitCoordinates: SpanCoordinates[] = [];

    /**
     * Indication whether split coordinates are visible
     * @internal
     */
    public splitCoordinatesVisible: boolean = false;

    /**
     * Object containing available texts
     */
    public texts: AdvancedMetadataSelectorTexts = {};

    //######################### constructor #########################
    constructor(@Inject(GRID_PLUGIN_INSTANCES) public gridPlugins: GridPluginInstances,

                public pluginElement: ElementRef,
                private _changeDetector: ChangeDetectorRef,
                private _cookies: CookieService,
                @Inject(METADATA_SELECTOR_OPTIONS) @Optional() options?: AdvancedMetadataSelectorOptions)
    {
        this._options = Utils.common.extend(true, {}, defaultOptions, options);
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
    }

    //######################### public methods - template bindings #########################

    /**
     * Shows column selection
     * @internal
     */
    public showColSelection()
    {
        this._setWidthOfUsedColumns();

        this.selectionVisible = true;
        this._changeDetector.detectChanges();

        this._selectionDiv = (this.pluginElement.nativeElement as HTMLElement).querySelector(`.${this.options.cssClasses.selectionDiv.containerDiv}`);
        this._selectionDiv.style.display = 'block';
        this._dropItem = this._selectionDiv.querySelector(`.${this.options.cssClasses.selectionDiv.dropDiv}`);
    }

    /**
     * Hides column selection
     * @internal
     */
    public hideColSelection()
    {
        this.selectionVisible = false;
    }

    /**
     * Hides column
     * @param {AdvancedGridColumn} column Metadata selected for hiding
     * @internal
     */
    public hideColumn(column: AdvancedGridColumn)
    {
        let unused = this.metadata.splice(this.metadata.indexOf(column), 1);
        this.unusedMetadata.splice(this.unusedMetadata.length - 1, 0, unused[0]);
        this.metadata = [...this.metadata];
        this._saveToCookie();

        this.metadataChange.emit();
        this._setWidthOfUsedColumns();
    }

    /**
     * Shows column at selected index, or at the end
     * @param {AdvancedGridColumn} column Metadata selected for hiding
     * @param {number} index Index where should be column displayed
     * @internal
     */
    public showColumn(column: AdvancedGridColumn, index?: number)
    {
        if(isBlank(index))
        {
            index = this.metadata.length;
        }

        let used = this.unusedMetadata.splice(this.unusedMetadata.indexOf(column), 1);
        this.metadata.splice(index, 0, used[0]);
        this.metadata = [...this.metadata];
        this._saveToCookie();

        this.metadataChange.emit();
        this._setWidthOfUsedColumns();
    }

    /**
     * Event handler used for handling drag start
     * @param {DragEvent} event Event for dragging
     * @param {AdvancedGridColumn} column Column that is being dragged
     */
    public dragStart(event: DragEvent, column: AdvancedGridColumn)
    {
        event.dataTransfer.setData('text/plain', UNUSED_DRAG);
        (event.target as HTMLElement).style.opacity = '0.75';

        this._draggedColumn = column;
        this._dropItem.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingClass);
        this.splitCoordinatesVisible = true;
    }

    /**
     * Event handler used for handling drag end
     * @param {DragEvent} event Event for dragging
     */
    public dragEnd(event: DragEvent)
    {
        (event.target as HTMLElement).style.opacity = '1';
        this._draggedColumn = null;
        this._dropItem.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingClass);
        this.splitCoordinatesVisible = false;
    }

    /**
     * Event handler used for handling drag enter
     * @param {DragEvent} event Event for dragging
     */
    public dragEnterSplit(event: DragEvent)
    {
        let firstElementChild = (event.target as HTMLElement).firstElementChild;

        if(firstElementChild)
        {
            firstElementChild.classList.add(this.options.cssClasses.selectionDiv.dropSplitSpanDraggingDiv);
        }
    }

    /**
     * Event handler used for handling drag enter
     * @param {DragEvent} event Event for dragging
     */
    public dragEnter(event: DragEvent)
    {
        this._dropItem.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingOverClass);
    }

    /**
     * Event handler used for handling drag leave
     * @param {DragEvent} event Event for dragging
     */
    public dragLeaveSplit(event: DragEvent)
    {
        let firstElementChild = (event.target as HTMLElement).firstElementChild;

        if(firstElementChild)
        {
            firstElementChild.classList.remove(this.options.cssClasses.selectionDiv.dropSplitSpanDraggingDiv);
        }
    }

    /**
     * Event handler used for handling drag leave
     * @param {DragEvent} event Event for dragging
     */
    public dragLeave(event: DragEvent)
    {
        this._dropItem.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingOverClass);
    }

    /**
     * Event handler used for handling drag over
     * @param {DragEvent} event Event for dragging
     * @param {number} index Index of split span
     */
    public dragOverSplit(event: DragEvent, index: number)
    {
        event.preventDefault();
        event.stopPropagation();

        this._splitSpanIndex = index;
    }

    /**
     * Event handler used for handling drag over
     * @param {DragEvent} event Event for dragging
     */
    public dragOver(event: DragEvent)
    {
        event.preventDefault();
        event.stopPropagation();

        this._splitSpanIndex = null;
    }

    /**
     * Event handler used for handling drop
     * @param {DragEvent} event Event for dragging
     */
    public drop(event: DragEvent)
    {
        event.preventDefault();

        if(event.dataTransfer.getData('text/plain') != UNUSED_DRAG)
        {
            return;
        }

        this._dropItem.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingClass);
        this._dropItem.classList.toggle(this.options.cssClasses.selectionDiv.dropDraggingOverClass);
        this.splitCoordinatesVisible = false;

        this.showColumn(this._draggedColumn, this._splitSpanIndex);
        this._splitSpanIndex = null;
    }

    //######################### public methods - implementation of AdvancedMetadataSelector #########################

    /**
     * Initialize plugin, to be ready to use
     */
    public initialize()
    {
        if(!this._gathererInitialized)
        {
            if(this._metadataChangedSubscription)
            {
                this._metadataChangedSubscription.unsubscribe();
                this._metadataChangedSubscription = null;
            }

            this._metadataChangedSubscription = this.metadataGatherer.metadataChange.subscribe(() =>
            {
                this._allMetadata = this.metadataGatherer.getMetadata();
                this._initMetadata();

                this.metadataChange.emit();
            });
        }

        let textsLocator: TextsLocator = this.gridPlugins[TEXTS_LOCATOR] as TextsLocator;

        if(this._textsLocator && this._textsLocator != textsLocator)
        {
            this._textsChangedSubscription.unsubscribe();
            this._textsChangedSubscription = null;

            this._textsLocator = null;
        }

        if(!this._textsLocator)
        {
            this._textsLocator = textsLocator;

            this._textsChangedSubscription = this._textsLocator.textsChange.subscribe(() => this._initTexts());
        }

        this._allMetadata = this.metadataGatherer.getMetadata();
        this._initMetadata();
        this.initOptions();
    }

    /**
     * Method used for initialization of options
     */
    public initOptions()
    {
        this._initTexts();
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    //######################### private methods #########################

    /**
     * Initialize texts
     */
    private _initTexts()
    {
        Object.keys(this.options.texts).forEach(key =>
        {
            this.texts[key] = this._textsLocator.getText(this.options.texts[key]);
        });

        this._changeDetector.detectChanges();
    }

    /**
     * Initialize metadata
     */
    private _initMetadata()
    {
        let cookieState: CookieState = this._loadFromCookie();

        if(cookieState)
        {
            this.metadata = [];

            this._allMetadata.forEach(meta =>
            {
                if(!meta.id)
                {
                    throw new Error('Missing id for column to be stored in cookie!');
                }

                meta.visible = !!cookieState[meta.id];
            });

            Object.keys(cookieState).forEach(id =>
            {
                let meta = this._allMetadata.find(itm => itm.id == id);

                if(meta)
                {
                    this.metadata.push(meta);
                }
            });
        }
        else
        {
            this.metadata = this._allMetadata.filter(itm => itm.visible);
        }

        this.unusedMetadata = this._allMetadata.filter(itm => !itm.visible);
    }

    /**
     * Sets width of used columns
     */
    private _setWidthOfUsedColumns()
    {
        let headerElement: HTMLElement = this.gridPlugins[HEADER_CONTENT_RENDERER].pluginElement.nativeElement;
        let colWidths = this.options.headerColumnGetter(headerElement);
        this.metadata.forEach((meta, index) => meta.realWidth = colWidths[index]);

        this.splitCoordinates = [];

        colWidths.forEach((value: number, index: number) =>
        {
            let halfWidth = value / 2;

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
                    startX: this.splitCoordinates[index].startX + this.splitCoordinates[index].halfOffset + value - halfWidth,
                    halfOffset: halfWidth,
                    width: halfWidth
                });
            }
        });
    }

    /**
     * Saves current state to cookie
     */
    private _saveToCookie()
    {
        if(!this.options.cookieName)
        {
            return;
        }

        let state: CookieState = {};

        this.metadata.forEach(meta =>
        {
            if(!meta.id)
            {
                throw new Error('Missing id for column to be stored in cookie!');
            }

            state[meta.id] =
            {
                visible: true
            };
        });

        this._cookies.setCookie(this.options.cookieName, state, null, '/');
    }

    /**
     * Gets stored cookie state
     */
    private _loadFromCookie(): CookieState
    {
        if(!this.options.cookieName)
        {
            return null;
        }

        return this._cookies.getCookie(this.options.cookieName);
    }
}