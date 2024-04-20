import { AbstractControl } from '@angular/forms';

export function notToday(control: AbstractControl<string>) {
  return new Date(control.value).getDate() >= new Date().getDate() ? { isToday: true } : null
}
