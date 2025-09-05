import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementCheckbox } from '../../models/form-element.interface';

@Component({
  selector: 'app-form-input-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input-checkbox.component.html',
  styleUrl: './form-input-checkbox.component.scss',
})
export class FormInputCheckboxComponent {
  public element = input.required<FormElementCheckbox>();
}
