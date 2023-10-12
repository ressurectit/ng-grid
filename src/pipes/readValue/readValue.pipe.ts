import {Pipe, PipeTransform} from '@angular/core';
import {getValue} from '@jscrpt/common';

/**
 * Reads value from object and returns it, can address nested objects using '.' notation
 */
@Pipe({name: 'readValue', standalone: true})
export class ReadValueSAPipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Reads value from object and returns it, can address nested objects using '.' notation
     * @param value - Object storing requested value
     * @param path - Path to property which value should be obtained
     */
    public transform<TValue>(value: TValue, path: string|undefined|null) : unknown
    {
        if(!path)
        {
            return '';
        }

        return getValue(value as Record<string, unknown>, path);
    }
}