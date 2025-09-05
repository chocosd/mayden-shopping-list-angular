import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FormComponent } from '../../../shared/forms/components/form/form.component';
import { validateForm } from '../../../shared/forms/helpers/form.helper';
import { FormElementType } from '../../../shared/forms/models/form-element-type.enum';
import { FormElement } from '../../../shared/forms/models/form-element.interface';
import { ShoppingStore } from '../../store/shopping.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-action-bar',
  imports: [ReactiveFormsModule, FormComponent],
  templateUrl: './shopping-action-bar.component.html',
  styleUrl: './shopping-action-bar.component.scss',
})
export class ShoppingActionBarComponent {
  protected readonly FormElementType = FormElementType;
  protected readonly store = inject(ShoppingStore);
  private readonly formBuilder = inject(FormBuilder);
  protected form: FormGroup | null = null;
  protected formElements: FormElement[] = [];

  constructor() {
    this.setFormGroup();
    this.setFormElements();
    this.listenToFormChanges();
  }

  private setFormGroup(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  private setFormElements(): void {
    if (!this.form) {
      return;
    }

    this.formElements = [
      {
        name: 'name',
        label: 'Item name',
        type: FormElementType.Text,
        control: this.form.get('name') as FormControl<string>,
        validators: [{ name: 'required', message: 'Name is required' }],
      },
      {
        name: 'quantity',
        label: 'Quantity',
        type: FormElementType.Number,
        control: this.form.get('quantity') as FormControl<number>,
        config: {
          decimals: false,
          step: 1,
        },
        validators: [
          { name: 'required', message: 'Quantity is required' },
          { name: 'min', message: 'Minimum is 1' },
        ],
      },
      {
        name: 'price',
        label: 'Price',
        type: FormElementType.Number,
        control: this.form.get('price') as FormControl<number>,
        config: {
          decimals: true,
          step: 0.01,
        },
        validators: [
          { name: 'required', message: 'Price is required' },
          { name: 'min', message: 'Minimum is 0' },
        ],
      },
    ];
  }

  protected onSubmit(): void {
    if (!this.form || !validateForm(this.form)) {
      return;
    }
    const { name, quantity, price } = this.form?.getRawValue();

    this.store.addShoppingItem({ name, quantity: Number(quantity), price: Number(price) });

    this.form?.reset({ name: '', quantity: 1, price: 0 });
  }

  private listenToFormChanges(): void {
    this.form?.valueChanges.pipe(debounceTime(100), takeUntilDestroyed()).subscribe();
  }
}
