import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { FormElementType } from '../../models/form-element-type.enum';
import { FormElementComponent } from './form-element.component';

describe('FormElementComponent', () => {
  let fixture: ComponentFixture<FormElementComponent>;
  let component: FormElementComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormElementComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', {
      name: 'name',
      type: FormElementType.Text,
      control: new FormControl('', { nonNullable: true }),
      validators: [
        { name: 'required', message: 'Name is required' },
        { name: 'minlength', message: 'Too short' },
      ],
    });
    component.element().control.markAsTouched();
    component.element().control.setErrors({ required: true });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render error list when invalid and touched', () => {
    const el: HTMLElement = fixture.nativeElement;
    const errors = el.querySelectorAll('.form-error');
    expect(errors.length).toBeGreaterThan(0);
    expect(el.textContent).toContain('Name is required');
  });
});
