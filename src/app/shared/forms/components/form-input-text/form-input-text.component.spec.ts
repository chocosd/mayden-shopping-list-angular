import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormElementType } from '../../models/form-element-type.enum';
import { FormInputTextComponent } from './form-input-text.component';

describe('FormInputTextComponent', () => {
  let fixture: ComponentFixture<FormInputTextComponent>;
  let component: FormInputTextComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FormInputTextComponent] }).compileComponents();
    fixture = TestBed.createComponent(FormInputTextComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', {
      name: 'name',
      type: FormElementType.Text,
      control: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      label: 'Name',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('binds to form control value', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Hello';
    input.dispatchEvent(new Event('input'));
    expect(component.element().control.value).toBe('Hello');
  });
});
