import {Pipe, PipeTransform} from '@angular/core';

import {MatrixGridColumn} from '../../interfaces';

/**
 * Creates css value for 'grid-template-columns' property
 */
@Pipe({name: 'cssGridTemplateColumns'})
export class CssGridTemplateColumnsPipe implements PipeTransform
{
    /**
     * Creates css value for 'grid-template-columns' property
     * @param value - Array of columns that will be rendered
     */
    public transform(value: MatrixGridColumn[]): string
    {
        return value.map(col => col.width).join(' ');
    }
}