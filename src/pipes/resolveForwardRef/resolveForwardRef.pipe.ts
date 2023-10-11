import {Pipe, PipeTransform, Type, resolveForwardRef} from '@angular/core';

/**
 * Resolves forwardRef type into type
 */
@Pipe({name: 'resolveForwardRef', standalone: true})
export class ResolveForwardRefSAPipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################
    /**
     * Resolves forwardRef types into type
     * @param value - Type that should be resolved
     */
    public transform<TType = unknown>(value: Type<TType>|undefined|null): Type<TType>|undefined|null
    {
        if(!value)
        {
            return value;
        }

        return resolveForwardRef(value);
    }
}