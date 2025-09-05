import { FormControl } from '@angular/forms';
import { FormElementType } from './form-element-type.enum';

export interface FormElementBase<T = unknown> {
  control: FormControl<T>;
  label?: string;
  name: string;
  type: FormElementType;
  validators?: { name: string; message: string }[];
}

export interface FormElementCheckbox extends FormElementBase<boolean> {
  type: FormElementType.Checkbox;
}

export interface FormElementNumber extends FormElementBase<number> {
  type: FormElementType.Number;
  config?: {
    min?: number;
    max?: number;
    decimals?: boolean;
    step?: number;
  };
}

export interface FormElementText extends FormElementBase<string> {
  type: FormElementType.Text;
  config?: {
    minLength?: number;
    maxLength?: number;
  };
}

export type FormElement = FormElementCheckbox | FormElementNumber | FormElementText;
