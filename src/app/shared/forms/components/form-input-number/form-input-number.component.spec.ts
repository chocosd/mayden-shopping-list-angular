import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { FormElementType } from '../../models/form-element-type.enum';
import { FormInputNumberComponent } from './form-input-number.component';

describe('FormInputNumberComponent', () => {
  let fixture: ComponentFixture<FormInputNumberComponent>;
  let component: FormInputNumberComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormInputNumberComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', {
      name: 'qty',
      type: FormElementType.Number,
      control: new FormControl(1, { nonNullable: true }),
      config: { step: 1 },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should round to an integer when step is 1', () => {
    component.element().control.setValue(1.6);
    fixture.detectChanges();
    expect(component.element().control.value).toBe(2);
  });

  it('should round to two decimals when step is 0.01', () => {
    fixture.componentRef.setInput('element', {
      ...component.element(),
      config: { step: 0.01 },
    });
    fixture.detectChanges();
    component.element().control.setValue(1.239);
    fixture.detectChanges();
    expect(component.element().control.value).toBe(1.24);
  });
});
