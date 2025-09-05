import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementText } from '../../models/form-element.interface';

@Component({
  selector: 'app-form-input-text',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.scss',
})
export class FormInputTextComponent {
  public element = input.required<FormElementText>();

  protected readonly formControl = computed(() => this.element()?.control);
}
