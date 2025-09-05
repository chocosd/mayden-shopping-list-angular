import { FormGroup } from '@angular/forms';

/**
 * Validates a form group. Marks all controls as touched when invalid.
 * Returns true when the form is valid, otherwise false.
 */
export function validateForm(group: FormGroup): boolean {
  if (!group) {
    return false;
  }

  group.updateValueAndValidity();

  if (group.invalid) {
    group.markAllAsTouched();
    return false;
  }

  return true;
}
