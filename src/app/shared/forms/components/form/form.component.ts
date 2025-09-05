import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { validateForm } from '../../helpers/form.helper';
import { FormElementType } from '../../models/form-element-type.enum';
import { type FormElement } from '../../models/form-element.interface';
import { FormElementComponent } from '../form-element/form-element.component';

@Component({
  selector: '[form]',
  imports: [ReactiveFormsModule, FormElementComponent, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public formGroup = input.required<FormGroup>();
  public form = input.required<FormElement[]>();
  public submitLabel = input<string>('Submit');

  public readonly submitted = output<void>();

  readonly FormElementType = FormElementType;

  protected onSubmit(): void {
    const group = this.formGroup();

    if (!validateForm(group)) {
      return;
    }

    this.submitted.emit();
  }
}
