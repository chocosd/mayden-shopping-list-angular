import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormElementType } from '../../models/form-element-type.enum';
import { FormElement } from '../../models/form-element.interface';
import { FormInputCheckboxComponent } from '../form-input-checkbox/form-input-checkbox.component';
import { FormInputNumberComponent } from '../form-input-number/form-input-number.component';
import { FormInputTextComponent } from '../form-input-text/form-input-text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-form-element',
  imports: [FormInputTextComponent, FormInputNumberComponent, FormInputCheckboxComponent],
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.scss',
})
export class FormElementComponent {
  public element = input.required<FormElement>();

  public readonly FormElementType = FormElementType;

  protected readonly hasErrors = computed(() => {
    return (
      this.element()?.validators?.length &&
      this.element()?.control?.invalid &&
      (this.element()?.control?.dirty || this.element()?.control?.touched)
    );
  });
}
