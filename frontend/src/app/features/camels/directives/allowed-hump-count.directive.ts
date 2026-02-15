import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function allowedHumpCountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    return value === 1 || value === 2 ? null : { invalidHumpCount: { value } };
  };
}
