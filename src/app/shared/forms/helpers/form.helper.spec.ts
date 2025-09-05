import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateForm } from './form.helper';

describe('validateForm', () => {
  it('should return false and mark controls when invalid', () => {
    const group = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
    const result = validateForm(group);
    expect(result).toBeFalse();
    expect(group.get('name')?.touched).toBeTrue();
  });

  it('should return true when valid', () => {
    const group = new FormGroup({
      name: new FormControl('ok', { nonNullable: true, validators: [Validators.required] }),
    });
    const result = validateForm(group);
    expect(result).toBeTrue();
  });
});
