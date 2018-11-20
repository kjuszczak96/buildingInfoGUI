import {
    AbstractControl,
    AsyncValidatorFn,
    FormControl,
    FormGroupDirective,
    NgForm,
    ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractLocation } from '../models/abstract-location.model';
import { LocationService } from '../services/location.service';

export function existingIdValidator<T extends AbstractLocation>(
    service: LocationService<T>,
    ignoredId: number | null = null,
): AsyncValidatorFn {
    return (
        control: AbstractControl,
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return control.value === ignoredId
            ? of(null)
            : service.exists(control.value).pipe(
                  map(res => {
                      return res ? { idTaken: true } : null;
                  }),
              );
    };
}
