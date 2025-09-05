import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormElementType } from '../../models/form-element-type.enum';
import { FormElement } from '../../models/form-element.interface';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitted when form is valid', () => {
    const formGroup = new FormGroup({
      name: new FormControl('ok', { nonNullable: true, validators: [Validators.required] }),
    });
    const elements: FormElement[] = [
      {
        name: 'name',
        type: FormElementType.Text,
        control: formGroup.get('name') as FormControl<string>,
      },
    ];

    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.componentRef.setInput('form', elements);
    fixture.detectChanges();

    let emitted = false;
    component.submitted.subscribe(() => (emitted = true));
    (component as any).onSubmit();
    expect(emitted).toBeTrue();
  });
});
