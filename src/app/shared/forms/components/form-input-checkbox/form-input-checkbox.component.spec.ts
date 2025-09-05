import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { FormElementType } from '../../models/form-element-type.enum';
import { FormInputCheckboxComponent } from './form-input-checkbox.component';

describe('FormInputCheckboxComponent', () => {
  let fixture: ComponentFixture<FormInputCheckboxComponent>;
  let component: FormInputCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputCheckboxComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(FormInputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', {
      name: 'bought',
      type: FormElementType.Checkbox,
      control: new FormControl(false, { nonNullable: true }),
      label: 'Bought',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the value on click', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    input.click();
    expect(component.element().control.value).toBeTrue();
  });
});
