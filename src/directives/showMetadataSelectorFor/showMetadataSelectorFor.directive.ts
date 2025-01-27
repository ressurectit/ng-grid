import {Directive, HostListener, Input} from '@angular/core';

import {Grid} from '../../interfaces';
import {GridPluginType} from '../../misc/enums';

/**
 * Directive that shows metadata selector on click for provided grid
 */
@Directive(
{
    selector: '[showMetadataSelectorFor]',
})
export class ShowMetadataSelectorForDirective
{
    //######################### public properties - inputs #########################

    /**
     * Grid which metadata selector will be displayed
     */
    @Input({required: true, alias: 'showMetadataSelectorFor'})
    public grid: Grid|undefined|null;

    //######################### protected methods - host #########################

    /**
     * Shows metadata selector for grid
     */
    @HostListener('click', ['$event'])
    protected showMetadataSelector($event: MouseEvent): void
    {
        $event.preventDefault();
        $event.stopPropagation();

        this.grid?.getPlugin(GridPluginType.MetadataSelector)?.show();
    }
}
