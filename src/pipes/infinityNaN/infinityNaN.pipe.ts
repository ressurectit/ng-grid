import {Pipe, PipeTransform} from '@angular/core';

/**
 * Transforms NaN value into inifinity symbol
 */
@Pipe({name: 'infinityNaN', standalone: true})
export class InfinityNaNSAPipe implements PipeTransform
{
    /**
     * Transforms NaN value into inifinity symbol
     * @param value - Numeric value to be checked and transformed
     */
    public transform(value: number): string
    {
        return isNaN(value) ? '&infin;' : value.toString();
    }
}