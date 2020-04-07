import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding, ElementRef} from "@angular/core";
import {extend} from "@jscrpt/common";

import {TableHeaderContentRendererOptions} from "../../tableContentRenderer.interface";
import {BasicOrderableColumn} from "../../../contentRenderer.interface";
import {HEADER_CONTENT_RENDERER_OPTIONS} from "../../../types";
import {HeaderContentRendererAbstractComponent} from "../../../headerContentRendererAbstract.component";
import {GroupedTableMetadata, HeaderTableGroup} from "../../../../../components/metadata";
import {GRID_PLUGIN_INSTANCES} from '../../../../../components/grid/types';
import {GridPluginInstances} from '../../../../../components/grid';

//TODO - added new property TransitiveColumns, to distinquish real columns and transitive one

/**
 * Default options for 'GroupedTableHeaderContentRendererComponent'
 * @internal
 */
const defaultOptions: TableHeaderContentRendererOptions =
{
    cssClasses:
    {
        thead: '',
        thDefault: 'header-default',
        thOrderable: 'header-orderable',
        spanContent: 'header-content',
        spanOrdering: 'header-ordering',
        spanOrderingDirection:
        {
            none: 'fa fa-sort',
            asc: 'fa fa-sort-up',
            desc: 'fa fa-sort-down'
        }
    }
};

/**
 * Metadata for rendering groups
 */
export interface GroupsMetadataRender
{
    /**
     * Number of columns grouped into this one
     */
    colspan: number;

    /**
     * Number of rows grouped into this one
     */
    rowspan: number;

    /**
     * Instance of header table group
     */
    instance: HeaderTableGroup;
}

/**
 * Component used for rendering table header in table content renderer
 */
@Component(
{
    selector: 'thead.grouped-content-renderer',
    templateUrl: 'groupedTableHeaderContentRenderer.component.html',
    styleUrls: ['groupedTableHeaderContentRenderer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedTableHeaderContentRendererComponent<TData> extends HeaderContentRendererAbstractComponent<TData, TableHeaderContentRendererOptions>
{
    //######################### private fields #########################

    /**
     * Transformed groups metadata into layers
     */
    private _transformedGroupsMetadata: HeaderTableGroup[][];

    //######################### private properties #########################

    /**
     * Gets metadata as grouped metadata
     */
    private get groupsMetadata(): GroupedTableMetadata<BasicOrderableColumn<TData>>
    {
        return this.metadata as GroupedTableMetadata<BasicOrderableColumn<TData>>;
    }

    //######################### public properties - template bindings #########################

    /**
     * Contains metadata for rendering groups
     */
    public groupsMetadataRender: GroupsMetadataRender[][] = [];

    //######################### public properties - host #########################

    /**
     * Css class applied to header itself
     */
    @HostBinding('class')
    public get cssClass(): string
    {
        return this._options.cssClasses.thead;
    }

    //######################### constructor #########################
    constructor(pluginElement: ElementRef,
                changeDetector: ChangeDetectorRef,
                @Inject(HEADER_CONTENT_RENDERER_OPTIONS) @Optional() options: TableHeaderContentRendererOptions,
                @Inject(GRID_PLUGIN_INSTANCES) @Optional() gridPlugins: GridPluginInstances)
    {
        super(pluginElement, gridPlugins, changeDetector);

        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of TableHeaderContentRenderer #########################

    /**
     * Resets metadata to defaults
     */
    public resetMetadata(): void
    {
        this._initializeGroups();
        super.resetMetadata();
    }

    //######################### private methods #########################

    /**
     * Method used for initializing of metadata
     */
    private _initializeGroups()
    {
        if(!this._transformedGroupsMetadata)
        {
            this._transformGroupsMetadata();
        }

        if(!this._transformedGroupsMetadata)
        {
            return;
        }

        this.groupsMetadataRender = [];

        //each column must have column in group header
        this.groupsMetadata.columns.forEach(column =>
        {
            //each level of header group should be investigated
            this._transformedGroupsMetadata.forEach((levelData, level) =>
            {
                if(!this.groupsMetadataRender[level])
                {
                    this.groupsMetadataRender[level] = [];
                }

                //each group is checked
                levelData.forEach(group =>
                {
                    //column is in specified group
                    if(group.columns.find(itm => itm.id == column.id))
                    {
                        //check if group render was created
                        if(!this.groupsMetadataRender[level].find(itm => itm.instance == group))
                        {
                            this.groupsMetadataRender[level].push(
                            {
                                colspan: group.columns.length,
                                instance: group,
                                rowspan: null
                            });
                        }
                    }
                    else
                    {
                        //TODO - finish, add to rendered data group and normal columns
                    }
                });
            });
        });
    }

    /**
     * Performs initial groups transformation
     */
    private _transformGroupsMetadata()
    {
        let metadata = this.groupsMetadata.groups;

        if(!metadata)
        {
            return;
        }

        this._transformedGroupsMetadata = [];
        this._fillGroupsMetadata(0, metadata);
    }

    /**
     * Fills current level of groups metadata
     * @param level - Level of current header group
     * @param levelData - Data for specified level
     */
    private _fillGroupsMetadata(level: number, levelData: HeaderTableGroup[])
    {
        if(!levelData || !levelData.length)
        {
            return;
        }

        this._transformedGroupsMetadata[level] = levelData;
        let nextLevelData = levelData.reduce<HeaderTableGroup[]>((acc, x) => acc.concat(x.groups), []);
        this._fillGroupsMetadata(level + 1, nextLevelData);
    }
}